import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLNullableType,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

import * as Cursor from "../../src/cursor";

export { getByID } from "./loader";

// tslint:disable-next-line:variable-name
const NameType = new GraphQLObjectType({
  name: "Name",
  fields: () => ({
    first: { type: GraphQLNonNull(GraphQLString) },
    last: { type: GraphQLNonNull(GraphQLString) }
  })
});

// TODO: add in implements

interface NodeAndRelationships {
  readonly edgeRelationships: object;
  readonly node: object;
}

interface EdgeRelationships {
  readonly types: ReadonlyArray<{
    readonly name: string;
    readonly type: GraphQLNullableType;
  }>;
  // tslint:disable-next-line:no-mixed-interface
  readonly makeNodeAndRelationships: (source: any) => NodeAndRelationships;
}

interface ConnectionMakerConfig {
  readonly baseName: string;
  readonly keysToMakeCursor?: readonly string[];
  readonly edgeRelationships?: EdgeRelationships | null;
}

// tslint:disable-next-line:variable-name
const FamilialRelationshipType = new GraphQLEnumType({
  name: "FamilialRelationship",
  values: {
    SIBLING: { value: 0 },
    PARENT: { value: 1 },
    COUSIN: { value: 2 }
  }
});

// tslint:disable-next-line:variable-name
const PageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  fields: () => ({
    hasPreviousPage: { type: GraphQLNonNull(GraphQLBoolean) },
    hasNextPage: { type: GraphQLNonNull(GraphQLBoolean) },
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString }
  })
});

const connectionMaker = ({
  baseName,
  edgeRelationships,
  keysToMakeCursor = ["id"] as const
}: ConnectionMakerConfig): GraphQLFieldConfig<any, any, any> => ({
  args: { first: { type: GraphQLInt }, after: { type: GraphQLString } },
  resolve: (parentSource: any, { first, after }: any, _, info) => {
    const _source = parentSource[info.fieldName];
    const originalNumberOfItems = _source.length;
    const source = _source.slice();
    const transformFn = edgeRelationships
      ? edgeRelationships.makeNodeAndRelationships
      : (item: any) => ({ node: item, edgeRelationships: {} });
    const itemsReformedWithPossibleRelationships: readonly NodeAndRelationships[] = source.map(
      transformFn
    );
    const cursorCodec = Cursor.makeCodec(keysToMakeCursor);
    const indexOfGivenCursor = after
      ? itemsReformedWithPossibleRelationships
          .map(item => item.node)
          .map(node => cursorCodec.encode(node as any))
          .findIndex(item => item === after)
      : -1;
    const startIndex = indexOfGivenCursor > -1 ? indexOfGivenCursor + 1 : 0;
    const endIndex = first
      ? Math.min(startIndex + first, originalNumberOfItems)
      : originalNumberOfItems;

    return {
      totalCount: originalNumberOfItems,
      pageInfo: {
        hasNextPage: !!endIndex && originalNumberOfItems > endIndex,
        hasPreviousPage: startIndex > 0,
        startCursor: originalNumberOfItems
          ? cursorCodec.encode(
              (itemsReformedWithPossibleRelationships as any)[startIndex].node
            )
          : null,
        endCursor: originalNumberOfItems
          ? cursorCodec.encode(
              (itemsReformedWithPossibleRelationships as any)[endIndex - 1].node
            )
          : null
      },
      edges: itemsReformedWithPossibleRelationships
        .slice(startIndex, endIndex)
        .map(item => ({
          node: item.node,
          cursor: cursorCodec.encode((item as any).node),
          ...(edgeRelationships
            ? edgeRelationships.makeNodeAndRelationships(item.node)
                .edgeRelationships
            : {})
        }))
    };
  },
  type: GraphQLNonNull(
    new GraphQLObjectType({
      name: `${baseName}Connection`,
      fields: () => ({
        totalCount: { type: GraphQLInt },
        pageInfo: {
          type: GraphQLNonNull(PageInfoType)
        },
        edges: {
          type: GraphQLNonNull(
            GraphQLList(
              GraphQLNonNull(
                new GraphQLObjectType({
                  name: `${baseName}Edge`,
                  fields: () => ({
                    cursor: { type: GraphQLNonNull(GraphQLString) },
                    node: { type: GraphQLNonNull(GraphQLType) },
                    ...(edgeRelationships
                      ? edgeRelationships.types.reduce(
                          (previous, { name, type }) => ({
                            ...previous,
                            [name]: { type }
                          }),
                          {}
                        )
                      : {})
                  })
                })
              )
            )
          )
        }
      })
    })
  )
});

// tslint:disable-next-line:variable-name
export const GraphQLType = new GraphQLObjectType({
  name: "Human",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(NameType) },
    relatives: connectionMaker({
      baseName: "Relatives",
      edgeRelationships: {
        makeNodeAndRelationships: source => ({
          edgeRelationships: source.relationship,
          node: source
        }),
        types: [
          {
            name: "relationship",
            type: GraphQLNonNull(FamilialRelationshipType)
          }
        ]
      }
    }),
    friends: connectionMaker({
      baseName: "Friends",
      edgeRelationships: {
        makeNodeAndRelationships: source => ({
          edgeRelationships: source.friendSince,
          node: source
        }),
        types: [
          {
            name: "friendSince",
            type: GraphQLNonNull(FamilialRelationshipType)
          }
        ]
      }
    }),
    // can't make projects into a human... tbcontinued
    projects: connectionMaker({
      baseName: "Projects",
      keysToMakeCursor: ["description", "startDate"] as const
    })
  })
});

// import { Array, Monoid, pipe, Record } from "@grapheng/prelude";

import * as Resolvers from "./Resolvers";

describe("`Resolvers`", () => {
  describe("`concat`", () => {
    const resolvers = {
      A: {
        field1: () => null,
        field2: () => null
      }
    };

    test("Resolvers without conflicts include everything", () =>
      expect(Resolvers.concat(resolvers, { B: resolvers.A })).toEqual({
        ...resolvers,
        ...{ B: resolvers.A }
      }));

    test("Resolvers for the same type are combined", () => {
      const resolversForSameType = {
        A: { field3: resolvers.A.field1 }
      };

      expect(Resolvers.concat(resolvers, resolversForSameType)).toEqual({
        A: {
          ...resolvers.A,
          ...resolversForSameType.A
        }
      });
    });

    test("Resolvers with conflicts are combined using the last definition", () => {
      const resolversWithConflicts = {
        A: {
          field1: () => "prefer me"
        }
      };

      const combinedResolvers = Resolvers.concat(
        resolvers,
        resolversWithConflicts
      );

      expect(combinedResolvers).toEqual({
        A: {
          ...resolvers.A,
          ...resolversWithConflicts.A
        }
      });

      expect((combinedResolvers.A.field1 as any)()).not.toEqual(
        resolvers.A.field1()
      );

      expect((combinedResolvers.A.field1 as any)()).toEqual(
        resolversWithConflicts.A.field1()
      );
    });
  });
});

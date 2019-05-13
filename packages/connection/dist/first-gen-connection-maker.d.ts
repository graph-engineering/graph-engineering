export declare function makeConnection<T extends {
    id: string;
}, K>(items: Array<{
    node: T;
    additionalEdgeProperties?: K;
}>, first?: number | null, after?: string | null): {
    totalCount: number;
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
    };
    edges: ({
        node: T;
        cursor: string;
    } | ({
        node: T;
        cursor: string;
    } & K))[];
};

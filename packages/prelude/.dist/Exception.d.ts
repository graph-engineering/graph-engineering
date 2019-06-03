export * from "fp-ts/lib/Exception";
export declare type Exception = Error;
export declare const crashL: (exception: unknown) => () => never;
export declare const crash: (exception: unknown) => never;
export declare const detailed: (message: string, details: any) => Error;
export declare const detailedL: (message: string, knownDetails?: any) => (unknownDetails: unknown) => Error;
export declare const merge: (message: string, exceptions: readonly Error[]) => Error;
export declare const mergeL: (message: string) => (exceptions: readonly Error[]) => Error;
export declare const unknown: (exception: unknown) => Error;

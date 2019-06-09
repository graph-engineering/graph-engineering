import {
  Applicative,
  Compactable,
  Either,
  Fn,
  HKT,
  Monoid,
  Option,
  Ord,
  Setoid
} from ".";
export * from "fp-ts/lib/Array";
export declare const fromHead: <A>(head: A) => readonly A[];
export declare const nonNullables: <A>(
  as: readonly A[]
) => readonly NonNullable<A>[];
export declare const nullableCons: <A>(
  head?: A,
  tail?: readonly A[]
) => readonly A[];
export declare const getMonoid: <A = never>() => Monoid.Monoid<
  ReadonlyArray<A>
>;
export declare const getSetoid: <A>(
  S: Setoid.Setoid<A>
) => Setoid.Setoid<ReadonlyArray<A>>;
export declare const getOrd: <A>(O: Ord.Ord<A>) => Ord.Ord<ReadonlyArray<A>>;
export declare function traverse<F extends HKT.URIS3>(
  F: Applicative.Applicative3<F>
): <U, L, A, B>(
  ta: ReadonlyArray<A>,
  f: (a: A) => HKT.Type3<F, U, L, B>
) => HKT.Type3<F, U, L, ReadonlyArray<B>>;
export declare function traverse<F extends HKT.URIS3, U, L>(
  F: Applicative.Applicative3C<F, U, L>
): <A, B>(
  ta: ReadonlyArray<A>,
  f: (a: A) => HKT.Type3<F, U, L, B>
) => HKT.Type3<F, U, L, ReadonlyArray<B>>;
export declare function traverse<F extends HKT.URIS2>(
  F: Applicative.Applicative2<F>
): <L, A, B>(
  ta: ReadonlyArray<A>,
  f: (a: A) => HKT.Type2<F, L, B>
) => HKT.Type2<F, L, ReadonlyArray<B>>;
export declare function traverse<F extends HKT.URIS2, L>(
  F: Applicative.Applicative2C<F, L>
): <A, B>(
  ta: ReadonlyArray<A>,
  f: (a: A) => HKT.Type2<F, L, B>
) => HKT.Type2<F, L, ReadonlyArray<B>>;
export declare function traverse<F extends HKT.URIS>(
  F: Applicative.Applicative1<F>
): <A, B>(
  ta: ReadonlyArray<A>,
  f: (a: A) => HKT.Type<F, B>
) => HKT.Type<F, ReadonlyArray<B>>;
export declare function traverse<F>(
  F: Applicative.Applicative<F>
): <A, B>(
  ta: ReadonlyArray<A>,
  f: (a: A) => HKT.HKT<F, B>
) => HKT.HKT<F, ReadonlyArray<B>>;
export declare const empty: ReadonlyArray<never>;
export declare const makeBy: <A>(
  n: number,
  f: (i: number) => A
) => ReadonlyArray<A>;
export declare const range: (
  start: number,
  end: number
) => ReadonlyArray<number>;
export declare const replicate: <A>(n: number, a: A) => ReadonlyArray<A>;
export declare const flatten: <A>(
  ffa: ReadonlyArray<ReadonlyArray<A>>
) => ReadonlyArray<A>;
export declare const fold: <A, B>(
  as: ReadonlyArray<A>,
  b: B,
  cons: (head: A, tail: ReadonlyArray<A>) => B
) => B;
export declare const foldL: <A, B>(
  as: ReadonlyArray<A>,
  nil: () => B,
  cons: (head: A, tail: ReadonlyArray<A>) => B
) => B;
export declare const foldr: <A, B>(
  as: ReadonlyArray<A>,
  b: B,
  cons: (init: ReadonlyArray<A>, last: A) => B
) => B;
export declare const foldrL: <A, B>(
  as: ReadonlyArray<A>,
  nil: () => B,
  cons: (init: ReadonlyArray<A>, last: A) => B
) => B;
export declare const scanLeft: <A, B>(
  as: ReadonlyArray<A>,
  b: B,
  f: (b: B, a: A) => B
) => ReadonlyArray<B>;
export declare const scanRight: <A, B>(
  as: ReadonlyArray<A>,
  b: B,
  f: (a: A, b: B) => B
) => ReadonlyArray<B>;
export declare const isEmpty: <A>(as: ReadonlyArray<A>) => boolean;
export declare const isOutOfBound: <A>(
  i: number,
  as: ReadonlyArray<A>
) => boolean;
export declare const lookup: <A>(
  i: number,
  as: ReadonlyArray<A>
) => Option.Option<A>;
export declare const index: <A>(
  i: number,
  as: ReadonlyArray<A>
) => Option.Option<A>;
export declare const cons: <A>(a: A, as: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const snoc: <A>(as: ReadonlyArray<A>, a: A) => ReadonlyArray<A>;
export declare const head: <A>(as: ReadonlyArray<A>) => Option.Option<A>;
export declare const last: <A>(as: ReadonlyArray<A>) => Option.Option<A>;
export declare const tail: <A>(
  as: ReadonlyArray<A>
) => Option.Option<ReadonlyArray<A>>;
export declare const init: <A>(
  as: ReadonlyArray<A>
) => Option.Option<ReadonlyArray<A>>;
export declare const take: <A>(
  n: number,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const takeEnd: <A>(
  n: number,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare function takeWhile<A, B extends A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Refinement<A, B>
): ReadonlyArray<B>;
export declare function takeWhile<A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
): ReadonlyArray<A>;
export declare function span<A, B extends A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Refinement<A, B>
): {
  readonly init: ReadonlyArray<B>;
  readonly rest: ReadonlyArray<A>;
};
export declare function span<A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
): {
  readonly init: ReadonlyArray<A>;
  readonly rest: ReadonlyArray<A>;
};
export declare const drop: <A>(
  n: number,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const dropEnd: <A>(
  n: number,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const dropWhile: <A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
) => ReadonlyArray<A>;
export declare const findIndex: <A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
) => Option.Option<number>;
export declare function findFirst<A, B extends A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Refinement<A, B>
): Option.Option<B>;
export declare function findFirst<A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
): Option.Option<A>;
export declare function findLast<A, B extends A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Refinement<A, B>
): Option.Option<B>;
export declare function findLast<A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
): Option.Option<A>;
export declare const findLastIndex: <A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
) => Option.Option<number>;
export declare const refine: <A, B extends A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Refinement<A, B>
) => ReadonlyArray<B>;
export declare const copy: <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const unsafeInsertAt: <A>(
  i: number,
  a: A,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const insertAt: <A>(
  i: number,
  a: A,
  as: ReadonlyArray<A>
) => Option.Option<ReadonlyArray<A>>;
export declare const unsafeUpdateAt: <A>(
  i: number,
  a: A,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const updateAt: <A>(
  i: number,
  a: A,
  as: ReadonlyArray<A>
) => Option.Option<ReadonlyArray<A>>;
export declare const unsafeDeleteAt: <A>(
  i: number,
  as: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const deleteAt: <A>(
  i: number,
  as: ReadonlyArray<A>
) => Option.Option<ReadonlyArray<A>>;
export declare const modifyAt: <A>(
  as: ReadonlyArray<A>,
  i: number,
  f: Fn.Endomorphism<A>
) => Option.Option<ReadonlyArray<A>>;
export declare const reverse: <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const rights: <L, A>(
  as: ReadonlyArray<Either.Either<L, A>>
) => ReadonlyArray<A>;
export declare const lefts: <L, A>(
  as: ReadonlyArray<Either.Either<L, A>>
) => ReadonlyArray<L>;
export declare const sort: <A>(
  O: Ord.Ord<A>
) => (as: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const zipWith: <A, B, C>(
  fa: ReadonlyArray<A>,
  fb: ReadonlyArray<B>,
  f: (a: A, b: B) => C
) => ReadonlyArray<C>;
export declare const zip: <A, B>(
  fa: ReadonlyArray<A>,
  fb: ReadonlyArray<B>
) => ReadonlyArray<readonly [A, B]>;
export declare const unzip: <A, B>(
  as: ReadonlyArray<readonly [A, B]>
) => readonly [ReadonlyArray<A>, ReadonlyArray<B>];
export declare const rotate: <A>(
  n: number,
  xs: ReadonlyArray<A>
) => ReadonlyArray<A>;
export declare const elem: <A>(
  S: Setoid.Setoid<A>
) => (a: A, as: ReadonlyArray<A>) => boolean;
export declare const member: <A>(
  S: Setoid.Setoid<A>
) => (as: ReadonlyArray<A>, a: A) => boolean;
export declare const uniq: <A>(
  S: Setoid.Setoid<A>
) => (as: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const sortBy: <A>(
  ords: ReadonlyArray<Ord.Ord<A>>
) => Option.Option<Fn.Endomorphism<ReadonlyArray<A>>>;
export declare const sortBy1: <A>(
  head: Ord.Ord<A>,
  tail: ReadonlyArray<Ord.Ord<A>>
) => Fn.Endomorphism<ReadonlyArray<A>>;
export declare const mapOption: <A, B>(
  as: ReadonlyArray<A>,
  f: (a: A) => Option.Option<B>
) => ReadonlyArray<B>;
export declare const catOptions: <A>(
  as: ReadonlyArray<Option.Option<A>>
) => ReadonlyArray<A>;
export declare const partitionMap: <A, L, R>(
  fa: ReadonlyArray<A>,
  f: (a: A) => Either.Either<L, R>
) => Compactable.Separated<ReadonlyArray<L>, ReadonlyArray<R>>;
export declare function filter<A, B extends A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Refinement<A, B>
): ReadonlyArray<B>;
export declare function filter<A>(
  as: ReadonlyArray<A>,
  predicate: Fn.Predicate<A>
): ReadonlyArray<A>;
export declare function partition<A, B extends A>(
  fa: ReadonlyArray<A>,
  p: Fn.Refinement<A, B>
): Compactable.Separated<ReadonlyArray<A>, ReadonlyArray<B>>;
export declare function partition<A>(
  fa: ReadonlyArray<A>,
  p: Fn.Predicate<A>
): Compactable.Separated<ReadonlyArray<A>, ReadonlyArray<A>>;
export declare const chop: <A, B>(
  as: ReadonlyArray<A>,
  f: (as: ReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
) => ReadonlyArray<B>;
export declare const split: <A>(
  n: number,
  as: ReadonlyArray<A>
) => readonly [ReadonlyArray<A>, ReadonlyArray<A>];
export declare const chunksOf: <A>(
  as: ReadonlyArray<A>,
  n: number
) => ReadonlyArray<ReadonlyArray<A>>;
export declare function comprehension<A, B, C, D, R>(
  input: readonly [
    ReadonlyArray<A>,
    ReadonlyArray<B>,
    ReadonlyArray<C>,
    ReadonlyArray<D>
  ],
  f: (a: A, b: B, c: C, d: D) => boolean,
  g: (a: A, b: B, c: C, d: D) => R
): ReadonlyArray<R>;
export declare function comprehension<A, B, C, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>],
  f: (a: A, b: B, c: C) => boolean,
  g: (a: A, b: B, c: C) => R
): ReadonlyArray<R>;
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => boolean,
  g: (a: A) => R
): ReadonlyArray<R>;
export declare function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => boolean,
  g: (a: A, b: B) => R
): ReadonlyArray<R>;
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => boolean,
  g: (a: A) => R
): ReadonlyArray<R>;
export declare const union: <A>(
  S: Setoid.Setoid<A>
) => (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const intersection: <A>(
  S: Setoid.Setoid<A>
) => (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>) => ReadonlyArray<A>;
export declare const difference: <A>(
  S: Setoid.Setoid<A>
) => (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>) => ReadonlyArray<A>;

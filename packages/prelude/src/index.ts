export { Do as chainFrom } from "fp-ts-contrib/lib/Do";
export { pipe } from "fp-ts/lib/pipeable";
export { flow } from "fp-ts/lib/function";

// Every commented-out export is re-exported by another file...
export {
  alt as Alt,
  alternative as Alternative,
  applicative as Applicative,
  apply as Apply,
  // array as Array,
  bifunctor as Bifunctor,
  booleanAlgebra as BooleanAlgebra,
  bounded as Bounded,
  boundedDistributiveLattice as BoundedDistributiveLattice,
  boundedJoinSemilattice as BoundedJoinSemilattice,
  boundedLattice as BoundedLattice,
  boundedMeetSemilattice as BoundedMeetSemilattice,
  category as Category,
  chain as Chain,
  chainRec as ChainRec,
  choice as Choice,
  comonad as Comonad,
  compactable as Compactable,
  console as Console,
  const as Const,
  contravariant as Contravariant,
  date as Date,
  distributiveLattice as DistributiveLattice,
  // either as Either,
  eitherT as EitherT,
  eq as Eq,
  extend as Extend,
  field as Field,
  filterable as Filterable,
  filterableWithIndex as FilterableWithIndex,
  foldable as Foldable,
  foldableWithIndex as FoldableWithIndex,
  function as Fn,
  functor as Functor,
  functorWithIndex as FunctorWithIndex,
  group as Group,
  heytingAlgebra as HeytingAlgebra,
  hkt as HKT,
  identity as Identity,
  invariant as Invariant,
  io as IO,
  ioEither as IOEither,
  ioRef as IORef,
  joinSemilattice as JoinSemilattice,
  lattice as Lattice,
  map as Map,
  meetSemilattice as MeetSemilattice,
  monad as Monad,
  monadIO as MonadIO,
  monadTask as MonadTask,
  monadThrow as MonadThrow,
  monoid as Monoid,
  nonEmptyArray as NonEmptyArray,
  // option as Option,
  optionT as OptionT,
  ord as Ord,
  ordering as Ordering,
  profunctor as Profunctor,
  random as Random,
  reader as Reader,
  readerEither as ReaderEither,
  readerT as ReaderT,
  readerTaskEither as ReaderTaskEither,
  record as Record,
  ring as Ring,
  semigroup as Semigroup,
  semigroupoid as Semigroupoid,
  semiring as Semiring,
  set as Set,
  show as Show,
  state as State,
  stateReaderTaskEither as StateReaderTaskEither,
  stateT as StateT,
  store as Store,
  strong as Strong,
  // task as Task,
  // taskEither as TaskEither,
  // these as These,
  traced as Traced,
  traversable as Traversable,
  traversableWithIndex as TraversableWithIndex,
  tree as Tree,
  tuple as Tuple,
  unfoldable as Unfoldable,
  validationT as ValidationT,
  witherable as Witherable,
  writer as Writer
} from "fp-ts";

export const hole = <A>(): A => Exception.crash("Unfilled hole!") as A;

// tslint:disable-next-line: no-console
export const spy = <A>(a: A): A => void console.log(a) || a;
export const equal = <A>(a: A) => (b: A): boolean => a === b;
export const notEqual = <A>(a: A) => (b: A): boolean => !equal(a)(b);
export const identity = <A>(a: A) => a;

export const property = <Key extends keyof any>(key: Key) => <
  A extends B[Key],
  B extends Pick<any, Key>
>(
  object: B
): A => object[key];

import * as Either from "./Either";
import * as Exception from "./Exception";
import * as JSON from "./JSON";
import * as List from "./List";
import * as Option from "./Option";
import * as Runtime from "./Runtime";
import * as Task from "./Task";
import * as TaskEither from "./TaskEither";
import * as These from "./These";
import * as Time from "./Time";

export {
  Either,
  Exception,
  JSON,
  List,
  Option,
  Runtime,
  Task,
  TaskEither,
  These,
  Time
};

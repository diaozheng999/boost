type ord =
  | Less [@bs.as -1]
  | Equal [@bs.as 0]
  | Greater [@bs.as 1]
[@@bs.deriving ({ jsConverter = newType })]

type 'a abs_compare = 'a -> 'a -> abs_ord [@bs]

type 'a compare_to = 'a -> abs_ord

type 'a eq = 'a -> 'a -> bool [@bs]

type 'a predicate = 'a -> bool [@bs]

type 'a serialiser = 'a -> Js.Json.t

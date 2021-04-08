open Traits

external int : int abs_compare = "int"
  [@@bs.module "../../.."] [@@bs.scope "common", "compare"]

external num : float abs_compare = "num"
  [@@bs.module "../../.."] [@@bs.scope "common", "compare"]

external str : string abs_compare = "str"
  [@@bs.module "../../.."] [@@bs.scope "common", "compare"]

external bool : bool abs_compare = "bool"
  [@@bs.module "../../.."] [@@bs.scope "common", "compare"]

external negate : 'a abs_compare -> 'a abs_compare = "negate"
  [@@bs.module "../../.."] [@@bs.scope "common", "compare"]

external%private arr_ : 'a array -> 'a array -> 'a abs_compare -> abs_ord
  = "arrU"
  [@@bs.module "../../.."] [@@bs.scope "common", "compare"]

let arr cmp_elt = fun [@bs] l r -> arr_ l r cmp_elt

let exec abs_cmp a b = ordFromJs (abs_cmp a b [@bs])

let abs cmp = fun [@bs] a b -> ordToJs (cmp a b)

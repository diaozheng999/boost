open Traits

external is: 'a abs_eq = "is" [@@bs.val] [@@bs.scope "Object"]

external always: 'a abs_eq = "staticallyTypedAlways" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

external str: string abs_eq = "str" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

external bool: bool abs_eq = "bool" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

external int: int abs_eq = "num" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

external num: float abs_eq = "num" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

external hash: 'a abs_eq = "hash" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

external arr: 'a abs_eq -> 'a array abs_eq = "arr" [@@bs.module "../../.."][@@bs.scope "common", "eq"]

val exec : 'a abs_eq -> 'a -> 'a -> bool

val abs : ('a -> 'a -> bool) -> 'a abs_eq

open Traits

external is: 'a abs_eq = "is" [@@bs.val] [@@bs.scope "Object"]

external always: 'a abs_eq = "staticallyTypedAlways" [@@bs.module "../common/eq.js"]

external str: string abs_eq = "str" [@@bs.module "../common/eq.js"]

external bool: bool abs_eq = "bool" [@@bs.module "../common/eq.js"]

external int: int abs_eq = "num" [@@bs.module "../common/eq.js"]

external num: float abs_eq = "num" [@@bs.module "../common/eq.js"]

external hash: 'a abs_eq = "hash" [@@bs.module "../common/eq.js"]

external arr: 'a abs_eq -> 'a array abs_eq = "arr" [@@bs.module "../common/eq.js"]

let exec abs_eq a b = abs_eq a b [@bs]

let abs eq = fun [@bs] a b -> eq a b

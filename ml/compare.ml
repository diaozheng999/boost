open Traits

external int: int abs_compare = "int" [@@bs.module "../common/compare.js"]
external num: float abs_compare = "num" [@@bs.module "../common/compare.js"]
external str: string abs_compare = "str" [@@bs.module "../common/compare.js"]
external bool: bool abs_compare = "bool" [@@bs.module "../common/compare.js"]
external negate: 'a abs_compare -> 'a abs_compare = "negate" [@@bs.module "../common/compare.js"]

external arr_: 'a array -> 'a array -> 'a abs_compare -> abs_ord = "arr" [@@bs.module "../common/compare.js"] [%%private]

let arr compareElement = fun [@bs] l r -> arr_ l r compareElement

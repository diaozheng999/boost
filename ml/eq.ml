open Traits

external is: 'a eq = "is" [@@bs.val] [@@bs.scope "Object"]

external always: 'a eq = "staticallyTypedAlways" [@@bs.module "../common/eq.js"]

external str: string eq = "str" [@@bs.module "../common/eq.js"]

external bool: bool eq = "bool" [@@bs.module "../common/eq.js"]

external int: int eq = "num" [@@bs.module "../common/eq.js"]

external num: float eq = "num" [@@bs.module "../common/eq.js"]

external hash: 'a eq = "hash" [@@bs.module "../common/eq.js"]

external arr: 'a eq -> 'a array eq = "arr" [@@bs.module "../common/eq.js"]

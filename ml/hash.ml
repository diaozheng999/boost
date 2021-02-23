external mul31: int array -> basis:int -> int = "mul31" [@@bs.module "../common/hash.js"]
external mul31': Js.TypedArray2.Uint8Array.t -> int -> int = "mul31" [@@bs.module "../common/hash.js"]

external mul31s: string -> int = "mul31s" [@@bs.module "../common/hash.js"]

external mul31s': string -> basis:int -> int = "mul31s" [@@bs.module "../common/hash.js"]

external fnv1a: int array -> basis:int -> int = "fnv1a" [@@bs.module "../common/hash.js"]
external fnv1a': Js.TypedArray2.Uint8Array.t -> int -> int = "fnv1a" [@@bs.module "../common/hash.js"]

external fnv1as: string -> int = "fnv1as" [@@bs.module "../common/hash.js"]

external hashInt: int -> int = "hashInt" [@@bs.module "../common/hash.js"]

external hashFloat: float -> int = "hashFloat" [@@bs.module "../common/hash.js"]

external hashNumber: float -> int = "hashNumber" [@@bs.module "../common/hash.js"]

external hashBoolean: bool -> int = "hashBoolean" [@@bs.module "../common/hash.js"]

external hashArray: 'a array -> int = "hashArray" [@@bs.module "../common/hash.js"]

external hashObject: 'a Js.t -> int = "hashObject" [@@bs.module "../common/hash.js"]

external hash: 'a -> int = "hash" [@@bs.module "../common/hash.js"]

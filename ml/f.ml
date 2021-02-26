external identity: 'a -> 'a = "identity" [@@bs.module "../common/f.js"]

external noop: unit -> unit = "noop" [@@bs.module "../common/f.js"]

external curry: ('a -> 'b -> 'c [@bs]) -> 'a -> 'b -> 'c = "mkCurry" [@@bs.module "../common/f.js"]
external curry2: ('a -> 'b -> 'c -> 'd [@bs]) -> 'a -> ('b -> 'c -> 'd [@bs]) = "mkCurry" [@@bs.module "../common/f.js"]
external curry3: ('a -> 'b -> 'c -> 'd -> 'e [@bs]) -> 'a -> ('b -> 'c -> 'd -> 'e [@bs]) [@bs] = "mkCurry" [@@bs.module "../common/f.js"]

external curry': ('a -> 'b -> 'c [@bs]) -> 'a -> ('b -> 'c [@bs]) [@bs] = "curry" [@@bs.module "../common/f.js"]

external curryRight: ('a -> 'b -> 'c [@bs]) -> 'b -> 'a -> 'c = "__opt_curry2r1" [@@bs.module "../common/f.js"]
external curryRight2: ('a -> 'b -> 'c -> 'd [@bs]) -> 'c -> ('a -> 'b -> 'd [@bs]) = "__opt_curry3r1" [@@bs.module "../common/f.js"]
external curryRight3: ('a -> 'b -> 'c -> 'd -> 'e [@bs]) -> 'd -> ('a -> 'b -> 'c -> 'e [@bs]) = "mkCurryRight" [@@bs.module "../common/f.js"]

external curryRight': ('a -> 'b -> 'c [@bs]) -> 'b -> ('a -> 'c [@bs]) [@bs] = "curryRight" [@@bs.module "../common/f.js"]

external compose: ('a -> 'b) -> ('b -> 'c) -> ('a -> 'c) = "compose" [@@bs.module "../common/f.js"]

external uncurry: ('a -> 'b -> 'c) -> ('a -> 'b -> 'c [@bs]) = "uncurry2" [@@bs.module "../common/f.js"]

external uncurryRight: ('a -> 'b -> 'c) -> ('b -> 'a -> 'c [@bs]) = "uncurry2r1" [@@bs.module "../common/f.js"]

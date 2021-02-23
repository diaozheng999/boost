open Traits

external clamp: ?lo:float -> ?hi:float -> float -> float = "clampV" [@@bs.module "../common/clamp.js"]

external clamp01: int -> int = "clamp01" [@@bs.module "../common/clamp.js"]

external clamp01f: float -> float = "clamp01" [@@bs.module "../common/clamp.js"]

external clampForComparison: int -> abs_ord = "clampForComparison" [@@bs.module "../common/clamp.js"]

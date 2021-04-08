open Traits

external clamp : ?lo:float -> ?hi:float -> float -> float = "clampV"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external clamp01 : int -> int = "clamp01"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external clamp01f : float -> float = "clamp01"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external clamp_for_comparison : int -> abs_ord = "clampForComparison"
  [@@bs.module "../../.."] [@@bs.scope "common"]

(** Deprecated interfaces using JS naming convention *)

external clampForComparison : int -> abs_ord = "clampForComparison"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to clamp_for_comparison"]

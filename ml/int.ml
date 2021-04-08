external int_of_number : float -> int option = "intOfNumber"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external finite : float -> float option = "finite"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external wrap_nan : float -> float option = "wrapNaN"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external mul : int -> int -> int = "mul"
  [@@bs.module "../../.."] [@@bs.scope "common"]

(** Deprecated interfaces using JS naming convention *)

external intOfNumber : float -> int option = "intOfNumber"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to int_of_number"]

external wrapNaN : float -> float option = "wrapNaN"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to wrap_nan"]

type unique_gen

type unique

type t = unique

external make : unit -> unique_gen = "Unique"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "ds"]

external make_with_label : label:string -> unique_gen = "Unique"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "ds"]

external value : unique_gen -> unique = "value" [@@bs.get]

external string : unique_gen -> string = "string" [@@bs.get]

external number : unique_gen -> int = "number" [@@bs.get]

external of_str : string -> unique = "%identity"
(** magic methods to help with ReScript debugging *)

external to_str : unique -> string = "%identity"

(** Deprecated interfaces using JS naming convention *)

external makeWithLabel : label:string -> unique_gen = "Unique"
  [@@bs.new]
  [@@bs.module "../../.."]
  [@@bs.scope "ds"]
  [@@deprecated "Renamed to make_with_label"]

external fromString : string -> unique = "%identity"
  [@@deprecated "Renamed to of_str"]

external toString : unique -> string = "%identity"
  [@@deprecated "Renamed to to_str"]

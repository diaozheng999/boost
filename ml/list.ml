open Traits

external append : 'a list -> 'a list -> 'a list = "append"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external rev : 'a list -> 'a list = "rev"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external rev_append : 'a list -> 'a list -> 'a list = "revAppend"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external map : 'a list -> f:(('a -> 'b)[@bs.uncurry]) -> 'b list = "mapU"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external rev_map : 'a list -> f:(('a -> 'b)[@bs.uncurry]) -> 'b list = "revMapU"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external of_array : 'a array -> 'a list = "ofArray"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external of_array_rev : 'a array -> 'a list = "ofArrayRev"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external reduce : 'a list -> f:(('a -> 'b -> 'b)[@bs.uncurry]) -> acc:'b -> 'b
  = "reduceU"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external eq : 'a abs_eq -> 'a list abs_eq = "eq"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external serialise : 'a list -> e:'a serialiser -> Js.Json.t = "serialiseU"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

(* TODO: deserialise(U) *)

(** Deprecated interfaces using JS naming convention *)

external each : 'a list -> f:(('a -> unit)[@bs.uncurry]) -> unit = "eachU"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external to_array : 'a list -> 'a array = "toArray"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external head : 'a list -> 'a option = "head"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external head_exn : 'a list -> 'a = "headExn"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external tail : 'a list -> 'a list option = "tail"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external tail_exn : 'a list -> 'a list = "tail"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external filter : 'a list -> f:'a predicate -> 'a list = "filterU"
  [@@bs.module "../../.."] [@@bs.scope "common", "List"]

external revAppend : 'a list -> 'a list -> 'a list = "revAppend"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to rev_append"]

external revMap : 'a list -> f:(('a -> 'b)[@bs.uncurry]) -> 'b list = "revMapU"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to rev_map"]

external ofArray : 'a array -> 'a list = "ofArray"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to of_array"]

external ofArrayRev : 'a array -> 'a list = "ofArrayRev"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to of_array_rev"]

external toArray : 'a list -> 'a array = "toArray"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to to_array"]

external headExn : 'a list -> 'a = "headExn"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to head_exn"]

external tailExn : 'a list -> 'a list = "tail"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "List"]
  [@@deprecated "Renamed to tail_exn"]

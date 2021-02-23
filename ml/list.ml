open Traits

external append: 'a list -> 'a list -> 'a list = "append" [@@bs.module "../common/list.js"]
external rev: 'a list -> 'a list = "rev" [@@bs.module "../common/list.js"]
external revAppend: 'a list -> 'a list -> 'a list = "revAppend" [@@bs.module "../common/list.js"]
external map: 'a list -> f:('a -> 'b [@bs.uncurry]) -> 'b list = "mapU" [@@bs.module "../common/list.js"]
external revMap: 'a list -> f:('a -> 'b [@bs.uncurry]) -> 'b list = "revMapU" [@@bs.module "../common/list.js"]
external ofArray: 'a array -> 'a list = "ofArray" [@@bs.module "../common/list.js"]
external ofArrayRev: 'a array -> 'a list = "ofArrayRev" [@@bs.module "../common/list.js"]
external reduce: 'a list -> f:('a -> 'b -> 'b [@bs.uncurry]) -> acc:'b -> 'b = "reduceU" [@@bs.module "../common/list.js"]
external eq: 'a eq -> 'a list eq = "eq" [@@bs.module "../common/list.js"]
external serialise: 'a list -> e:'a serialiser -> Js.Json.t = "serialiseU" [@@bs.module "../common/list.js"]
(* TODO: deserialise(U) *)

external each: 'a list -> f:('a -> unit [@bs.uncurry]) -> unit = "eachU" [@@bs.module "../common/list.js"]
external toArray: 'a list -> 'a array = "toArray" [@@bs.module "../common/list.js"]

external head: 'a list -> 'a option = "head" [@@bs.module "../common/list.js"]
external headExn: 'a list -> 'a = "headExn" [@@bs.module "../common/list.js"]
external tail: 'a list -> 'a list option = "tail" [@@bs.module "../common/list.js"]
external tailExn: 'a list -> 'a list = "tail" [@@bs.module "../common/list.js"]

external filter: 'a list -> f:('a predicate) -> 'a list = "filterU" [@@bs.module "../common/list.js"]

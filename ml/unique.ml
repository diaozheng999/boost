type unique_gen
type unique

type t = unique

external make: unit -> unique_gen = "Unique" [@@bs.new][@@bs.module "../ds/Unique.js"]
external makeWithLabel: label:string -> unique_gen = "Unique" [@@bs.new][@@bs.module "../ds/Unique.js"]

external value: unique_gen -> unique = "value" [@@bs.get]
external string: unique_gen -> string = "string" [@@bs.get]
external number: unique_gen -> int = "number" [@@bs.get]

(* magic methods to help with ReScript debugging *)
external fromString: string -> unique = "%identity"
external toString: unique -> string = "%identity"

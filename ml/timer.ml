open Boost_internal_promise

type timer = { interrupt : unit -> unit }

type t = timer

external wait : unit -> unit promise = "Timer"
  [@@bs.module "../../.."] [@@bs.scope "async", "Timer"]

external get_timer : unit -> timer = "Timer"
  [@@bs.module "../../.."] [@@bs.scope "async", "Timer"]

external as_promise : timer -> unit promise = "%identity"

external getTimer : unit -> timer = "Timer"
  [@@bs.module "../../.."]
  [@@bs.scope "async", "Timer"]
  [@@deprecated "Renamed to get_timer"]

external asPromise : timer -> unit promise = "%identity"
  [@@deprecated "Renamed to as_promise"]

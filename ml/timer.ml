open Boost_internal_promise

type timer = {
  interrupt: unit -> unit;
}

type t = timer

external wait: unit -> unit promise = "Timer" [@@bs.module "../async/Timer.js"]
external getTimer: unit -> timer = "Timer" [@@bs.module "../async/Timer.js"]

external asPromise: timer -> unit promise = "%identity"

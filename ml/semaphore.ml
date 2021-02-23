open Boost_internal_promise

type sem
type t = sem

external make: int -> sem = "Semaphore" [@@bs.new][@@bs.module "../async/Semaphore"]
external makeWithThreshold: int -> threshold:int -> sem = "Semaphore" [@@bs.new][@@bs.module "../async/Semaphore"]

external wait: sem -> unit promise = "wait" [@@bs.send]
external signal: sem -> unit = "signal" [@@bs.send]

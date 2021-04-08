open Boost_internal_promise

type sem

type t = sem

external make : int -> sem = "Semaphore"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "async"]

external make_with_threshold : int -> threshold:int -> sem = "Semaphore"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "async"]

external wait : sem -> unit promise = "wait" [@@bs.send]

external signal : sem -> unit = "signal" [@@bs.send]

external makeWithThreshold : int -> threshold:int -> sem = "Semaphore"
  [@@bs.new]
  [@@bs.module "../../.."]
  [@@bs.scope "async"]
  [@@deprecated "Renamed to make_with_threshold"]

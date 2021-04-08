open Boost_internal_promise

type mutex

type t = mutex

external make : unit -> mutex = "Mutex"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "async"]

external make_with_init : (unit -> unit promise) -> mutex = "Mutex"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "async"]

external acquire : mutex -> unit promise = "acquire" [@@bs.send]

external release : mutex -> unit = "release" [@@bs.send]

external lock : mutex -> (unit -> unit promise) -> unit promise = "lock"
  [@@bs.send]

external acquire_readonly_access : mutex -> unit promise
  = "acquireReadonlyAccess"
  [@@bs.send]

external makeWithInit : (unit -> unit promise) -> mutex = "Mutex"
  [@@bs.new]
  [@@bs.module "../../.."]
  [@@bs.scope "async"]
  [@@deprecated "Renamed to make_with_init"]

external acquireReadonlyAccess : mutex -> unit promise = "acquireReadonlyAccess"
  [@@bs.send] [@@deprecated "Renamed to acquire_readonly_access"]

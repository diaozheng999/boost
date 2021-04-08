open Boost_internal_promise

type 'a deferred

type 'a t = 'a deferred

external make : unit -> 'a deferred = "Deferred"
  [@@bs.module "../../.."] [@@bs.scope "async"]

external resolve : 'a deferred -> by:'a -> unit = "resolve" [@@bs.send]

external resolve_by : 'a deferred -> by:'a promise -> unit = "resolve"
  [@@bs.send]

external resolve_by_deferred : 'a deferred -> by:'a deferred -> unit = "resolve"
  [@@bs.send]

external reject : 'a deferred -> by:exn -> unit = "reject" [@@bs.send]

external as_promise : 'a deferred -> 'a promise = "%identity"

(** Deprecated interfaces using JS naming convention *)

external resolveBy : 'a deferred -> by:'a promise -> unit = "resolve"
  [@@bs.send] [@@deprecated "Renamed to resolve_by"]

external resolveBy' : 'a deferred -> by:'a deferred -> unit = "resolve"
  [@@bs.send] [@@deprecated "Renamed to resolve_by_deferred"]

external asPromise : 'a deferred -> 'a promise = "%identity"
  [@@deprecated "Renamed to as_promise"]

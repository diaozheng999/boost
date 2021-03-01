open Boost_internal_promise

type 'a deferred

type 'a t = 'a deferred

external make: unit -> 'a deferred = "Deferred" [@@bs.module "../async/Deferred.js"]
external resolve: 'a deferred -> by:'a -> unit = "resolve" [@@bs.send]
external resolveBy: 'a deferred -> by:'a promise -> unit = "resolve" [@@bs.send]
external resolveBy': 'a deferred -> by:'a deferred -> unit = "resolve" [@@bs.send]
external reject: 'a deferred -> by:exn -> unit = "reject" [@@bs.send]

external asPromise: 'a deferred -> 'a promise = "%identity"

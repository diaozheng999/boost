open Boost_internal_promise

type mutex

type t = mutex

external make: unit -> mutex = "Mutex" [@@bs.new][@@bs.module "../async/Mutex.js"]
external makeWithInit: (unit -> unit promise) -> mutex = "Mutex" [@@bs.new][@@bs.module "../async/Mutex.js"]

external acquire: mutex -> unit promise = "acquire" [@@bs.send]
external release: mutex -> unit = "release" [@@bs.send]

external lock: mutex -> (unit -> unit promise) -> unit promise = "lock" [@@bs.send]
external acquireReadonlyAccess: mutex -> unit promise = "acquireReadonlyAccess" [@@bs.send]

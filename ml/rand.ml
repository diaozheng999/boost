open Traits

type ugen
type 'a gen = ugen option -> 'a

external math: ugen = "random" [@@bs.val][@@bs.scope "Math"]

external standardNormal: unit -> float gen = "normal" [@@bs.module "../common/rand.js"]
external normal: mean:float -> stddev:float -> float gen = "normal" [@@bs.module "../common/rand.js"]
external random: min:float -> max:float -> float gen = "random" [@@bs.module "../common/rand.js"]
external until: pred:'a predicate -> 'a gen -> 'a gen = "until" [@@bs.module "../common/rand.js"]
external except: pred:'a predicate -> 'a gen -> 'a gen = "except" [@@bs.module "../common/rand.js"]
external map: 'a gen -> f:('a -> 'b [@bs.uncurry]) -> 'b gen = "t" [@@bs.module "../common/rand.js"]
external randint: max:int -> int gen = "randint" [@@bs.module "../common/rand.js"]
external intrange: min:int -> max:int -> int gen = "intrange" [@@bs.module "../common/rand.js"]
external intrangeincl: min:int -> max:int -> int gen = "intrangeincl" [@@bs.module "../common/rand.js"]
external charrange: min:int -> max:int -> string gen = "charrange" [@@bs.module "../common/rand.js"]
external choice: 'a array -> 'a gen = "choice" [@@bs.module "../common/rand.js"]
external choice': string -> string gen = "choice" [@@bs.module "../common/rand.js"]
external bernoulli: p:float -> float gen = "bernoulli" [@@bs.module "../common/rand.js"]
external genchoice: 'a gen array -> 'a gen = "genchoice" [@@bs.module "../common/rand.js"]
external genall: 'a gen array -> collect:('a array -> 'b [@bs.uncurry]) -> 'b gen = "genall" [@@bs.module "../common/rand.js"]
external coin: unit -> float gen = "coin" [@@bs.module "../common/rand.js"]
external pick: ('a gen * float) array -> 'a gen = "pick" [@@bs.module "../common/rand.js"]
external always: 'a -> 'a gen = "always" [@@bs.module "../common/rand.js"]

let gen ?ugen g = g ugen

open Traits

type ugen
type 'a gen = ugen option -> 'a

type coin = Tails | Heads

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
external bernoulli: p:float -> int gen = "bernoulli" [@@bs.module "../common/rand.js"]
external genchoice: 'a gen array -> 'a gen = "genchoice" [@@bs.module "../common/rand.js"]
external gen2: 'a1 gen * 'a2 gen -> collect:('a1 * 'a2 -> 'b [@bs.uncurry]) -> 'b gen = "genall" [@@bs.module "../common/rand.js"]
external gen3: 'a1 gen * 'a2 gen * 'a3 gen -> collect:('a1 * 'a2 * 'a3 -> 'b [@bs.uncurry]) -> 'b gen = "genall" [@@bs.module "../common/rand.js"]
external gen4: 'a1 gen * 'a2 gen * 'a3 gen * 'a4 gen -> collect:('a1 * 'a2 * 'a3 * 'a4 -> 'b [@bs.uncurry]) -> 'b gen = "genall" [@@bs.module "../common/rand.js"]
external genall: 'a gen array -> collect:('a array -> 'b [@bs.uncurry]) -> 'b gen = "genall" [@@bs.module "../common/rand.js"]
external coin: unit -> coin gen = "coin" [@@bs.module "../common/rand.js"]
external pick: ('a gen * float) array -> 'a gen = "pick" [@@bs.module "../common/rand.js"]
external always: 'a -> 'a gen = "always" [@@bs.module "../common/rand.js"]
external bind: 'a gen -> f:('a -> 'b gen [@bs.uncurry]) -> 'b gen = "bind" [@@bs.module "../common/rand.js"]

module Let_syntax : sig
  external return : 'a -> 'a gen = "always" [@@bs.module "../common/rand.js"]
  external map : 'a gen -> f:('a -> 'b [@bs.uncurry]) -> 'b gen = "t" [@@bs.module "../common/rand.js"]
  external bind : 'a gen -> f:('a -> 'b gen [@bs.uncurry]) -> 'b gen = "bind" [@@bs.module "../common/rand.js"]
  val both : 'a gen -> 'b gen -> ('a * 'b) gen
end

val gen : ?ugen:ugen -> 'a gen -> 'a

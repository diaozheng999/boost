open Traits

type ugen

type 'a gen = ugen option -> 'a

type coin = Tails | Heads

external math : ugen = "random" [@@bs.val] [@@bs.scope "Math"]

external std_norm : unit -> float gen = "normal"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external normal : mean:float -> stddev:float -> float gen = "normal"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external random : min:float -> max:float -> float gen = "random"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external until : pred:'a predicate -> 'a gen -> 'a gen = "until"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external except : pred:'a predicate -> 'a gen -> 'a gen = "except"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external map : 'a gen -> f:(('a -> 'b)[@bs.uncurry]) -> 'b gen = "t"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external randint : max:int -> int gen = "randint"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external intrange : min:int -> max:int -> int gen = "intrange"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external intrangeincl : min:int -> max:int -> int gen = "intrangeincl"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external charrange : min:int -> max:int -> string gen = "charrange"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external choice : 'a array -> 'a gen = "choice"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external choice' : string -> string gen = "choice"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external bernoulli : p:float -> int gen = "bernoulli"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external genchoice : 'a gen array -> 'a gen = "genchoice"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external gen2 :
  'a1 gen * 'a2 gen -> collect:(('a1 * 'a2 -> 'b)[@bs.uncurry]) -> 'b gen
  = "genall"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external gen3 :
  'a1 gen * 'a2 gen * 'a3 gen ->
  collect:(('a1 * 'a2 * 'a3 -> 'b)[@bs.uncurry]) ->
  'b gen = "genall"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external gen4 :
  'a1 gen * 'a2 gen * 'a3 gen * 'a4 gen ->
  collect:(('a1 * 'a2 * 'a3 * 'a4 -> 'b)[@bs.uncurry]) ->
  'b gen = "genall"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external genall :
  'a gen array -> collect:(('a array -> 'b)[@bs.uncurry]) -> 'b gen = "genall"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external coin : unit -> coin gen = "coin"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external pick : ('a gen * float) array -> 'a gen = "pick"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external always : 'a -> 'a gen = "always"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

external bind : 'a gen -> f:(('a -> 'b gen)[@bs.uncurry]) -> 'b gen = "bind"
  [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

module Let_syntax : sig
  external return : 'a -> 'a gen = "always"
    [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

  external map : 'a gen -> f:(('a -> 'b)[@bs.uncurry]) -> 'b gen = "t"
    [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

  external bind : 'a gen -> f:(('a -> 'b gen)[@bs.uncurry]) -> 'b gen = "bind"
    [@@bs.module "../../.."] [@@bs.scope "common", "rand"]

  val both : 'a gen -> 'b gen -> ('a * 'b) gen
end

val gen : ?ugen:ugen -> 'a gen -> 'a

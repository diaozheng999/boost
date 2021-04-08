type byte_array = Js.TypedArray2.Uint8Array.t

external mul31 : int array -> basis:int -> int = "mul31"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external mul31_of_bytes : byte_array -> basis:int -> int = "mul31"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external mul31s : string -> int = "mul31s"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external mul31s_with_basis : string -> basis:int -> int = "mul31s"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external fnv1a : int array -> basis:int -> int = "fnv1a"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external fnv1a_of_bytes : byte_array -> basis:int -> int = "fnv1a"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external fnv1as : string -> int = "fnv1as"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash_int : int -> int = "hashInt"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash_float : float -> int = "hashFloat"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash_num : float -> int = "hashNumber"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash_bool : bool -> int = "hashBoolean"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash_array : 'a array -> int = "hashArray"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash_obj : 'a Js.t -> int = "hashObject"
  [@@bs.module "../../.."] [@@bs.scope "common"]

external hash : 'a -> int = "hash"
  [@@bs.module "../../.."] [@@bs.scope "common"]

(** Deprecated interfaces using JS naming convention *)

external mul31' : Js.TypedArray2.Uint8Array.t -> int -> int = "mul31"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to mul31_of_bytes"]

external mul31s' : string -> basis:int -> int = "mul31s"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to mul31s_with_basis"]

external fnv1a' : Js.TypedArray2.Uint8Array.t -> int -> int = "fnv1a"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to fnv1a_of_bytes"]

external hashInt : int -> int = "hashInt"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to hash_int"]

external hashFloat : float -> int = "hashFloat"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to hash_float"]

external hashNumber : float -> int = "hashNumber"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to hash_num"]

external hashBoolean : bool -> int = "hashBoolean"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to hash_bool"]

external hashArray : 'a array -> int = "hashArray"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to hash_array"]

external hashObject : 'a Js.t -> int = "hashObject"
  [@@bs.module "../../.."]
  [@@bs.scope "common"]
  [@@deprecated "Renamed to hash_obj"]

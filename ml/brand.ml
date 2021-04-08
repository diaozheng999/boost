module type Brand = sig
  type t
  val brand: t
end

module Brand (B: Brand) = struct
  type 'a t

  external%private brand_: 'a -> B.t -> 'a t = "brand" [@@bs.module "../../.."][@@scope "common"]
  external%private is_branded_: 'a -> B.t -> bool = "isBranded" [@@bs.module "../../.."][@@scope "common"]
  external unbox: 'a t -> 'a = "%identity" [@@private]

  let brand a = brand_ a B.brand

  let classify a =
    if is_branded_ a B.brand then Some (unbox a)
    else None

end

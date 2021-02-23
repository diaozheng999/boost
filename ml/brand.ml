module type Brand = sig
  type t
  val brand: t
end

module Brand (B: Brand) = struct
  type 'a t

  external brand_: 'a -> B.t -> 'a t = "brand" [@@bs.module "../common/brand.js"][@@private]
  external isBranded_: 'a -> B.t -> bool = "isBranded" [@@bs.module "../common/brand.js"][@@private]
  external unbox: 'a t -> 'a = "%identity" [@@private]

  let brand a = brand_ a B.brand

  let classify a =
    if isBranded_ a B.brand then Some (unbox a)
    else None

end

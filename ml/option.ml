external truthy : 'a -> 'a option = "truthy"
  [@@bs.module "../../.."] [@@bs.scope "common", "Option"]

external of_js : 'a -> 'a option = "ofJS"
  [@@bs.module "../../.."] [@@bs.scope "common", "Option"]

external ofJS : 'a -> 'a option = "ofJS"
  [@@bs.module "../../.."]
  [@@bs.scope "common", "Option"]
  [@@deprecated "Renamed to of_js"]

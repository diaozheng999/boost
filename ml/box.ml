open Traits

type 'a box = {
  value: 'a;
  update: 'a -> unit;
  mutate: ('a -> unit) -> 'a box;
}

type 'a t = 'a box

external make: 'a -> 'a box = "Box" [@@bs.new] [@@bs.module "../ds/Box.js"]

external eq: 'a eq -> 'a box eq = "eqBox" [@@bs.module "../ds/Box.js"]

external compare: 'a abs_compare -> 'a box abs_compare = "compareBox" [@@bs.module "../ds/Box.js"]

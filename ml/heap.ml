open Traits

type ('a, 'p) node = 'p * 'a

type ('a, 'p) heap = {
  push: ('a -> 'p -> unit [@bs]);
  pop: unit -> 'a option;
  copy: unit -> ('a, 'p) heap;
  peek: unit -> ('a, 'p) node option; 
}

type ('a, 'p) t = ('a, 'p) heap

external make: 'p abs_compare -> ('a, 'p) heap = "Heap" [@@bs.new][@@bs.module "../ds/Heap.js"]

external push: ('a, 'p) heap -> 'a -> p:'p -> unit = "push" [@@bs.send]
external pop: ('a, 'p) heap -> 'a option = "pop" [@@bs.send]
external copy: ('a, 'p) heap -> ('a, 'p) heap = "copy" [@@bs.send]
external peek: ('a, 'p) heap -> ('a, 'p) node option = "peek" [@@bs.send]

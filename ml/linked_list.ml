open Traits

type 'a linked_list_node = {
  value : 'a;
  prev : 'a linked_list_node option;
  next : 'a linked_list_node option;
}

type 'a linked_list

type 'a t = 'a linked_list

type 'a node = 'a linked_list_node

external of_array : 'a array -> 'a t = "ofArray"
  [@@bs.module "../../.."] [@@bs.scope "ds", "LinkedList"]

external compare : 'a abs_compare -> 'a t abs_compare = "compare"
  [@@bs.module "../../.."] [@@bs.scope "ds", "LinkedList"]

external eq : 'a abs_eq -> 'a t abs_eq = "eq"
  [@@bs.module "../../.."] [@@bs.scope "ds", "LinkedList"]

external head : 'a t -> 'a node option = "head" [@@bs.send]

external tail : 'a t -> 'a node option = "tail" [@@bs.send]

external make : unit -> 'a t = "LinkedList"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "ds"]

external segment : head:'a node -> tail:'a node -> 'a t = "LinkedList"
  [@@bs.new] [@@bs.module "../../.."] [@@bs.scope "ds"]

external remove_from_front : 'a t -> 'a option = "removeFromFront" [@@bs.send]

external remove_from_end : 'a t -> 'a option = "removeFromEnd" [@@bs.send]

external add_to_front : 'a t -> 'a -> 'a node = "addToFront" [@@bs.send]

external add_to_end : 'a t -> 'a -> 'a node = "addToEnd" [@@bs.send]

external add_before : 'a t -> 'a node -> 'a -> 'a node = "addBefore" [@@bs.send]

external add_after : 'a t -> 'a node -> 'a -> 'a node = "addAfter" [@@bs.send]

external push : 'a t -> 'a -> unit = "push" [@@bs.send]

external pop : 'a t -> 'a option = "pop" [@@bs.send]

external shift : 'a t -> 'a option = "shift" [@@bs.send]

external unshift : 'a t -> 'a -> unit = "unshift" [@@bs.send]

external remove_node : 'a t -> 'a node -> unit = "removeNode" [@@bs.send]

external join_after : 'a t -> 'a node -> 'a t -> unit = "joinAfter" [@@bs.send]

external join_before : 'a t -> 'a node -> 'a t -> unit = "joinBefore"
  [@@bs.send]

external join_at_end : 'a t -> 'a t -> unit = "joinAtEnd" [@@bs.send]

external join_at_front : 'a t -> 'a t -> unit = "joinAtFront" [@@bs.send]

external each : 'a t -> f:('a -> unit) -> unit = "forEach" [@@bs.send]

external for_each_node : 'a t -> f:('a node -> unit) -> unit = "forEachNode"
  [@@bs.send]

external is_cyclic : 'a t -> bool = "isxCyclic" [@@bs.send]

external as_array_like : 'a t -> 'a Js.Array.array_like = "%identity"

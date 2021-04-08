open Traits

type linked_list_node<'t> = Linked_list.node<'t>

type linked_list<'a> = Linked_list.t<'a>

type t<'a> = linked_list<'a>
type node<'a> = linked_list_node<'a>

@deprecated("Module renamed to Linked_list")
@bs.module("../../..") @bs.scope(("ds", "LinkedList"))
external ofArray: array<'a> => t<'a> = "ofArray"

@deprecated("Module renamed to Linked_list")
@bs.module("../../..") @bs.scope(("ds", "LinkedList"))
external compare: abs_compare<'a> => abs_compare<t<'a>> = "compare"

@deprecated("Module renamed to Linked_list")
@bs.module("../../..") @bs.scope(("ds", "LinkedList"))
external eq: abs_eq<'a> => abs_eq<t<'a>> = "eq"

@deprecated("Module renamed to Linked_list")
@bs.send external head: t<'a> => option<node<'a>> = "head"
@deprecated("Module renamed to Linked_list")
@bs.send external tail: t<'a> => option<node<'a>> = "tail"

@deprecated("Module renamed to Linked_list")
@bs.module("../../..") @bs.scope("LinkedList") @bs.new
external make: () => t<'a> = "LinkedList"

@deprecated("Module renamed to Linked_list")
@bs.module("../../..") @bs.scope("LinkedList") @bs.new
external segment: (~head:node<'a>, ~tail:node<'a>) => t<'a> = "LinkedList"

@deprecated("Module renamed to Linked_list")
@bs.send external removeFromFront: t<'a> => option<'a> = "removeFromFront"
@deprecated("Module renamed to Linked_list")
@bs.send external removeFromEnd: t<'a> => option<'a> = "removeFromEnd"
@deprecated("Module renamed to Linked_list")
@bs.send external addToFront: (t<'a>, 'a) => node<'a> = "addToFront"
@deprecated("Module renamed to Linked_list")
@bs.send external addToEnd: (t<'a>, 'a) => node<'a> = "addToEnd"
@deprecated("Module renamed to Linked_list")
@bs.send external addBefore: (t<'a>, node<'a>, 'a) => node<'a> = "addBefore"
@deprecated("Module renamed to Linked_list")
@bs.send external addAfter: (t<'a>, node<'a>, 'a) => node<'a> = "addAfter"
@deprecated("Module renamed to Linked_list")
@bs.send external push: (t<'a>, 'a) => unit = "push"
@deprecated("Module renamed to Linked_list")
@bs.send external pop: t<'a> => option<'a> = "pop"
@deprecated("Module renamed to Linked_list")
@bs.send external shift: t<'a> => option<'a> = "shift"
@deprecated("Module renamed to Linked_list")
@bs.send external unshift: t<'a> => option<'a> = "unshift"

@deprecated("Module renamed to Linked_list")
@bs.send external removeNode: (t<'a>, node<'a>) => unit = "removeNode"
@deprecated("Module renamed to Linked_list")
@bs.send external joinAfter: (t<'a>, node<'a>, t<'a>) => unit = "joinAfter"
@deprecated("Module renamed to Linked_list")
@bs.send external joinBefore: (t<'a>, node<'a>, t<'a>) => unit = "joinBefore"
@deprecated("Module renamed to Linked_list")
@bs.send external joinAtEnd: (t<'a>, t<'a>) => unit = "joinAtEnd"
@deprecated("Module renamed to Linked_list")
@bs.send external joinAtFront: (t<'a>, t<'a>) => unit = "joinAtFront"

@deprecated("Module renamed to Linked_list")
@bs.send external forEach: (t<'a>, ~f:('a => unit)) => unit = "forEach"
@deprecated("Module renamed to Linked_list")
@bs.send external forEachNode: (t<'a>, ~f:(node<'a> => unit)) => unit = "forEachNode"

@deprecated("Module renamed to Linked_list")
@bs.send external isCyclic : t<'a> => bool = "isCyclic"

@deprecated("Module renamed to Linked_list")
external asArrayLike: t<'a> => Js.Array.array_like<'a> = "%identity"

import { compare as jscmp, option } from "../common";
import { Comparison, ComparisonOutcome } from "../traits";
import { Opaque } from "../types";
import { OrderedListBotNode } from "./OrderedListBotNode";
import { OrderedListTopNode } from "./OrderedListTopNode";

declare const OrderNodeWitness: unique symbol;
type OrderNodeWitness = typeof OrderNodeWitness;

export type OrderNode = Opaque<OrderedListBotNode, OrderNodeWitness>;

const parent = new OrderedListTopNode<option<OrderedListBotNode>>({
  id: 0,
  value: undefined,
});

let head = new OrderedListBotNode({ parent, id: 0 });
let memo = head;

parent.value = head;

function compareOrderedList(
  l: OrderedListBotNode,
  r: OrderedListBotNode,
): ComparisonOutcome {
  if (l.parent.id === r.parent.id) {
    return jscmp.num(l.id, r.id);
  }
  return jscmp.num(l.parent.id, r.parent.id);
}

export const compare: Comparison<OrderNode> = compareOrderedList;

export function add(): OrderNode {
  const next = head.newNode();
  head = next;
  return next as OrderNode;
}

export function mem(finger: OrderNode): OrderNode {
  const mem = memo;
  memo = finger;
  return mem as OrderNode;
}

export function setHead(newHead: OrderNode): OrderNode {
  const prevHead = head;
  head = newHead;
  return prevHead as OrderNode;
}

export function getNext(node: OrderNode): option<OrderNode> {
  const next = node.next ?? node.parent.value;
  if (next && compareOrderedList(node, next) < 0) {
    return next as OrderNode;
  }
  return;
}

export function getHead(): OrderNode {
  return head as OrderNode;
}

export function getFirst(): OrderNode {
  const pid = head.parent.id;
  let node = head.parent;
  for (node = node.prev; node.id < pid; node = node.prev);
  if (!node) {
    throw new Error("Invalid Order");
  }
  return node.value as OrderNode;
}

function deleteRange(
  next: option<OrderedListBotNode>,
  stop: OrderedListBotNode,
  parent: OrderedListTopNode<option<OrderedListBotNode>>,
): OrderedListBotNode {
  for (let node = next; node !== stop; node = node.next) {
    if (!node) {
      const nextParent = parent.next;
      return deleteRange(nextParent.value, stop, nextParent);
    }
    if (node === head) {
      if (!node.next) {
        throw new Error("Invalid Order");
      }
      head = node.next;
    }
    node.dispose();
  }
  return stop;
}

function spliceImpl(start: OrderedListBotNode, stop: OrderedListBotNode) {
  if (compareOrderedList(start, stop) < 0) {
    start.next = deleteRange(start.next, stop, start.parent);
  }
}

export function spliceOutIncl(start: OrderNode, stop: OrderNode): void {
  spliceImpl(start, stop);
}

export function spliceOut(start: OrderNode, stop: OrderNode): void {
  const next = stop.next ?? stop.parent.value;
  if (!next) {
    throw new Error("Invalid Order");
  }
  spliceImpl(start, next);
}

export function spliceOutTo(stop: OrderNode): void {
  spliceImpl(head, stop);
}

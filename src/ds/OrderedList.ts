import { compare as jscmp, option } from "../common";
import { Comparison, ComparisonOutcome } from "../traits";
import { Opaque } from "../types";
import { OrderedListBotNode } from "./OrderedListBotNode";
import { OrderedListTopNode } from "./OrderedListTopNode";
import { Unique } from "./Unique";

declare const OrderNodeWitness: unique symbol;
type OrderNodeWitness = typeof OrderNodeWitness;

export type OrderNode = Opaque<OrderedListBotNode, OrderNodeWitness>;

const instances = new Unique("BOLInst");

function compareOrderedList(
  l: OrderedListBotNode,
  r: OrderedListBotNode,
): ComparisonOutcome {
  if (l.parent.brand !== r.parent.brand) {
    throw new Error(
      "Ordered List nodes from different instances cannot be compared.",
    );
  }
  if (l.parent.id === r.parent.id) {
    return jscmp.num(l.id, r.id);
  }
  return jscmp.num(l.parent.id, r.parent.id);
}

export class Instance {
  brand = instances.number;
  parent = new OrderedListTopNode<option<OrderedListBotNode>>(
    {
      id: 0,
      value: undefined,
    },
    this.brand,
  );
  head = new OrderedListBotNode({ parent: this.parent, id: 0 });
  memo = this.head;

  constructor() {
    this.parent.value = this.head;
  }

  private deleteRange(
    next: option<OrderedListBotNode>,
    stop: OrderedListBotNode,
    parent: OrderedListTopNode<option<OrderedListBotNode>>,
  ): OrderedListBotNode {
    if (parent.brand !== this.brand) {
      throw new Error(
        "Invalid operation on Ordered List nodes from different instances",
      );
    }
    for (let node = next; node !== stop; node = node.next) {
      if (!node) {
        const nextParent = parent.next;
        return this.deleteRange(nextParent.value, stop, nextParent);
      }
      if (node === this.head) {
        if (!node.next) {
          throw new Error("Invalid Order");
        }
        this.head = node.next;
      }
      node.dispose();
    }
    return stop;
  }

  private spliceImpl(start: OrderedListBotNode, stop: OrderedListBotNode) {
    if (compareOrderedList(start, stop) < 0) {
      start.next = this.deleteRange(start.next, stop, start.parent);
    }
  }

  add(): OrderNode {
    const next = this.head.newNode();
    this.head = next;
    return next as OrderNode;
  }

  mem(finger: OrderNode): OrderNode {
    const mem = this.memo;
    this.memo = finger;
    return mem as OrderNode;
  }

  setHead(newHead: OrderNode): OrderNode {
    const prevHead = this.head;
    this.head = newHead;
    return prevHead as OrderNode;
  }

  getNext(node: OrderNode): option<OrderNode> {
    const next = node.next ?? node.parent.value;
    if (next && compareOrderedList(node, next) < 0) {
      return next as OrderNode;
    }
    return;
  }

  getHead(): OrderNode {
    return this.head as OrderNode;
  }

  getFirst(): OrderNode {
    const pid = this.head.parent.id;
    let node = this.head.parent;
    for (node = node.prev; node.id < pid; node = node.prev);
    if (!node) {
      throw new Error("Invalid Order");
    }
    return node.value as OrderNode;
  }

  spliceOutIncl(start: OrderNode, stop: OrderNode): void {
    this.spliceImpl(start, stop);
  }

  spliceOut(start: OrderNode, stop: OrderNode): void {
    const next = stop.next ?? stop.parent.value;
    if (!next) {
      throw new Error("Invalid Order");
    }
    this.spliceImpl(start, next);
  }

  spliceOutTo(stop: OrderNode): void {
    this.spliceImpl(this.head, stop);
  }
}

export const compare: Comparison<OrderNode> = compareOrderedList;

const inst = new Instance();

export function add(): OrderNode {
  return inst.add();
}

export function mem(finger: OrderNode): OrderNode {
  return inst.mem(finger);
}

export function setHead(newHead: OrderNode): OrderNode {
  return inst.setHead(newHead);
}

export function getNext(node: OrderNode): option<OrderNode> {
  return inst.getNext(node);
}

export function getHead(): OrderNode {
  return inst.getHead();
}

export function getFirst(): OrderNode {
  return inst.getFirst();
}

export function spliceOutIncl(start: OrderNode, stop: OrderNode): void {
  return inst.spliceOutIncl(start, stop);
}

export function spliceOut(start: OrderNode, stop: OrderNode): void {
  return inst.spliceOut(start, stop);
}

export function spliceOutTo(stop: OrderNode): void {
  return inst.spliceOutTo(stop);
}

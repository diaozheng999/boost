/* @barrel ignore */

import { Disposable } from "nasi";
import { inspect } from "util";
import { INT_MAX, option } from "../common";
import { OrderedListTopNode } from "./OrderedListTopNode";

const MAX_VAL = (INT_MAX >> 1) + 1;
const L_SIZE = 30;
const GAP_SIZE = Math.floor(MAX_VAL / L_SIZE);
const END_V = MAX_VAL - GAP_SIZE;

interface OrderedListBotNodeCtor {
  parent: OrderedListTopNode<option<OrderedListBotNode>>;
  id: number;
  next?: OrderedListBotNode;
}

interface IDeletableOLBotListNode {
  parent?: unknown;
  next?: unknown;
}

function balance(child: option<OrderedListBotNode>): void {
  let node = child;

  if (!node) {
    return;
  }

  let parent = node.parent;

  while (node) {
    for (let i = 0; node; node = node.next, i += GAP_SIZE) {
      node.parent = parent;
      node.id = i;
      if (i >= END_V) {
        node.next = undefined;
        break;
      }
    }

    if (node) {
      parent = parent.add(node);
    }
  }
}

export class OrderedListBotNode {
  parent: OrderedListTopNode<option<OrderedListBotNode>>;
  id: number;
  next?: OrderedListBotNode;
  [Disposable.IsDisposed] = false;

  constructor({ parent, id, next }: OrderedListBotNodeCtor) {
    this.parent = parent;
    this.id = id;
    this.next = next;
  }

  add(node: OrderedListBotNode): OrderedListBotNode {
    const nextId = this.next?.id ?? MAX_VAL;
    const id = (this.id + nextId) >> 1;

    node.parent = this.parent;
    node.id = id;
    node.next = this.next;

    this.next = node;

    if (id === this.id) {
      balance(this.parent?.value);
    }

    return node;
  }

  public newNode(): OrderedListBotNode {
    return this.add(
      new OrderedListBotNode({
        parent: this.parent,
        id: this.id,
        next: this.next,
      }),
    );
  }

  public toString(): string {
    return `<Node ${this.parent.id}//${this.id}>`;
  }

  public dispose(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: IDeletableOLBotListNode = this;
    self.next = undefined;
    self.parent = undefined;
  }

  public [inspect.custom] = (): string => this.toString();
}

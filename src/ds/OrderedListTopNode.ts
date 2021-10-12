/* @barrel ignore */

import { INT_MAX } from "../common";
const T = 1.41421;

interface OrderedListTopNodeCtor<T> {
  prev?: OrderedListTopNode<T>;
  next?: OrderedListTopNode<T>;
  id: number;
  value: T;
}

interface Margin {
  loNode: OrderedListTopNode<unknown>;
  hiNode: OrderedListTopNode<unknown>;
  count: number;
  gapSize: number;
  lo: number;
  hi: number;
}

interface IDisposedOLTopListNode {
  prev?: unknown;
  next?: unknown;
}

function margin(
  mask: number,
  tau: number,
  lo: OrderedListTopNode<unknown>,
  hi: OrderedListTopNode<unknown>,
  bt: number,
  n: number,
): Margin {
  const loNum = bt & ~mask;
  const hiNum = loNum | mask;

  let count = n;
  let loNode = lo;
  for (
    let node = lo;
    node.prev.id >= loNum && node.prev.id <= node.id;
    node = node.prev
  ) {
    ++count;
    loNode = node;
  }

  let hiNode = hi;
  for (
    let node = hi;
    node.next.id <= hiNum && node.next.id >= node.id;
    node = node.next
  ) {
    ++count;
    hiNode = node;
  }

  const gapSize = mask + 1;
  const density = count / gapSize;

  if (density < tau) {
    return {
      loNode,
      hiNode,
      count,
      gapSize,
      lo: loNum,
      hi: hiNum,
    };
  }

  const newMask = (mask << 1) + 1;

  if (newMask === INT_MAX) {
    throw new Error("Ran out of timestamps.");
  }

  return margin(newMask, tau / T, loNode, hiNode, bt, count);
}

function issueId(node: OrderedListTopNode<unknown>) {
  const left = node.prev.id;
  const nextId = node.next.id;
  const right = nextId <= left ? left + 2 : nextId;

  if (left + 1 === right) {
    const { loNode, hiNode, count, gapSize, lo: startTag } = margin(
      1,
      1 / T,
      node,
      node,
      node.id,
      1,
    );

    const delta = Math.floor(gapSize / count);

    for (
      let node = loNode, i = startTag;
      node !== hiNode;
      node = node.next, i += delta
    ) {
      node.id = i;
    }
  } else {
    node.id = (left + right) / 2;
  }
}

export class OrderedListTopNode<T> {
  public value: T;
  public prev: OrderedListTopNode<T>;
  public next: OrderedListTopNode<T>;
  public id: number;
  public brand?: unknown;

  constructor(
    { prev, next, id, value }: OrderedListTopNodeCtor<T>,
    brand?: unknown,
  ) {
    this.value = value;
    this.prev = prev ?? this;
    this.next = next ?? this;
    this.id = id;
    this.brand = brand;
  }

  public add(value: T): OrderedListTopNode<T> {
    const next = this.next;

    const newNode: OrderedListTopNode<T> = new OrderedListTopNode({
      prev: this,
      next,
      id: this.id,
      value,
    });

    this.next = newNode;

    if (next) {
      next.prev = newNode;
    }

    issueId(newNode);

    return newNode;
  }

  public dispose(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: IDisposedOLTopListNode = this;
    self.prev = undefined;
    self.next = undefined;
  }
}

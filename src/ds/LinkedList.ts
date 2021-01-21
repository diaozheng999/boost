import { key, none, Option, option, some } from "../common";
import { Comparison, Equality } from "../traits";
import { LinkedListIterator } from "./LinkedListIterator";

export interface LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T>;
  prev?: LinkedListNode<T>;
}

export class LinkedList<T> {
  static ofArray<T>(values: T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    values.forEach((value) => list.addToEnd(value));
    return list;
  }

  static compare = compareLinkedList;
  static eq = eqLinkedList;

  public head?: LinkedListNode<T>;
  public tail?: LinkedListNode<T>;

  constructor(
    ...value: [] | [head: LinkedListNode<T>, tail: LinkedListNode<T>]
  ) {
    if (value.length) {
      this.head = value[0];
      this.tail = value[1];
    }
  }

  private addNodeBefore(node: LinkedListNode<T>, newNode: LinkedListNode<T>) {
    const prev = node.prev;
    newNode.prev = prev;
    node.prev = newNode;
    newNode.next = node;

    if (prev) {
      prev.next = newNode;
    }

    if (node === this.head) {
      this.head = newNode;
    }
  }

  private addNodeAfter(node: LinkedListNode<T>, newNode: LinkedListNode<T>) {
    const next = node.next;
    newNode.next = next;
    node.next = newNode;
    newNode.prev = node;

    if (next) {
      next.prev = newNode;
    }

    if (node === this.tail) {
      this.tail = newNode;
    }
  }

  private addNodeToEmpty(node: LinkedListNode<T>) {
    this.head = node;
    this.tail = node;
  }

  public removeFromFront(): option<T> {
    if (this.head === undefined) {
      return none();
    }
    const node = this.head;
    this.removeNode(node);
    return some(node.value);
  }

  public removeFromEnd(): option<T> {
    if (this.tail === undefined) {
      return none();
    }
    const node = this.tail;
    this.removeNode(node);
    return some(node.value);
  }

  public addToFront(value: T): LinkedListNode<T> {
    const node = this.makeNode(value);

    if (!this.head) {
      this.addNodeToEmpty(node);
    } else {
      this.addNodeBefore(this.head, node);
    }

    return node;
  }

  public addToEnd(value: T): LinkedListNode<T> {
    const node = this.makeNode(value);

    if (!this.tail) {
      this.addNodeToEmpty(node);
    } else {
      this.addNodeAfter(this.tail, node);
    }

    return node;
  }

  public addAfter(node: LinkedListNode<T>, value: T): LinkedListNode<T> {
    const newNode = this.makeNode(value);
    this.addNodeAfter(node, newNode);
    return newNode;
  }

  public addBefore(node: LinkedListNode<T>, value: T): LinkedListNode<T> {
    const newNode = this.makeNode(value);
    this.addNodeBefore(node, newNode);
    return newNode;
  }

  public push = (value: T): void => void this.addToEnd(value);
  public pop = (): option<T> => this.removeFromEnd();
  public shift = (): option<T> => this.removeFromFront();
  public unshift = (value: T): void => void this.addToFront(value);

  public removeNode(node: LinkedListNode<T>): void {
    const prev = node.prev;
    const next = node.next;

    if (prev) {
      prev.next = next;
    } else {
      this.head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this.tail = prev;
    }

    node.prev = undefined;
    node.next = undefined;
  }

  public joinAfter(node: LinkedListNode<T>, list: LinkedList<T>): void {
    if (!list.head || !list.tail) {
      return;
    }
    const next = node.next;
    node.next = list.head;
    list.head.prev = node;
    list.tail.next = next;

    if (next) {
      next.prev = list.tail;
    }

    if (node === this.tail) {
      this.tail = list.tail;
    }
  }

  public joinBefore(node: LinkedListNode<T>, list: LinkedList<T>): void {
    if (!list.head || !list.tail) {
      return;
    }
    const prev = node.prev;
    node.prev = list.tail;
    list.tail.next = node;
    list.head.prev = prev;

    if (prev) {
      prev.next = list.head;
    }

    if (node === this.head) {
      this.head = list.head;
    }
  }

  public joinAtEnd(list: LinkedList<T>): void {
    if (!this.tail) {
      this.head = list.head;
      this.tail = list.tail;
      return;
    }
    return this.joinAfter(this.tail, list);
  }

  public joinAtFront(list: LinkedList<T>): void {
    if (!this.head) {
      this.head = list.head;
      this.tail = list.tail;
      return;
    }
    return this.joinBefore(this.head, list);
  }

  public forEach(iter: (value: T) => void): void {
    for (let node = this.head; node; node = node.next) {
      iter(node.value);
    }
  }

  public forEachNode(iter: (value: LinkedListNode<T>) => void): void {
    for (let node = this.head; node; node = node.next) {
      iter(node);
    }
  }

  public map<U>(next: (value: T) => U): LinkedList<U> {
    const newList = new LinkedList<U>();
    for (let node = this.head; node; node = node.next) {
      newList.addToEnd(next(node.value));
    }
    return newList;
  }

  public nth(idx: number): option<T> {
    const node = this.nthNode(idx);
    return Option.mapU(node, key("value"));
  }

  public nthNode(idx: number): option<LinkedListNode<T>> {
    if (idx >= 0) {
      return this.nthNodeForward(idx);
    }
    return this.nthNodeReverse(idx);
  }

  private nthNodeForward(idx: number): option<LinkedListNode<T>> {
    let i = 0;
    for (let node = this.head; node; node = node.next, ++i) {
      if (i === idx) {
        return some(node);
      }
    }
    return none();
  }

  private nthNodeReverse(idx: number): option<LinkedListNode<T>> {
    let i = -1;
    for (let node = this.tail; node; node = node.prev, --i) {
      if (i === idx) {
        return some(node);
      }
    }
    return none();
  }

  public mapNode<U>(next: (value: LinkedListNode<T>) => U): LinkedList<U> {
    const newList = new LinkedList<U>();
    for (let node = this.head; node; node = node.next) {
      const tail = newList.tail;
      const newNode = newList.makeNode(next(node));
      if (tail) {
        newList.addNodeAfter(tail, newNode);
      } else {
        newList.addNodeToEmpty(newNode);
      }
    }
    return newList;
  }

  public isCyclic(): boolean {
    let fast = this.head;
    let slow = this.tail;
    do {
      fast = fast?.next?.next;
      slow = slow?.next;

      if (fast && fast === slow) {
        return true;
      }
    } while (fast && slow);
    return false;
  }

  public isValid(): boolean {
    if (this.isCyclic()) {
      return false;
    }
    for (let node = this.head; node; node = node.next) {
      if (node.next && node.next.prev !== node) {
        return false;
      }
    }
    for (let node = this.tail; node; node = node.prev) {
      if (node.prev && node.prev.next !== node) {
        return false;
      }
    }
    return true;
  }

  public toArray(): T[] {
    const arr = [];
    for (let node = this.head; node; node = node.next) {
      arr.push(node.value);
    }
    return arr;
  }

  public toArrayReverse(): T[] {
    const arr = [];
    for (let node = this.tail; node; node = node.prev) {
      arr.push(node.value);
    }
    return arr;
  }

  protected makeNode = (value: T): LinkedListNode<T> => ({
    value,
  });

  public splitAt(
    node: LinkedListNode<T>,
  ): [value: T, prev: option<LinkedList<T>>, next: option<LinkedList<T>>] {
    const { prev, next, value } = node;

    const prevList = prev && this.head && new LinkedList(this.head, prev);
    const nextList = next && this.tail && new LinkedList(next, this.tail);

    node.prev = undefined;
    node.next = undefined;
    next && (next.prev = undefined);
    prev && (prev.next = undefined);

    return [value, Option.ofJS(prevList), Option.ofJS(nextList)];
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return new LinkedListIterator(this.head);
  }

  public iterReverse(): IterableIterator<T> {
    return new LinkedListIterator(this.tail, true);
  }
}

function compareImpl<T, TOutcome>(
  compare: (l: T, r: T) => TOutcome,
  truth: TOutcome,
  leftEmpty: TOutcome,
  rightEmpty: TOutcome,
): (l: LinkedList<T>, r: LinkedList<T>) => TOutcome {
  return (a, b) => {
    let anode = a.head;
    let bnode = b.head;
    while (anode && bnode) {
      const cmp = compare(anode.value, bnode.value);

      if (cmp !== truth) {
        return cmp;
      }

      anode = anode.next;
      bnode = bnode.next;
    }

    if (!anode && !bnode) {
      return truth;
    }

    if (!anode) {
      return leftEmpty;
    }

    return rightEmpty;
  };
}

export function compareLinkedList<T>(
  compareT: Comparison<T>,
): Comparison<LinkedList<T>> {
  return compareImpl(compareT, 0, -1, 1);
}

export function eqLinkedList<T>(
  compareT: Equality<T>,
): Equality<LinkedList<T>> {
  return compareImpl(compareT, true, false, false);
}

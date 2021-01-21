import type { LinkedListNode } from "./LinkedList";

export class LinkedListIterator<T> implements IterableIterator<T> {
  private start?: LinkedListNode<T>;
  private node?: LinkedListNode<T>;
  private rev: boolean;

  constructor(node?: LinkedListNode<T>, rev = false) {
    this.start = node;
    this.node = node;
    this.rev = rev;
  }

  next(): IteratorResult<T> {
    const node = this.node;
    this.node = this.rev ? this.node?.prev : this.node?.next;
    return node ?? { done: true, value: undefined };
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new LinkedListIterator(this.start, this.rev);
  }
}

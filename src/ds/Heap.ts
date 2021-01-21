import { isNone, option } from "../common";

export type HeapNode<T> = [priority: number, value: T];

/** Max Heap */
export class Heap<T> implements Iterable<T> {
  heap: Array<HeapNode<T>> = [];

  push(node: T, priority: number): void {
    this.heap.push([priority, node]);
    this.#heapifyUp(this.heap.length - 1);
  }

  pop(): option<T> {
    if (!this.heap.length) {
      return;
    }

    this.#swap(0, this.heap.length - 1);
    const value = this.heap.pop();

    if (isNone(value)) {
      return;
    }

    this.#heapifyDown(0);

    return value[1];
  }

  copy(): Heap<T> {
    const heap = new Heap<T>();
    for (const val of this.heap) {
      heap.heap.push(val);
    }
    return heap;
  }

  peek(): option<HeapNode<T>> {
    if (!this.heap.length) {
      return;
    }
    return this.heap[0];
  }

  #heapifyUp = (n: number): void => {
    if (!n) {
      return;
    }
    const parent = (n / 2) | 0;
    if (this.heap[n][0] > this.heap[parent][0]) {
      this.#swap(n, parent);
      this.#heapifyUp(parent);
    }
  };

  #heapifyDown = (n: number): void => {
    if (n >= this.heap.length) {
      return;
    }

    const left = n * 2;
    const right = n * 2 + 1;

    const leftValue = this.heap[left]?.[0];
    const rightValue = this.heap[right]?.[0];

    if (!leftValue && !rightValue) {
      return;
    }

    if (rightValue > leftValue && rightValue > this.heap[n][0]) {
      this.#swap(right, n);
      this.#heapifyDown(right);
    } else if (leftValue > this.heap[n][0]) {
      this.#swap(left, n);
      this.#heapifyDown(left);
    }
  };

  #swap = (n: number, p: number): void => {
    const temp = this.heap[n];
    this.heap[n] = this.heap[p];
    this.heap[p] = temp;
  };

  *[Symbol.iterator](): Iterator<T> {
    for (const [, value] of this.heap) {
      yield value;
    }
  }
}

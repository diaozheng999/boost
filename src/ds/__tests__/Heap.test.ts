import { compare } from "../../common";
import { Heap } from "../Heap";

describe("order", () => {
  test("insertion", () => {
    const heap = new Heap<number>(compare.int);
    heap.push(1, 1);
    heap.push(2, 2);
    heap.push(3, 3);
    heap.push(4, 4);
    heap.push(5, 5);

    expect(heap.pop()).toBe(1);
    expect(heap.pop()).toBe(2);
    expect(heap.pop()).toBe(3);
    expect(heap.pop()).toBe(4);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBeUndefined();
  });

  test("insertion 2", () => {
    const heap = new Heap<number>(compare.int);
    heap.push(5, 5);
    heap.push(4, 4);
    heap.push(3, 3);
    heap.push(2, 2);
    heap.push(1, 1);

    expect(heap.pop()).toBe(1);
    expect(heap.pop()).toBe(2);
    expect(heap.pop()).toBe(3);
    expect(heap.pop()).toBe(4);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBeUndefined();
  });
});

test("pop empty", () => {
  const heap = new Heap<number>(compare.int);
  expect(heap.pop()).toBeUndefined();
});

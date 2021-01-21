import { LinkedList } from "../LinkedList";

describe("forward iteration", () => {
  test("zero", () => {
    const list = new LinkedList();
    expect([...list]).toStrictEqual([]);
  });

  test("iter", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4, 5]);
    expect([...list]).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("iter reverse", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4, 5]);
    expect([...list.iterReverse()]).toStrictEqual([5, 4, 3, 2, 1]);
  });

  test("halfway", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4, 5]);
    const iter = list[Symbol.iterator]();
    iter.next();
    iter.next();
    expect([...iter]).toStrictEqual([1, 2, 3, 4, 5]);
    expect(iter.next().value).toBe(3);
    expect(iter.next().value).toBe(4);
    expect(iter.next().value).toBe(5);
    expect(iter.next().done).toBe(true);
  });
});

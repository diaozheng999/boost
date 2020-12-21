import { compare, eq } from "../../common";
import { Box } from "../Box";

describe("Box use cases", () => {
  test("A singular reference that updates multiple times", () => {
    const obj = { a: 1 };
    const box = new Box(obj);

    const p1 = { box };
    const p2 = { box };

    box.update({ a: 2 });

    expect(p1.box.value).toBe(p2.box.value);
    expect(box.value).not.toBe(obj);
    expect(box.value).toBe(p1.box.value);
    expect(box.value).toBe(p2.box.value);
  });

  test("A singular reference that gets mutated", () => {
    const obj = { a: 1 };
    const box = new Box(obj);
    const newBox = box.mutate((v) => v.a++);

    expect(obj.a).toBe(2);
    expect(newBox).not.toBe(box);
    expect(box.value.a).toBe(2);
    expect(newBox.value.a).toBe(2);
    expect(box.value).toBe(newBox.value);
  });

  test("A new reference to the same object (i.e. clone)", () => {
    const obj = { a: 1 };
    const box = new Box(obj);
    const newBox = box.mutate();

    expect(obj.a).toBe(1);
    expect(newBox).not.toBe(box);
    expect(box.value.a).toBe(1);
    expect(newBox.value.a).toBe(1);
    expect(box.value).toBe(newBox.value);
  });
});

describe("comparisons", () => {
  describe("ordered", () => {
    const cmp = Box.compare(compare.num);

    test("identity", () => {
      const box = new Box(0);
      expect(cmp(box, box)).toBe(0);
    });

    test("equality", () => {
      const box0 = new Box(0);
      const box1 = new Box(0);
      expect(cmp(box0, box1)).toBe(0);
    });

    test("inequality <=", () => {
      const box0 = new Box(-1);
      const box1 = new Box(100000);
      expect(cmp(box0, box1)).toBe(-1);
    });

    test("inequality >=", () => {
      const box0 = new Box(-1);
      const box1 = new Box(-100000);
      expect(cmp(box0, box1)).toBe(1);
    });
  });

  describe("equality", () => {
    const cmp = Box.eq(eq.num);

    test("identity", () => {
      const box = new Box(0);
      expect(cmp(box, box)).toBe(true);
    });

    test("equality", () => {
      const box0 = new Box(0);
      const box1 = new Box(0);
      expect(cmp(box0, box1)).toBe(true);
    });

    test("inequality", () => {
      const box0 = new Box(-1);
      const box1 = new Box(100000);
      expect(cmp(box0, box1)).toBe(false);
    });
  });
});

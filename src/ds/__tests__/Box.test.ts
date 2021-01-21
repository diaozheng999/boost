import { compare, eq } from "../../common";
import { Box, unbox } from "../Box";

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

describe("unbox", () => {
  test("unboxing non-objects", () => {
    expect(unbox(null)).toBeNull();
    expect(unbox(undefined)).toBeUndefined();
    expect(unbox(NaN)).toBe(NaN);
    expect(unbox(1)).toBe(1);
    expect(unbox("hallo")).toBe("hallo");
    expect(unbox(Symbol.iterator)).toBe(Symbol.iterator);
  });

  describe("shallow", () => {
    test("nothing to unbox", () => {
      const boxed = { a: 1 };
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.a).toBe(1);
    });

    test("item to unbox", () => {
      const boxed = { a: 1, b: new Box(2) };
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.a).toBe(1);
      expect(unboxed.b).toBe(2);
    });
    test("many items to unbox", () => {
      const boxed = { a: 1, b: new Box(2), c: new Box(3) };
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.a).toBe(1);
      expect(unboxed.b).toBe(2);
      expect(unboxed.c).toBe(3);
    });
  });

  describe("deep", () => {
    test("nothing to unbox", () => {
      const boxed = { a: { b: 1 } };
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.a.b).toBe(1);
    });

    test("1 level", () => {
      const boxed = { a: 1, b: { b: new Box(2) } };
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.b).toBe(boxed.b);
      expect(unboxed.a).toBe(1);
      expect(unboxed.b.b).toBe(2);
    });

    test("nested boxes", () => {
      const boxed = { a: 1, b: new Box({ c: new Box(3), d: 4 }) };
      const boxedb = boxed.b.value;
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.b).toBe(boxed.b);
      expect(unboxed.b.c).toBe(boxedb.c);
      expect(unboxed.a).toBe(1);
      expect(unboxed.b.c).toBe(3);
      expect(unboxed.b.d).toBe(4);
    });

    test("many layers", () => {
      const boxed = { a: 1, b: { c: 3, d: new Box(4) } };
      const unboxed = unbox(boxed);
      expect(unboxed).toBe(boxed);
      expect(unboxed.b).toBe(boxed.b);
      expect(unboxed.b.d).toBe(boxed.b.d);
      expect(unboxed.a).toBe(1);
      expect(unboxed.b.c).toBe(3);
      expect(unboxed.b.d).toBe(4);
    });
  });
});

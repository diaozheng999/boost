import { List, nil } from "..";

describe("js interface", () => {
  describe("ofArray", () => {
    test("empty", () => {
      expect(List.ofArray([])).toBe(nil);
    });
    test("elements", () => {
      const elements = List.ofArray([1, 2, 3]);

      const e0 = List.headExn(elements);
      expect(e0).toBe(1);
      const t0 = List.tailExn(elements);
      const e1 = List.headExn(t0);
      expect(e1).toBe(2);
      const t1 = List.tailExn(t0);
      const e2 = List.headExn(t1);
      expect(e2).toBe(3);
      const t2 = List.tailExn(t1);
      expect(t2).toBe(nil);
      expect(() => List.headExn(t2)).toThrow();
      expect(() => List.tailExn(t2)).toThrow();
    });
  });

  describe("ofArrayRev", () => {
    test("empty", () => {
      expect(List.ofArrayRev([])).toBe(nil);
    });
    test("elements", () => {
      const elements = List.ofArrayRev([1, 2, 3]);

      const e0 = List.headExn(elements);
      expect(e0).toBe(3);
      const t0 = List.tailExn(elements);
      const e1 = List.headExn(t0);
      expect(e1).toBe(2);
      const t1 = List.tailExn(t0);
      const e2 = List.headExn(t1);
      expect(e2).toBe(1);
      const t2 = List.tailExn(t1);
      expect(t2).toBe(nil);
      expect(() => List.headExn(t2)).toThrow();
      expect(() => List.tailExn(t2)).toThrow();
    });
  });
});

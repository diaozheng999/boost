import { cons, eq, l, List, nil } from "..";

describe("js interface", () => {
  describe("ofArray", () => {
    test("empty", () => {
      expect(List.ofArray([])).toBe(nil);
    });
    test("elements", () => {
      const elements = List.ofArray([1, 2, 3]);
      expect(elements).toStrictEqual(cons(1, cons(2, cons(3, nil))));
    });

    test("shortcut", () => {
      const elements = l(1, 2, 3);
      expect(elements).toStrictEqual(cons(1, cons(2, cons(3, nil))));
    });
  });

  describe("ofArrayRev", () => {
    test("empty", () => {
      expect(List.ofArrayRev([])).toBe(nil);
    });
    test("elements", () => {
      const elements = List.ofArrayRev([1, 2, 3]);
      expect(elements).toStrictEqual(cons(3, cons(2, cons(1, nil))));
    });
  });

  describe("append", () => {
    test("empty, empty", () => {
      expect(List.append(nil, nil)).toBe(nil);
    });
    test("empty, filled", () => {
      const left = nil;
      const right = l(1, 2);

      const appended = List.append(left, right);

      expect(appended).toBe(right);
    });

    test("filled, empty", () => {
      const left = l(1, 2);
      const right = nil;

      const appended = List.append(left, right);

      expect(appended).not.toBe(left);
      expect(appended).not.toBe(right);

      expect(appended).toStrictEqual(left);
    });

    test("filled, filled", () => {
      const left = l(1, 2, 3);
      const right = l(4, 5);

      const appended = List.append(left, right);

      expect(List.toArray(appended)).toStrictEqual([1, 2, 3, 4, 5]);
    });
  });
});

describe("rev", () => {
  test("nil", () => {
    expect(List.rev(nil)).toBe(nil);
  });

  test("not nil", () => {
    expect(List.rev(l(1, 2, 3, 4, 5))).toStrictEqual(l(5, 4, 3, 2, 1));
  });
});

describe("revAppend", () => {
  test("nil, nil", () => {
    expect(List.revAppend(nil, nil)).toBe(nil);
  });
  test("nil, elem", () => {
    expect(List.revAppend(nil, l(1, 2, 3))).toStrictEqual(l(1, 2, 3));
  });
  test("elem, nil", () => {
    expect(List.revAppend(l(1, 2, 3), nil)).toStrictEqual(l(3, 2, 1));
  });
  test("elem, elem", () => {
    expect(List.revAppend(l(1, 2, 3), l(4, 5))).toStrictEqual(l(3, 2, 1, 4, 5));
  });
});

describe("map", () => {
  const map = List.map((e: number) => e.toString());

  test("nil", () => {
    expect(map(nil)).toBe(nil);
  });

  test("elem", () => {
    expect(map(l(1, 2, 3))).toStrictEqual(l("1", "2", "3"));
  });
});

describe("revmap", () => {
  const revmap = List.revMap((e: number) => e.toString());

  test("nil", () => {
    expect(revmap(nil)).toBe(nil);
  });

  test("elem", () => {
    expect(revmap(l(1, 2, 3))).toStrictEqual(l("3", "2", "1"));
  });
});

describe("eq", () => {
  const eqf = List.eq(eq.is);

  test("nil", () => {
    expect(eqf(nil, nil)).toBe(true);
  });

  test("same", () => {
    expect(eqf(l(1, 2, 3, 4), l(1, 2, 3, 4))).toBe(true);
  });

  test("diff", () => {
    expect(eqf(l(1, 2, 3, 5), l(1, 2, 3, 4))).toBe(false);
  });

  test("longer", () => {
    expect(eqf(l(1, 2, 3), l(1, 2, 3, 4))).toBe(false);
  });

  test("shorter", () => {
    expect(eqf(l(1, 2, 3, 4, 5), l(1, 2, 3, 4))).toBe(false);
  });
});

describe("reduce", () => {
  const reduce = List.reduce((v: number, acc: number) => v - acc, 0);

  test("nil", () => {
    expect(reduce(nil)).toBe(0);
  });

  test("some values", () => {
    // 1 - 0 = 1
    // 2 - 1 = 1
    // 3 - 1 = 2
    // 4 - 2 = 2
    expect(reduce(l(1, 2, 3, 4))).toBe(2);
  });

  test("different values (non associative)", () => {
    // 4 - 0 = 4
    // 3 - 4 = -1
    // 2 - (-1) = 3
    // 1 - 3 = -2
    expect(reduce(l(4, 3, 2, 1))).toBe(-2);
  });
});

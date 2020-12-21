/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { compare, eq } from "../../common";
import { LinkedList, LinkedListNode } from "../LinkedList";

describe("array functions", () => {
  test("empty", () => {
    const list = LinkedList.ofArray([]);
    expect(list.toArray()).toStrictEqual([]);
    expect(list.toArrayReverse()).toStrictEqual([]);
  });

  test("1 item", () => {
    const list = LinkedList.ofArray([1]);
    expect(list.toArray()).toStrictEqual([1]);
    expect(list.toArrayReverse()).toStrictEqual([1]);
  });

  test("2 items", () => {
    const list = LinkedList.ofArray([1, 2]);
    expect(list.toArray()).toStrictEqual([1, 2]);
    expect(list.toArrayReverse()).toStrictEqual([2, 1]);
  });

  test("many items", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4, 5, 6]);
    expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(list.toArrayReverse()).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });
});

describe.each`
  fname
  ${"addToFront"}
  ${"unshift"}
`(
  "insert to front (name=$fname)",
  ({ fname }: { fname: "addToFront" | "unshift" }) => {
    test("from blank list", () => {
      const list = new LinkedList<number>();
      list[fname](0);
      expect(list.toArray()).toStrictEqual([0]);
      expect(list.toArrayReverse()).toStrictEqual([0]);
    });

    test("from list with item", () => {
      const list = LinkedList.ofArray([0]);
      list[fname](1);
      expect(list.toArray()).toStrictEqual([1, 0]);
      expect(list.toArrayReverse()).toStrictEqual([0, 1]);
    });

    test("from list with many items", () => {
      const list = LinkedList.ofArray([0, 1, 2]);
      list[fname](3);
      expect(list.toArray()).toStrictEqual([3, 0, 1, 2]);
      expect(list.toArrayReverse()).toStrictEqual([2, 1, 0, 3]);
    });

    test("after remove from front", () => {
      const list = LinkedList.ofArray([0, 1, 2]);
      list.removeFromFront();
      list[fname](3);
      expect(list.toArray()).toStrictEqual([3, 1, 2]);
      expect(list.toArrayReverse()).toStrictEqual([2, 1, 3]);
    });

    test("after remove from end", () => {
      const list = LinkedList.ofArray([0, 1, 2]);
      list.removeFromEnd();
      list[fname](3);
      expect(list.toArray()).toStrictEqual([3, 0, 1]);
      expect(list.toArrayReverse()).toStrictEqual([1, 0, 3]);
    });
  },
);

describe("nth", () => {
  test("nth from 0", () => {
    const list = new LinkedList<number>();
    const p = list.nth(0);
    expect(p).toBeUndefined();
  });

  test("nth from 1", () => {
    const list = LinkedList.ofArray(["a"]);
    expect(list.nth(0)).toBe("a");
    expect(list.nth(1)).toBeUndefined();
    expect(list.nth(-1)).toBe("a");
    expect(list.nth(-2)).toBeUndefined();
  });

  test("nth from many", () => {
    const list = LinkedList.ofArray(["a", "b", "c", "d"]);
    expect(list.nth(0)).toBe("a");
    expect(list.nth(1)).toBe("b");
    expect(list.nth(2)).toBe("c");
    expect(list.nth(3)).toBe("d");
    expect(list.nth(4)).toBeUndefined();

    expect(list.nth(-1)).toBe("d");
    expect(list.nth(-2)).toBe("c");
    expect(list.nth(-3)).toBe("b");
    expect(list.nth(-4)).toBe("a");
    expect(list.nth(-5)).toBeUndefined();
  });
});

describe.each`
  fname
  ${"addToEnd"}
  ${"push"}
`(
  "insert to end (name=$fname)",
  ({ fname }: { fname: "addToEnd" | "push" }) => {
    test("e from blank list", () => {
      const list = new LinkedList<number>();
      list[fname](0);
      expect(list.toArray()).toStrictEqual([0]);
      expect(list.toArrayReverse()).toStrictEqual([0]);
    });

    test("e from list with item", () => {
      const list = LinkedList.ofArray([0]);
      list[fname](1);
      expect(list.toArray()).toStrictEqual([0, 1]);
      expect(list.toArrayReverse()).toStrictEqual([1, 0]);
    });

    test("e from list with many items", () => {
      const list = LinkedList.ofArray([0, 1, 2]);
      list[fname](3);
      expect(list.toArray()).toStrictEqual([0, 1, 2, 3]);
      expect(list.toArrayReverse()).toStrictEqual([3, 2, 1, 0]);
    });

    test("e after remove from front", () => {
      const list = LinkedList.ofArray([0, 1, 2]);
      list.removeFromFront();
      list[fname](3);
      expect(list.toArray()).toStrictEqual([1, 2, 3]);
      expect(list.toArrayReverse()).toStrictEqual([3, 2, 1]);
    });

    test("e after remove from end", () => {
      const list = LinkedList.ofArray([0, 1, 2]);
      list.removeFromEnd();
      list[fname](3);
      expect(list.toArray()).toStrictEqual([0, 1, 3]);
      expect(list.toArrayReverse()).toStrictEqual([3, 1, 0]);
    });
  },
);

describe("other node additions", () => {
  test("add before", () => {
    const list = LinkedList.ofArray([0, 1, 2, 3, 4, 5]);
    const node = list.nthNode(3);
    list.addBefore(node!, 1000);
    expect(list.toArray()).toStrictEqual([0, 1, 2, 1000, 3, 4, 5]);
    expect(list.toArrayReverse()).toStrictEqual([5, 4, 3, 1000, 2, 1, 0]);
  });

  test("add after", () => {
    const list = LinkedList.ofArray([0, 1, 2, 3, 4, 5]);
    const node = list.nthNode(3);
    list.addAfter(node!, 1000);
    expect(list.toArray()).toStrictEqual([0, 1, 2, 3, 1000, 4, 5]);
    expect(list.toArrayReverse()).toStrictEqual([5, 4, 1000, 3, 2, 1, 0]);
  });
});

describe("joins", () => {
  describe("join at end", () => {
    test("empty empty", () => {
      const list1 = LinkedList.ofArray([]);
      const list2 = LinkedList.ofArray([]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([]);
      expect(list1.toArrayReverse()).toStrictEqual([]);
    });
    test("empty 1", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray([1]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([1]);
      expect(list1.toArrayReverse()).toStrictEqual([1]);
    });
    test("empty many", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray([1, 2, 3, 4]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([1, 2, 3, 4]);
      expect(list1.toArrayReverse()).toStrictEqual([4, 3, 2, 1]);
    });
    test("1 empty", () => {
      const list1 = LinkedList.ofArray([0]);
      const list2 = LinkedList.ofArray<number>([]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([0]);
      expect(list1.toArrayReverse()).toStrictEqual([0]);
    });
    test("1 1", () => {
      const list1 = LinkedList.ofArray([0]);
      const list2 = LinkedList.ofArray([1]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([0, 1]);
      expect(list1.toArrayReverse()).toStrictEqual([1, 0]);
    });
    test("1 many", () => {
      const list1 = LinkedList.ofArray([0]);
      const list2 = LinkedList.ofArray([1, 2, 3, 4]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([0, 1, 2, 3, 4]);
      expect(list1.toArrayReverse()).toStrictEqual([4, 3, 2, 1, 0]);
    });
    test("many empty", () => {
      const list1 = LinkedList.ofArray([0, 2, 3]);
      const list2 = LinkedList.ofArray<number>([]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([0, 2, 3]);
      expect(list1.toArrayReverse()).toStrictEqual([3, 2, 0]);
    });
    test("many 1", () => {
      const list1 = LinkedList.ofArray([0, 2, 3]);
      const list2 = LinkedList.ofArray([1]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([0, 2, 3, 1]);
      expect(list1.toArrayReverse()).toStrictEqual([1, 3, 2, 0]);
    });
    test("many many", () => {
      const list1 = LinkedList.ofArray([0, 9, 8]);
      const list2 = LinkedList.ofArray([1, 2, 3, 4]);

      list1.joinAtEnd(list2);
      expect(list1.toArray()).toStrictEqual([0, 9, 8, 1, 2, 3, 4]);
      expect(list1.toArrayReverse()).toStrictEqual([4, 3, 2, 1, 8, 9, 0]);
    });
  });

  describe("join at front", () => {
    test("empty empty", () => {
      const list1 = LinkedList.ofArray([]);
      const list2 = LinkedList.ofArray([]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([]);
      expect(list1.toArrayReverse()).toStrictEqual([]);
    });
    test("empty 1", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray([1]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([1]);
      expect(list1.toArrayReverse()).toStrictEqual([1]);
    });
    test("empty many", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray([1, 2, 3, 4]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([1, 2, 3, 4]);
      expect(list1.toArrayReverse()).toStrictEqual([4, 3, 2, 1]);
    });
    test("1 empty", () => {
      const list1 = LinkedList.ofArray([0]);
      const list2 = LinkedList.ofArray<number>([]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([0]);
      expect(list1.toArrayReverse()).toStrictEqual([0]);
    });
    test("1 1", () => {
      const list1 = LinkedList.ofArray([0]);
      const list2 = LinkedList.ofArray([1]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([1, 0]);
      expect(list1.toArrayReverse()).toStrictEqual([0, 1]);
    });
    test("1 many", () => {
      const list1 = LinkedList.ofArray([0]);
      const list2 = LinkedList.ofArray([1, 2, 3, 4]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([1, 2, 3, 4, 0]);
      expect(list1.toArrayReverse()).toStrictEqual([0, 4, 3, 2, 1]);
    });
    test("many empty", () => {
      const list1 = LinkedList.ofArray([0, 2, 3]);
      const list2 = LinkedList.ofArray<number>([]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([0, 2, 3]);
      expect(list1.toArrayReverse()).toStrictEqual([3, 2, 0]);
    });
    test("many 1", () => {
      const list1 = LinkedList.ofArray([0, 2, 3]);
      const list2 = LinkedList.ofArray([1]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([1, 0, 2, 3]);
      expect(list1.toArrayReverse()).toStrictEqual([3, 2, 0, 1]);
    });
    test("many many", () => {
      const list1 = LinkedList.ofArray([0, 9, 8]);
      const list2 = LinkedList.ofArray([1, 2, 3, 4]);

      list1.joinAtFront(list2);
      expect(list1.toArray()).toStrictEqual([1, 2, 3, 4, 0, 9, 8]);
      expect(list1.toArrayReverse()).toStrictEqual([8, 9, 0, 4, 3, 2, 1]);
    });
  });

  describe("other joins", () => {
    test("join before mid", () => {
      const list = LinkedList.ofArray([0, 1, 2, 3, 4, 5]);
      const node = list.nthNode(3);
      const list2 = LinkedList.ofArray([10, 11, 12, 13]);
      list.joinBefore(node!, list2);
      expect(list.toArray()).toStrictEqual([0, 1, 2, 10, 11, 12, 13, 3, 4, 5]);
      expect(list.toArrayReverse()).toStrictEqual([
        5,
        4,
        3,
        13,
        12,
        11,
        10,
        2,
        1,
        0,
      ]);
    });

    test("join after mid", () => {
      const list = LinkedList.ofArray([0, 1, 2, 3, 4, 5]);
      const node = list.nthNode(3);
      const list2 = LinkedList.ofArray([10, 11, 12, 13]);
      list.joinAfter(node!, list2);
      expect(list.toArray()).toStrictEqual([0, 1, 2, 3, 10, 11, 12, 13, 4, 5]);
      expect(list.toArrayReverse()).toStrictEqual([
        5,
        4,
        13,
        12,
        11,
        10,
        3,
        2,
        1,
        0,
      ]);
    });
  });
});

describe("loops", () => {
  test("foreach empty", () => {
    const iter = jest.fn();
    const list = LinkedList.ofArray([]);

    list.forEach(iter);

    expect(iter).not.toHaveBeenCalled();
  });

  test("foreach elts", () => {
    const iter = jest.fn();
    const list = LinkedList.ofArray([1, 2, 3]);

    list.forEach(iter);

    expect(iter).toHaveBeenCalledTimes(3);
    expect(iter).toHaveBeenNthCalledWith(1, 1);
    expect(iter).toHaveBeenNthCalledWith(2, 2);
    expect(iter).toHaveBeenNthCalledWith(3, 3);
  });

  test("foreachnode empty", () => {
    const iter = jest.fn();
    const list = LinkedList.ofArray([]);

    list.forEachNode(iter);

    expect(iter).not.toHaveBeenCalled();
  });

  test("foreachnode elts", () => {
    const iter = jest.fn<void, [LinkedListNode<number>]>();
    const list = LinkedList.ofArray([1, 2, 3]);

    list.forEachNode(iter);

    expect(iter).toHaveBeenCalledTimes(3);
    expect(iter.mock.calls[0][0].value).toBe(1);
    expect(iter.mock.calls[1][0].value).toBe(2);
    expect(iter.mock.calls[2][0].value).toBe(3);
  });

  test("map", () => {
    const list = LinkedList.ofArray([1, 2, 3]);
    const list2 = list.map((v) => v + 1);
    expect(list2.toArray()).toStrictEqual([2, 3, 4]);
    expect(list2.toArrayReverse()).toStrictEqual([4, 3, 2]);
  });

  test("mapNode", () => {
    const list = LinkedList.ofArray([1, 2, 3]);
    const list2 = list.mapNode(({ value }) => value + 1);
    expect(list2.toArray()).toStrictEqual([2, 3, 4]);
    expect(list2.toArrayReverse()).toStrictEqual([4, 3, 2]);
  });
});

describe("remove", () => {
  describe.each`
    fname
    ${"removeFromFront"}
    ${"shift"}
  `(
    "from Front (fname=$fname)",
    ({ fname }: { fname: "removeFromFront" | "shift" }) => {
      test("from empty", () => {
        const list = LinkedList.ofArray([]);
        const elt = list[fname]();
        expect(elt).toBeUndefined();
        expect(list.toArray()).toStrictEqual([]);
        expect(list.toArrayReverse()).toStrictEqual([]);
      });
      test("from one", () => {
        const list = LinkedList.ofArray([1]);
        const elt = list[fname]();
        expect(elt).toBe(1);
        expect(list.toArray()).toStrictEqual([]);
        expect(list.toArrayReverse()).toStrictEqual([]);
      });
      test("from two", () => {
        const list = LinkedList.ofArray([1, 2]);
        const elt = list[fname]();
        expect(elt).toBe(1);
        expect(list.toArray()).toStrictEqual([2]);
        expect(list.toArrayReverse()).toStrictEqual([2]);
      });
      test("from many", () => {
        const list = LinkedList.ofArray([1, 2, 3, 4]);
        const elt = list[fname]();
        expect(elt).toBe(1);
        expect(list.toArray()).toStrictEqual([2, 3, 4]);
        expect(list.toArrayReverse()).toStrictEqual([4, 3, 2]);
      });
    },
  );

  describe.each`
    fname
    ${"removeFromEnd"}
    ${"pop"}
  `(
    "from End (fname=$fname)",
    ({ fname }: { fname: "removeFromEnd" | "pop" }) => {
      test("e from empty", () => {
        const list = LinkedList.ofArray([]);
        const elt = list[fname]();
        expect(elt).toBeUndefined();
        expect(list.toArray()).toStrictEqual([]);
        expect(list.toArrayReverse()).toStrictEqual([]);
      });
      test("e from one", () => {
        const list = LinkedList.ofArray([1]);
        const elt = list[fname]();
        expect(elt).toBe(1);
        expect(list.toArray()).toStrictEqual([]);
        expect(list.toArrayReverse()).toStrictEqual([]);
      });
      test("e from two", () => {
        const list = LinkedList.ofArray([1, 2]);
        const elt = list[fname]();
        expect(elt).toBe(2);
        expect(list.toArray()).toStrictEqual([1]);
        expect(list.toArrayReverse()).toStrictEqual([1]);
      });
      test("e from many", () => {
        const list = LinkedList.ofArray([1, 2, 3, 4]);
        const elt = list[fname]();
        expect(elt).toBe(4);
        expect(list.toArray()).toStrictEqual([1, 2, 3]);
        expect(list.toArrayReverse()).toStrictEqual([3, 2, 1]);
      });
    },
  );

  test("remove from center", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4, 5]);
    const node = list.nthNode(2);
    list.removeNode(node!);
    expect(list.toArray()).toStrictEqual([1, 2, 4, 5]);
    expect(list.toArrayReverse()).toStrictEqual([5, 4, 2, 1]);
  });
});

describe("validity", () => {
  test("empty", () => {
    const list = LinkedList.ofArray([]);
    expect(list.isValid()).toBe(true);
  });

  test("one", () => {
    const list = LinkedList.ofArray([1]);
    expect(list.isValid()).toBe(true);
  });

  test("many", () => {
    const list = LinkedList.ofArray([1, 2, 3]);
    expect(list.isValid()).toBe(true);
  });

  test("bad back-pointer", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4]);
    const node = list.nthNode(2)!;
    node.prev = list.nthNode(0)!;
    expect(list.isValid()).toBe(false);
  });

  test("bad forward-pointer", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4]);
    const node = list.nthNode(2)!;
    node.next = list.nthNode(0)!;
    expect(list.isValid()).toBe(false);
  });

  test("bad head edge-pointer", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4]);
    const head = list.nthNode(0)!;
    const tail = list.nthNode(-1)!;
    head.prev = tail;

    expect(list.isValid()).toBe(false);
  });

  test("bad tail edge-pointer", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4]);
    const head = list.nthNode(0)!;
    const tail = list.nthNode(-1)!;
    tail.next = head;

    expect(list.isValid()).toBe(false);
  });

  test("cyclic", () => {
    const list = LinkedList.ofArray([1, 2, 3, 4]);
    const head = list.nthNode(0)!;
    const tail = list.nthNode(-1)!;
    tail.next = head;
    head.prev = tail;

    expect(list.isValid()).toBe(false);
  });
});

describe("spliting", () => {
  test("at head", () => {
    const list = LinkedList.ofArray([0, 1, 2, 3, 4]);
    const node = list.nthNode(0)!;

    const [value, prev, next] = list.splitAt(node);

    expect(value).toBe(0);
    expect(prev).toBeUndefined();
    expect(next?.isValid()).toBe(true);
    expect(next?.toArray()).toStrictEqual([1, 2, 3, 4]);
    expect(next?.toArrayReverse()).toStrictEqual([4, 3, 2, 1]);
  });

  test("at tail", () => {
    const list = LinkedList.ofArray([0, 1, 2, 3, 4]);
    const node = list.nthNode(-1)!;

    const [value, prev, next] = list.splitAt(node);

    expect(value).toBe(4);
    expect(prev?.isValid()).toBe(true);
    expect(next).toBeUndefined();
    expect(prev?.toArray()).toStrictEqual([0, 1, 2, 3]);
    expect(prev?.toArrayReverse()).toStrictEqual([3, 2, 1, 0]);
  });

  test("at mid", () => {
    const list = LinkedList.ofArray([0, 1, 2, 3, 4]);
    const node = list.nthNode(2)!;

    const [value, prev, next] = list.splitAt(node);

    expect(value).toBe(2);
    expect(prev?.isValid()).toBe(true);
    expect(next?.isValid()).toBe(true);
    expect(prev?.toArray()).toStrictEqual([0, 1]);
    expect(prev?.toArrayReverse()).toStrictEqual([1, 0]);
    expect(next?.toArray()).toStrictEqual([3, 4]);
    expect(next?.toArrayReverse()).toStrictEqual([4, 3]);
  });
});

describe("comparison", () => {
  describe("equality", () => {
    const cmp = LinkedList.eq(eq.num);

    test("eq identity", () => {
      const list = LinkedList.ofArray([1, 2, 3, 4, 5]);
      expect(cmp(list, list)).toBe(true);
    });

    test("eq empty", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray<number>([]);
      expect(cmp(list1, list2)).toBe(true);
    });

    test("diff length", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray([1]);
      expect(cmp(list1, list2)).toBe(false);
    });

    test("diff length rev", () => {
      const list1 = LinkedList.ofArray([1, 2]);
      const list2 = LinkedList.ofArray([1]);
      expect(cmp(list1, list2)).toBe(false);
    });

    test("same length diff elem", () => {
      const list1 = LinkedList.ofArray([1, 2]);
      const list2 = LinkedList.ofArray([1, 3]);
      expect(cmp(list1, list2)).toBe(false);
    });

    test("same length same elem", () => {
      const list1 = LinkedList.ofArray([1, 2]);
      const list2 = LinkedList.ofArray([1, 2]);
      expect(cmp(list1, list2)).toBe(true);
    });
  });

  describe("comparison", () => {
    const cmp = LinkedList.compare(compare.num);

    test("eq identity", () => {
      const list = LinkedList.ofArray([1, 2, 3, 4, 5]);
      expect(cmp(list, list)).toBe(0);
    });

    test("eq empty", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray<number>([]);
      expect(cmp(list1, list2)).toBe(0);
    });

    test("diff length", () => {
      const list1 = LinkedList.ofArray<number>([]);
      const list2 = LinkedList.ofArray([1]);
      expect(cmp(list1, list2)).toBe(-1);
    });

    test("diff length rev", () => {
      const list1 = LinkedList.ofArray([1, 2]);
      const list2 = LinkedList.ofArray([1]);
      expect(cmp(list1, list2)).toBe(1);
    });

    test("same length diff elem", () => {
      const list1 = LinkedList.ofArray([1, 2]);
      const list2 = LinkedList.ofArray([1, 3]);
      expect(cmp(list1, list2)).toBe(-1);
    });

    test("same length diff elem 2", () => {
      const list1 = LinkedList.ofArray([1, 4]);
      const list2 = LinkedList.ofArray([1, 3]);
      expect(cmp(list1, list2)).toBe(1);
    });

    test("same length same elem", () => {
      const list1 = LinkedList.ofArray([1, 2]);
      const list2 = LinkedList.ofArray([1, 2]);
      expect(cmp(list1, list2)).toBe(0);
    });
  });
});

import { eq } from "../common";

function rnd(n: number) {
  while (true) {
    const p = Math.floor(Math.random() * n);
    if (p < n) {
      return p;
    }
  }
}

function permute(n: number): number[] {
  if (n === 0) {
    return [];
  }
  const n0 = rnd(n);
  const n1 = permute(n - 1).map((n) => (n >= n0 ? n + 1 : n));
  return [n0, ...n1];
}

function perfOne(
  label: string,
  types: Record<string, () => void>,
  ntries: number,
  key: string,
) {
  for (let i = 0; i < ntries; ++i) {
    console.log(`Executing try ${i}`);
    const lbl = `[${i}] ${label} > ${key}`;
    console.time(lbl);
    types[key]();
    console.timeEnd(lbl);
  }
}

function perf(
  label: string,
  types: Record<string, () => void>,
  ntries: number,
) {
  const keys = Object.keys(types);
  const values = keys.map((k) => types[k]);

  for (let i = 0; i < ntries; ++i) {
    console.log(`Preparing try ${i}`);
    const idx = permute(keys.length);
    console.log(`Executing try ${i}`);
    for (const j of idx) {
      const lbl = `[${i}] ${label} > ${keys[j]}`;
      console.time(lbl);
      values[j]();
      console.timeEnd(lbl);
    }
  }
}

const f = (a: number, b: number) => a + b;

perf(
  "compare",
  {
    "0, many": () => {
      const a =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      const b = "";
      console.log(eq.str(a, b));
    },
    mid: () => {
      const a =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      const b =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      console.log(eq.str(a, b));
    },
    equal: () => {
      const a =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      const b =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      console.log(eq.str(a, b));
    },
  },
  10,
);

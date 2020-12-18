import { Option } from "nasi";
import { some } from "../fp";

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

perfOne(
  "opt map",
  {
    boost: () => {
      for (let i = 0; i < 100000; ++i) {
        some(5).map((n) => n + 1);
      }
    },
    nasi: () => {
      for (let i = 0; i < 100000; ++i) {
        Option.map(5, (n) => n + 1);
      }
    },
    baseline: () => {
      for (let i = 0; i < 100000; ++i) {
        ((n) => n + 1)(5);
      }
    },
  },
  10,
  "boost",
);

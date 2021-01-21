import { cons, nil } from "../common";

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

let normalCons: any = nil;
for (let i = 0; i < 1000000; ++i) {
  normalCons = [i, normalCons];
}

let functionCons = nil;
for (let i = 0; i < 1000000; ++i) {
  functionCons = cons(i, functionCons);
}

perf(
  "list",
  {
    "normal cons": () => {
      let tail: any = nil;
      for (let i = 0; i < 1000000; ++i) {
        tail = [i, tail];
      }
    },
    "normal cons readback": () => {
      let n = 0;
      for (let i = normalCons; i !== nil; i = i[1]) {
        n += i[0];
      }
      console.log(n);
    },
    "function cons": () => {
      let tail = nil;
      for (let i = 0; i < 1000000; ++i) {
        tail = cons(i, tail);
      }
    },
    "function cons readback": () => {
      let n = 0;
      for (let i = functionCons; i !== nil; i = i.t) {
        n += i.h;
      }
      console.log(n);
    },
  },
  10,
);

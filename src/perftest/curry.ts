import {
  curry,
  curryimm1,
  curryRight,
  mkCurryRight,
  __opt_curry2r1,
} from "../common";

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
  "curry",
  {
    "curryrimm1 no applied": () => {
      const curried = __opt_curry2r1(f);
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curried(i)(i + 1);
      }
      console.log(acc);
    },
    "curryRightLast no applied": () => {
      const curried = mkCurryRight(f);
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curried(i)(i + 1);
      }
      console.log(acc);
    },
    "curryrimm1 applied": () => {
      const curried = __opt_curry2r1(f)(1000000);
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curried(i + 1);
      }
      console.log(acc);
    },
    "curryRightLast applied": () => {
      const curried = mkCurryRight(f)(1000000);
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curried(i + 1);
      }
      console.log(acc);
    },
    curryRight: () => {
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curryRight<[number], [number], number>(f, i)(i + 1);
      }
      console.log(acc);
    },
    "curryimm1 no applied": () => {
      const curried = curryimm1(f);
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curried(i)(i + 1);
      }
      console.log(acc);
    },
    "curryimm1 applied": () => {
      const curried = curryimm1(f)(1000000);
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curried(i + 1);
      }
      console.log(acc);
    },
    curry: () => {
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += curry(f, i)(i + 1);
      }
      console.log(acc);
    },
    baseline: () => {
      let acc = 0;
      for (let i = 0; i < 1000000; ++i) {
        acc += f(i, i + 1);
      }
      console.log(acc);
    },
  },
  10,
);

import { Awaited } from "../types";
import { Task } from "./Task";

export class RaceTask<
  TResult,
  T extends Task<unknown, unknown, unknown[]>[]
> extends Task<TResult, T, T> {
  protected exec(...tasks: T): [Promise<TResult>, T] {
    const mapped = tasks.map((value, i) =>
      value.then((res) => {
        this.interruptAllBut(i);
        return res;
      }),
    );
    return [Promise.race(mapped) as Promise<TResult>, tasks];
  }

  private interruptAllBut(id: number) {
    this.state.forEach((task, i) => {
      if (i !== id) {
        task.interrupt();
      }
    });
  }

  onInterrupt(): void {
    this.state.forEach((task) => task.interrupt());
  }
}

type T = Task<unknown, unknown, unknown[]>;

export function race<
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T,
  T6 extends T,
  T7 extends T
>(
  ...tasks: [T1, T2, T3, T4, T5, T6, T7]
): RaceTask<
  | Awaited<T1>
  | Awaited<T2>
  | Awaited<T3>
  | Awaited<T4>
  | Awaited<T5>
  | Awaited<T6>
  | Awaited<T7>,
  [T1, T2, T3, T4, T5, T6, T7]
>;
export function race<
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T,
  T6 extends T
>(
  ...tasks: [T1, T2, T3, T4, T5, T6]
): RaceTask<
  | Awaited<T1>
  | Awaited<T2>
  | Awaited<T3>
  | Awaited<T4>
  | Awaited<T5>
  | Awaited<T6>,
  [T1, T2, T3, T4, T5, T6]
>;
export function race<
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T
>(
  ...tasks: [T1, T2, T3, T4, T5]
): RaceTask<
  Awaited<T1> | Awaited<T2> | Awaited<T3> | Awaited<T4> | Awaited<T5>,
  [T1, T2, T3, T4, T5]
>;
export function race<T1 extends T, T2 extends T, T3 extends T, T4 extends T>(
  ...tasks: [T1, T2, T3, T4]
): RaceTask<
  Awaited<T1> | Awaited<T2> | Awaited<T3> | Awaited<T4>,
  [T1, T2, T3, T4]
>;
export function race<T1 extends T, T2 extends T, T3 extends T>(
  ...tasks: [T1, T2, T3]
): RaceTask<Awaited<T1> | Awaited<T2> | Awaited<T3>, [T1, T2, T3]>;
export function race<T1 extends T, T2 extends T>(
  ...tasks: [T1, T2]
): RaceTask<Awaited<T1> | Awaited<T2>, [T1, T2]>;
export function race<T1 extends T>(...tasks: [T1]): RaceTask<Awaited<T1>, [T1]>;
export function race<TResult, TState, TArgs extends unknown[]>(
  ...tasks: Task<TResult, TState, TArgs>[]
): RaceTask<TResult, Task<TResult, TState, TArgs>[]>;
export function race<TResult, T extends Task<unknown, unknown, unknown[]>[]>(
  ...tasks: T
): RaceTask<TResult, T> {
  return new RaceTask(...tasks);
}

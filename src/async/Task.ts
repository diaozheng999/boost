import { Awaited } from "../types";
import { Deferred } from "./Deferred";

export interface TaskDefinition<T> {
  exec(): Promise<T>;
  onInterrupt?(): void;
}

export interface Task<T> extends Promise<T> {
  interrupt(): void;
}

export type Type<T> = Task<T>;

export function create<T>(task: TaskDefinition<T>): Task<T> {
  const interrupter = Deferred<never>();

  const interrupt = () => {
    interrupter.reject();
    task.onInterrupt?.();
  };

  return Object.assign(Promise.race([task.exec(), interrupter]), {
    interrupt,
  }) as Task<T>;
}

type T = Task<unknown>;

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
): Task<
  | Awaited<T1>
  | Awaited<T2>
  | Awaited<T3>
  | Awaited<T4>
  | Awaited<T5>
  | Awaited<T6>
  | Awaited<T7>
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
): Task<
  | Awaited<T1>
  | Awaited<T2>
  | Awaited<T3>
  | Awaited<T4>
  | Awaited<T5>
  | Awaited<T6>
>;
export function race<
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T
>(
  ...tasks: [T1, T2, T3, T4, T5]
): Task<Awaited<T1> | Awaited<T2> | Awaited<T3> | Awaited<T4> | Awaited<T5>>;
export function race<T1 extends T, T2 extends T, T3 extends T, T4 extends T>(
  ...tasks: [T1, T2, T3, T4]
): Task<Awaited<T1> | Awaited<T2> | Awaited<T3> | Awaited<T4>>;
export function race<T1 extends T, T2 extends T, T3 extends T>(
  ...tasks: [T1, T2, T3]
): Task<Awaited<T1> | Awaited<T2> | Awaited<T3>>;
export function race<T1 extends T, T2 extends T>(
  ...tasks: [T1, T2]
): Task<Awaited<T1> | Awaited<T2>>;
export function race<T1 extends T>(...tasks: [T1]): Task<Awaited<T1>>;
export function race<TResult>(...tasks: Task<TResult>[]): Task<TResult>;
export function race(...tasks: Task<unknown>[]): Task<unknown> {
  const interruptAllBut = (id: number) => {
    tasks.forEach((task, i) => {
      if (i !== id) {
        task.interrupt();
      }
    });
  };

  const mapped = tasks.map((value, i) =>
    value.then((res) => {
      interruptAllBut(i);
      return res;
    }),
  );

  const interrupt = () => {
    tasks.forEach((t) => t.interrupt());
  };
  return Object.assign(Promise.race(mapped), { interrupt }) as Task<unknown>;
}

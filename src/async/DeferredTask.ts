import { Deferred } from "./Deferred";
import { Task } from "./Task";

export type DeferredTask<T> = Deferred<T> & Task<T>;

export function DeferredTask<T>(onInterrupt?: () => void): DeferredTask<T> {
  const inner = Deferred<T>();
  const interrupt = () => {
    onInterrupt?.();
    inner.reject;
  };
  return Object.assign(inner, { interrupt }) as DeferredTask<T>;
}

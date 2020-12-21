import { Timer } from "./Timer";

export * from "./defer";
export * from "./Deferred";
export * from "./DeferredTask";
export * from "./Mutex";
export * from "./race";
export * from "./Semaphore";
export * from "./Task";
export { Timer };

export function wait(ms: number): Timer {
  return new Timer(ms);
}

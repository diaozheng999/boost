import * as Task from "./Task";
import { Timer } from "./Timer";

export * from "./defer";
export * from "./Deferred";
export * from "./DeferredTask";
export * from "./Mutex";
export * from "./Semaphore";
export { Task };
export { Timer };

export function wait(ms: number): Task.Type<void> {
  return Timer(ms);
}

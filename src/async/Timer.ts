import { Deferred } from "./Deferred";
import { create, Task, TaskDefinition } from "./Task";

export interface TimerState {
  timerId: ReturnType<typeof setTimeout>;
  awaiter: Deferred<void>;
}

class TimerDefinition implements TaskDefinition<void> {
  timerId?: number;
  ms: number;

  awaiter = Deferred<void>();

  constructor(ms: number) {
    this.ms = ms;
  }

  exec(): Promise<void> {
    this.timerId = setTimeout(this.awaiter.resolve, this.ms);
    return this.awaiter;
  }

  onInterrupt() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.awaiter.reject();
  }
}

export function Timer(ms: number): Task<void> {
  return create(new TimerDefinition(ms));
}

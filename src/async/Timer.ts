import { Deferred } from "./Deferred";
import { Task } from "./Task";

export interface TimerState {
  timerId: number;
  awaiter: Deferred<void>;
}

export class Timer extends Task<void, TimerState, [number]> {
  protected exec(ms: number): [Promise<void>, TimerState] {
    const awaiter = new Deferred<void>();
    const timerId = setTimeout(awaiter.resolve, ms);
    return [awaiter, { timerId, awaiter }];
  }

  protected onInterrupt(): void {
    const { timerId, awaiter } = this.state;
    clearTimeout(timerId);
    awaiter.reject();
  }
}

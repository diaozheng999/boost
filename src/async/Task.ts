import { Deferred } from "./Deferred";

export abstract class Task<
  T,
  TState,
  TArgs extends unknown[] = []
> extends Promise<T> {
  protected onInterrupt?(): void;
  private taskInterrupt = new Deferred<never>();
  protected declare state: TState;

  constructor(...args: TArgs) {
    super((res, rej) => {
      const [awaiter, state] = this.exec(...args);
      this.state = state;
      Promise.race([awaiter, this.taskInterrupt]).then(res, rej);
    });
  }

  protected setState(values: TState): void {
    this.state = values;
  }

  protected abstract exec(...args: TArgs): [awaiter: Promise<T>, state: TState];

  interrupt = (): void => {
    this.taskInterrupt.reject();
    if (this.onInterrupt) {
      this.onInterrupt();
    }
  };
}

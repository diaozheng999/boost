import { Task } from "./Task";

export abstract class DeferredTask<T, TState> extends Task<T, TState, []> {
  public declare resolve: (value: T | PromiseLike<T>) => void;
  public declare reject: (reason?: unknown) => void;

  protected abstract defer(): TState;

  protected exec(): [Promise<T>, TState] {
    return [
      new Promise((res, rej) => {
        this.resolve = res;
        this.reject = rej;
      }),
      this.defer(),
    ];
  }
}

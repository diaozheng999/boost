export class Deferred<T> extends Promise<T> {
  declare resolve: (value: T | PromiseLike<T>) => void;
  declare reject: (reason?: unknown) => void;

  constructor() {
    super((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}

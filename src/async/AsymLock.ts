import { Mutex } from "./Mutex";

export class AsymLock {
  private value;

  private mutex;

  constructor(begin?: () => Promise<void>) {
    this.mutex = new Mutex(begin);
    this.value = 0;
  }

  public stable = <T>(fn: () => Promise<T>): Promise<T> => {
    return this.mutex.lock(fn);
  };

  public local = <T>(fn: () => Promise<T>): Promise<T> => {
    if (this.value) {
      return this.acquire(fn);
    } else {
      return this.mutex.acquire().then(() => this.acquire(fn));
    }
  };

  private acquire = <T>(fn: () => Promise<T>): Promise<T> => {
    ++this.value;
    return fn().finally(this.tryRelease);
  };

  private tryRelease = () => {
    if (!this.value) {
      this.mutex.release();
    }
  };
}

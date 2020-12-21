import { LinkedList } from "../ds/LinkedList";
import { defer } from "./defer";
import { Semaphore } from "./Semaphore";

export class Mutex {
  static globalMutexSchedule = new LinkedList<Mutex>();

  private sem;
  constructor(begin?: () => Promise<void>) {
    this.sem = new Semaphore(begin ? 1 : 0);
    if (begin) {
      void this.executeBegin(begin);
    }
  }

  private executeBegin(begin: () => Promise<void>) {
    return begin().then(this.sem.signal);
  }

  public acquire = (): Promise<void> => {
    Mutex.globalMutexSchedule.push(this);
    return this.sem.wait();
  };

  public release = (): void => {
    if (Mutex.globalMutexSchedule.pop() !== this) {
      throw new Error(`Last locked item doesn't seem to be correct.`);
    }
    return this.sem.signal();
  };

  public lock = <T>(fn: () => Promise<T>): Promise<T> => {
    const rfn = defer(fn);
    return this.acquire().then(rfn).finally(this.release);
  };

  public acquireReadonlyAccess = async (): Promise<void> => {
    await this.acquire();
    this.release();
  };
}

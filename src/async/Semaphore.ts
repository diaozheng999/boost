import { LinkedList } from "../ds/LinkedList";
import { QueuedSemaphoreTask } from "./QueuedSemaphoreTask";

export class Semaphore {
  private value: number;
  private threshold: number;

  private queue: LinkedList<QueuedSemaphoreTask> = new LinkedList();

  constructor(initialValue: number, threshold = 0) {
    this.value = initialValue;
    this.threshold = threshold;
  }

  public wait = (): Promise<void> => {
    this.exec();
    if (this.value >= this.threshold) {
      --this.value;
      return Promise.resolve();
    }
    const node = new QueuedSemaphoreTask(this.queue);
    return node;
  };

  public signal = (): void => {
    ++this.value;
    this.exec();
  };

  private exec = () => {
    while (this.value) {
      const wait = this.queue.removeFromFront();
      if (wait) {
        --this.value;
        wait.resolve();
      }
    }
  };
}

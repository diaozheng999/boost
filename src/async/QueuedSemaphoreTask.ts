import { LinkedList, LinkedListNode } from "../ds/LinkedList";
import { DeferredTask } from "./DeferredTask";

export class QueuedSemaphoreTask extends DeferredTask<
  void,
  LinkedListNode<QueuedSemaphoreTask>
> {
  private semState: LinkedListNode<QueuedSemaphoreTask>;
  private semList: LinkedList<QueuedSemaphoreTask>;

  constructor(list: LinkedList<QueuedSemaphoreTask>) {
    super();
    this.semState = list.addToEnd(this);
    this.semList = list;
  }

  protected defer(): LinkedListNode<QueuedSemaphoreTask> {
    return this.semState;
  }

  protected onInterrupt(): void {
    this.semList.removeNode(this.state);
  }
}

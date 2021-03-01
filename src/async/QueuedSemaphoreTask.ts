import { LinkedList, LinkedListNode } from "../ds/LinkedList";
import { DeferredTask } from "./DeferredTask";

export type QueuedSemaphoreTask = DeferredTask<void>;

export function QueuedSemaphoreTask(
  queue: LinkedList<QueuedSemaphoreTask>,
): QueuedSemaphoreTask {
  // eslint-disable-next-line prefer-const
  let node: LinkedListNode<QueuedSemaphoreTask>;
  const task = DeferredTask<void>(() => {
    queue.removeNode(node);
  });
  node = queue.addToEnd(task);
  return task;
}

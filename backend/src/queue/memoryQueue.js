// backend/src/queue/memoryQueue.js
const queue = [];

export function enqueue(item) {
  queue.push(item);
}

export function dequeue() {
  return queue.shift();
}

export function size() {
  return queue.length;
}

// 문제3. 이중우선순위큐
/* 
이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조를 말합니다.

명령어	수신 탑(높이)
I 숫자	큐에 주어진 숫자를 삽입합니다.
D 1	큐에서 최댓값을 삭제합니다.
D -1	큐에서 최솟값을 삭제합니다.
이중 우선순위 큐가 할 연산 operations가 매개변수로 주어질 때, 
모든 연산을 처리한 후 큐가 비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값]을 return 하도록 solution 함수를 구현해주세요.

제한사항
operations는 길이가 1 이상 1,000,000 이하인 문자열 배열입니다.
operations의 원소는 큐가 수행할 연산을 나타냅니다.
원소는 “명령어 데이터” 형식으로 주어집니다.- 최댓값/최솟값을 삭제하는 연산에서 최댓값/최솟값이 둘 이상인 경우, 하나만 삭제합니다.
빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은 무시합니다.


operations	                                                                return
["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]	                [0,0]
["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"]	[333, -45]
*/

// 답
class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  peek() {
    return this.heap.length === 0 ? undefined : this.heap[0];
  }

  add(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (index > 0 && this.heap[index] < this.heap[parentIdx]) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  poll() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }

  heapifyDown() {
    let index = 0;
    while (index * 2 + 1 < this.heap.length) {
      let leftIdx = index * 2 + 1;
      let rightIdx = index * 2 + 2;
      let smallerIdx = leftIdx;

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] < this.heap[leftIdx]
      ) {
        smallerIdx = rightIdx;
      }

      if (this.heap[index] <= this.heap[smallerIdx]) {
        break;
      }

      this.swap(index, smallerIdx);
      index = smallerIdx;
    }
  }
}

function solution(operations) {
  const minHeap = new MinHeap();
  let maxHeap = [];

  operations.forEach((op) => {
    const [command, valueStr] = op.split(" ");
    const value = parseInt(valueStr);

    if (command === "I") {
      minHeap.add(value);
      maxHeap.push(value);
      maxHeap = maxHeap.sort((a, b) => b - a);
    } else if (value === 1) {
      if (maxHeap.length > 0) {
        const maxVal = maxHeap.shift();
        const index = minHeap.heap.indexOf(maxVal);
        if (index !== -1) {
          minHeap.heap.splice(index, 1);
        }
      }
    } else if (value === -1) {
      if (minHeap.heap.length > 0) {
        const minVal = minHeap.poll();
        const index = maxHeap.indexOf(minVal);
        if (index !== -1) {
          maxHeap.splice(index, 1);
        }
      }
    }
  });
  const max = maxHeap.length > 0 ? maxHeap[0] : 0;
  const min = minHeap.heap.length > 0 ? minHeap.peek() : 0;

  return [max, min];
}

// 챗지피티의 도움을 빌려빌려
// 어떻게든 힙으로 풀어보고자 노력했습니다. . . . .

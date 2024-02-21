// 문제1. 더 맵게
/*
매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.

섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

제한 사항
scoville의 길이는 2 이상 1,000,000 이하입니다.
K는 0 이상 1,000,000,000 이하입니다.
scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

scoville	            K	return
[1, 2, 3, 9, 10, 12]	7	2
*/

// 답
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
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

function solution(scoville, K) {
  const minHeap = new MinHeap();

  scoville.forEach((sco) => minHeap.add(sco));

  let count = 0;

  while (minHeap.size() > 1 && minHeap.peek() < K) {
    const first = minHeap.poll();
    const second = minHeap.poll();
    const mixed = first + second * 2;
    minHeap.add(mixed);
    count++;
  }

  return minHeap.peek() >= K ? count : -1;
}

// 처음 시도한 오답
function solution(scoville, K) {
  scoville.sort((a, b) => a - b);
  let count = 0;
  while (scoville[0] < K) {
    let newScoville = scoville[0] + scoville[1] * 2;
    count++;
    scoville[0] = newScoville;
  }
  return count;
}
// 이렇게.. 쉽게 풀릴 줄 알았던 ..

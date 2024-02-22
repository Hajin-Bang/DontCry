// 문제2. 디스크 컨트롤러
/* 
하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다.
디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다. 
가장 일반적인 방법은 요청이 들어온 순서대로 처리하는 것입니다.
..
..
문제 생략 .. 
..
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
    while (
      index > 0 &&
      this.heap[index].duration < this.heap[parentIdx].duration
    ) {
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
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;
    let minIdx = index;

    while (leftIdx < this.heap.length) {
      if (this.heap[leftIdx].duration < this.heap[minIdx].duration) {
        minIdx = leftIdx;
      }
      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx].duration < this.heap[minIdx].duration
      ) {
        minIdx = rightIdx;
      }
      if (minIdx !== index) {
        this.swap(index, minIdx);
        index = minIdx;
        leftIdx = index * 2 + 1;
        rightIdx = index * 2 + 2;
      } else {
        break;
      }
    }
  }
}

function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);

  const heap = new MinHeap();
  let time = 0,
    total = 0,
    i = 0;

  while (i < jobs.length || heap.heap.length !== 0) {
    while (i < jobs.length && jobs[i][0] <= time) {
      heap.add({ start: jobs[i][0], duration: jobs[i][1] });
      i++;
    }

    if (heap.heap.length !== 0) {
      const { start, duration } = heap.poll();
      time += duration;
      total += time - start;
    } else {
      time = jobs[i][0];
    }
  }
  return Math.floor(total / jobs.length);
}

// 처음 시도한 오답
// 속성을 비교해야하는데 최소 힙 클래스에서 그걸 빠뜨렸다.
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
      //
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
        this.heap[rightIdx] < this.heap[leftIdx] //
      ) {
        smallerIdx = rightIdx;
      }

      if (this.heap[index] <= this.heap[smallerIdx]) {
        //
        break;
      }

      this.swap(index, smallerIdx);
      index = smallerIdx;
    }
  }
}
// length 속성만을 비교해야한다.
// 이후 length -> duration으로 변경 후 적용

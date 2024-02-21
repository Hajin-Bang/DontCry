# 힙(Heap) 상세 풀이 - 문제2. 디스크 컨트롤러

## 1. 풀이

### 1) MinHeap 클래스 및 메서드 정의

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 두 노드의 위치를 교환
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  // 힙의 루트 노드(최솟값) 반
  peek() {
    return this.heap.length === 0 ? undefined : this.heap[0];
  }
}
```

### 2) 삽입 연산 메서드 정의

#### - 삽입 연산 순서

1. Heap의 마지막 위치에 요소를 추가한다.
2. 부모 노드와 새로 추가한 노드의 값을 비교한다.
   -> 만약 새로 추가된 노드의 값이 부모 노드의 값보다 작다면, 위치를 교환한다.
3. 비교 및 교환을 반복한다.

#### - `duration`

jobs의 내용을 힙에 추가할 때, 각 job을 `{start: 요청 시간, duration: 처리 시간}` 형태로 추가하였다. <br/>
이 문제에서는 각 작업의 "처리 시간"이 스케줄링의 기준이 되므로, <br/>
힙에서 duration 속성만을 비교할 수 있도록 코드를 작성해야한다. <br/>
ex) `this.heap[index].duration`

```js
  // 힙에 새 요소를 추가하고, 재정렬하는 함수
  add(value) {
    this.heap.push(value);
    this.heapifyUp(); // 재정렬 함수
  }

  // 추가된 요소를 재정렬하는 함수
  heapifyUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (index > 0 && this.heap[index].duration < this.heap[parentIdx].duration) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }
```

### 3) 삭제 연산 메서드 정의

#### - 삭제 연산 순서

1. 최솟값(= 루트 노드) 제거
2. 맨 마지막에 있는 노드를 루트 노드로 이동
3. 새로운 루트 노드와 자식 노드의 값을 비교해서 자식 노드가 더 작다면 위치를 교환
4. 값의 비교 반복

#### - `duration`

삽입 연산과 동일하게 duration 속성을 비교하도록 해주었다.

```js
// 힙에서 요소를 삭제하고, 재정렬하는 함수
poll() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    }
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }

  // 최상위 요소가 조건을 만족하도록 재정렬하는 함수
  heapifyDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;
    let minIdx = index;

    while (leftIdx < this.heap.length) {
      if (this.heap[leftIdx].duration < this.heap[minIdx].duration) {
        minIdx = leftIdx;
      }
      if (rightIdx < this.heap.length && this.heap[rightIdx].duration < this.heap[minIdx].duration) {
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
```

### 4) solution 함수

#### - 요약

작업 목록을 먼저 요청시간이 작은 순서대로 정렬한 후, 현재 시간 기준으로 처리 가능한 모든 작업을 최소 힙에 추가한다. <br/>
처리 시간이 짧은 작업을 우선적으로 처리함으로써, 대기하는 작업 수와 전체 대기 시간을 줄일 수 있어 평균 대기 시간을 최소화할 수 있다.

```js
function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]); // 요청시간[0]을 기준으로 오름차순 정렬

  const heap = new MinHeap();
  let time = 0, // 현재 시간
    total = 0, // 총 대기 시간 + 처리 시간
    i = 0; // 인덱스

  // 모든 작업이 처리될 때까지 반복
  while (i < jobs.length || heap.heap.length !== 0) {
    // 현재 시간(time)이하의 작업을 모두 힙에 추가
    while (i < jobs.length && jobs[i][0] <= time) {
      heap.add({ start: jobs[i][0], duration: jobs[i][1] });
      i++;
    }

    // 힙이 비어있지 않다면
    if (heap.heap.length !== 0) {
      const { start, duration } = heap.poll();
      time += duration;
      total += time - start;
    } else {
      // 힙이 비어있다면 다음 작업의 요청 시간으로 이동
      time = jobs[i][0];
    }
  }
  return Math.floor(total / jobs.length);
}
```

## 2. 전체 코드

```js
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
```

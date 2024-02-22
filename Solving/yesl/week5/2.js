// 디스크 컨트롤러

// 문제 설명
// 하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다. 디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다. 가장 일반적인 방법은 요청이 들어온 순서대로 처리하는 것입니다.
// 예를들어
// - 0ms 시점에 3ms가 소요되는 A작업 요청
// - 1ms 시점에 9ms가 소요되는 B작업 요청
// - 2ms 시점에 6ms가 소요되는 C작업 요청
// 와 같은 요청이 들어왔습니다. 이를 그림으로 표현하면 아래와 같습니다.
// 한 번에 하나의 요청만을 수행할 수 있기 때문에 각각의 작업을 요청받은 순서대로 처리하면 다음과 같이 처리 됩니다.
// - A: 3ms 시점에 작업 완료 (요청에서 종료까지 : 3ms)
// - B: 1ms부터 대기하다가, 3ms 시점에 작업을 시작해서 12ms 시점에 작업 완료(요청에서 종료까지 : 11ms)
// - C: 2ms부터 대기하다가, 12ms 시점에 작업을 시작해서 18ms 시점에 작업 완료(요청에서 종료까지 : 16ms)
// 이 때 각 작업의 요청부터 종료까지 걸린 시간의 평균은 10ms(= (3 + 11 + 16) / 3)가 됩니다.
// 하지만 A → C → B 순서대로 처리하면
// - A: 3ms 시점에 작업 완료(요청에서 종료까지 : 3ms)
// - C: 2ms부터 대기하다가, 3ms 시점에 작업을 시작해서 9ms 시점에 작업 완료(요청에서 종료까지 : 7ms)
// - B: 1ms부터 대기하다가, 9ms 시점에 작업을 시작해서 18ms 시점에 작업 완료(요청에서 종료까지 : 17ms)
// 이렇게 A → C → B의 순서로 처리하면 각 작업의 요청부터 종료까지 걸린 시간의 평균은 9ms(= (3 + 7 + 17) / 3)가 됩니다.
// 각 작업에 대해 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 배열 jobs가 매개변수로 주어질 때, 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리하면 평균이 얼마가 되는지 return 하도록 solution 함수를 작성해주세요. (단, 소수점 이하의 수는 버립니다)

// 제한 사항
// jobs의 길이는 1 이상 500 이하입니다.
// jobs의 각 행은 하나의 작업에 대한 [작업이 요청되는 시점, 작업의 소요시간] 입니다.
// 각 작업에 대해 작업이 요청되는 시간은 0 이상 1,000 이하입니다.
// 각 작업에 대해 작업의 소요시간은 1 이상 1,000 이하입니다.
// 하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 처리합니다.

class MinHeap {
  constructor() {
    this.heap = [null]; // 배열의 첫 번째 요소는 사용하지 않으므로 null로 설정
  }

  size() {
    return this.heap.length - 1; // 힙의 크기를 반환
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null; // 힙의 최소값(루트 노드)을 반환하는 함수
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]; // 배열 내의 두 요소의 위치를 바꾸는 함수
  }

  heappush(value) {
    this.heap.push(value); // 새 값은 배열의 끝에 추가
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0; // 추가된 요소의 부모 노드 인덱스를 계산, 비트 우측 이동 연산자(>>)는 나눗셈 결과를 정수로 만듦

    while (curIdx > 1 && this.heap[parIdx][1] > this.heap[curIdx][1]) {
      // 새 요소를 올바른 위치로 이동시키기 위해, 부모 노드와 비교하여 부모 노드가 더 큰 경우 위치를 바꿈
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const min = this.heap[1]; // 힙에서 최소값(루트 노드)을 제거하고 반환하기 위한 변수를 초기화
    if (this.heap.length <= 2) this.heap = [null];
    // 힙의 크기가 2 이하인 경우, 즉 힙에 요소가 1개 또는 0개만 있는 경우, 힙을 초기화
    else this.heap[1] = this.heap.pop(); // 힙에서 마지막 요소를 제거하고, 그 값을 루트 노드 위치에 둔다.

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;
    // 현재 노드의 왼쪽 자식과 오른쪽 자식의 인덱스를 계산합니다.

    if (!this.heap[leftIdx]) return min; // 왼쪽 자식이 없는 경우, 최소값을 반환
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx][1] < this.heap[curIdx][1]) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    } // 오른쪽 자식 노드가 없는 경우, 왼쪽 자식 노드의 값이 현재 노드(루트 노드)의 값보다 작으면 위치를 교환. 그 후, 최소값을 반환

    while (
      // 왼쪽 또는 오른쪽 자식 노드의 값이 현재 노드의 값보다 작은 경우, 힙의 조건을 만족할 때까지 반복
      this.heap[leftIdx][1] < this.heap[curIdx][1] ||
      this.heap[rightIdx][1] < this.heap[curIdx][1]
    ) {
      const minIdx =
        this.heap[leftIdx][1] > this.heap[rightIdx][1] ? rightIdx : leftIdx; // 왼쪽과 오른쪽 자식 중 값이 더 작은 노드의 인덱스를 minIdx에 저장
      this.swap(minIdx, curIdx); // 현재 노드와 minIdx에 해당하는 자식 노드의 위치를 교환
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
      // 현재 인덱스를 minIdx로 업데이트하고, 업데이트된 현재 노드에 대한 새로운 왼쪽 및 오른쪽 자식 노드의 인덱스를 계산

      if (leftIdx >= this.size()) break;
    } // 새로운 왼쪽 자식 노드의 인덱스가 힙의 크기보다 크거나 같으면 반복을 중단

    return min; // 힙에서 제거된 최소값을 반환
  }
}

function solution(jobs) {
  const count = jobs.length;
  const minHeap = new MinHeap();
  jobs.sort((a, b) => a[0] - b[0]); // 작업 배열을 작업이 요청되는 시간에 따라 오름차순으로 정렬

  let time = 0; // 현재 시간
  let complete = 0; // 작업 완료 시간
  let total = 0; // 모든 작업의 완료 시간 총합

  while (jobs.length || minHeap.size()) {
    // 처리할 작업이 남아있거나 최소 힙에 작업이 남아 있는 동안 계속 반복
    while (jobs.length) {
      if (jobs[0][0] === time) {
        minHeap.heappush(jobs.shift());
      } else break;
    } // 작업이 현재 시간에 시작할 경우, 해당 작업을 최소 힙에 추가하고 배열에서 제거

    if (minHeap.size() && time >= complete) {
      // 최소 힙에 작업이 있고, 현재 시간이 다음 작업 완료 시간 이상인 경우
      const task = minHeap.heappop(); // 최소 힙에서 작업을 하나 꺼내어 처리
      complete = task[1] + time;
      total += complete - task[0];
    } // 처리된 작업의 완료 시간을 계산하고, 총 완료 시간에 추가
    time++;
  }

  return (total / count) >> 0; // 모든 작업의 완료 시간의 합을 작업의 총 개수로 나눈 후, 소수점 이하를 버리기 위해 비트 우측 이동 연산자(>>)를 사용하여 정수 결과를 반환
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 힙에 요소를 추가합니다.
  push(element) {
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
  }

  // 힙에서 가장 작은 요소를 제거하고 반환합니다.
  pop() {
    const minValue = this.heap[0];
    const lastValue = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.heapifyDown(0);
    }
    return minValue;
  }

  // 힙이 비어 있는지 확인합니다.
  isEmpty() {
    return this.heap.length === 0;
  }

  // 부모 노드로 거슬러 올라가면서 힙을 재정렬합니다.
  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = Math.floor((currentIndex - 1) / 2);
    while (
      currentIndex > 0 &&
      this.heap[currentIndex][1] < this.heap[parentIndex][1]
    ) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currentIndex],
      ];
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  // 자식 노드로 내려가면서 힙을 재정렬합니다.
  heapifyDown(index) {
    let currentIndex = index;
    const length = this.heap.length;
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;

    let smallestIndex = currentIndex;
    if (
      leftChildIndex < length &&
      this.heap[leftChildIndex][1] < this.heap[smallestIndex][1]
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < length &&
      this.heap[rightChildIndex][1] < this.heap[smallestIndex][1]
    ) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== currentIndex) {
      [this.heap[currentIndex], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[currentIndex],
      ];
      this.heapifyDown(smallestIndex);
    }
  }
}

function solution(jobs) {
  let currentTime = 0; // 현재 시간
  let totalWaitTime = 0; // 총 대기 시간
  let jobsDone = 0; // 처리 완료된 작업 수
  let jobsIndex = 0; // jobs 배열

  jobs.sort((a, b) => a[0] - b[0]);

  const minHeap = new MinHeap();

  while (jobsDone < jobs.length) {
    // 현재 시간 이전에 요청된 모든 작업을 최소 힙에 추가
    while (jobsIndex < jobs.length && jobs[jobsIndex][0] <= currentTime) {
      minHeap.push(jobs[jobsIndex++]);
    }

    // 만약 현재 처리할 수 있는 작업이 없다면, 다음 작업의 요청 시간으로 현재 시간을 업데이트
    if (minHeap.isEmpty()) {
      currentTime = jobs[jobsIndex][0];
    } else {
      // 힙에서 가장 짧은 작업을 꺼내 처리. 이 작업의 시작 시간과 처리 시간을 사용해 대기 시간을 계산
      const [start, duration] = minHeap.pop();
      currentTime += duration; // 현재 시간 업데이트
      totalWaitTime += currentTime - start; // 총 대기 시간에 이 작업의 대기 시간을 추가
      jobsDone++; // 처리 완료된 작업 수를 증가
    }
  }

  return Math.floor(totalWaitTime / jobs.length);
}

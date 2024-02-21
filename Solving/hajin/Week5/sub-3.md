# 힙(Heap) 상세 풀이 - 문제3. 이중우선순위큐

## 1. 풀이

### 1) MinHeap 클래스 및 메서드 정의

#### - 클래스 정의

힙 자료구조의 클래스 정의는 모든 힙 문제에서 거의 동일하다. <br/>
이를 solution 함수에서 어떻게 활용하는지가 관건!

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
```

### 2) solution 함수

#### - 최댓값 관리 배열

이 문제에서는 최솟값과 최댓값을 동시에 처리할 수 있어야한다. <br/>
최솟값은 최소 힙을 이용해서 확인할 수 있지만, 최댓값은 알기 어려우므로 이를 관리하기 위한 배열을 생성한다. <br/>
최댓값 관리 배열을 내림차순으로 정렬하여 항상 배열의 첫번째 요소가 최댓값이 되도록 하고,
(=> 최댓값을 반환할 때 `maxHeap[0]`을 쓸 수 있도록!) <br/>
최소 힙을 관리할 때 최댓값 배열도 똑같이 관리해주면 된다.

#### - operation 구분

operations에 담긴 각 연산을 순회하면서, 각 연산을 "명령(command)"과 "값(valueStr)"으로 구분한다. <br/>
예를 들어, 연산 문자열이 "I 16"이라면 -> command: "I" , valueStr: "16" 이 된다.

```js
function solution(operations) {
  const minHeap = new MinHeap();
  let maxHeap = []; // 최댓값 관리를 위한 배열

  // 각 operation을 command와 valueStr로 구분
  operations.forEach((op) => {
    const [command, valueStr] = op.split("");
    const value = parseInt(valueStr); // 문자열을 정수로 변환

    // 명령이 I일 때: 숫자 삽입
    if (command === "I") {
      minHeap.add(value); // 최소 힙에 추가
      maxHeap.push(value); // 최대값 배열에도 추가
      maxHeap.sort((a, b) => b - a); // 최댓값이 배열의 첫번째에 오도록 내림차순 정렬
    }
    // 명령 값이 1일 때 = "D 1": 최댓값 삭제
    else if (value === 1) {
      if (maxHeap.length > 0) {
        const maxVal = maxHeap.shift(); // 최댓값 배열에서 첫번째 요소를 반환
        const index = minHeap.heap.indexOf(maxVal); // 최소 힙에서 maxVal의 인덱스 찾기
        if (index !== -1) {
          minHeap.heap.splice(index, 1); // 최소 힙에서도 maxVal값 제거
        }
      }
    }
    // 명령 값이 -1일 때 = "D -1": 최솟값 삭제
    else if (value === -1) {
      if (minHeap.heap.length > 0) {
        const minVal = minHeap.poll(); // 최소 힙에서 최솟값 삭제
        const index = maxHeap.indexOf(minVal); // 최댓값 배열에서 minVal의 인덱스 찾기
        if (index !== -1) {
          maxHeap.splice(index, 1); // 최댓값 배열에서도 minVal 제거
        }
      }
    }
  });

  const max = maxHeap.length > 0 ? maxHeap[0] : 0;
  const min = minHeap.heap.length > 0 ? minHeap.peek() : 0;

  return [max, min];
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
```

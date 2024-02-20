# 힙(Heap)
- 부모의 값이 자식의 값보다 항상 크거나 항상 작다라는 조건을 만족하는 완전이진트리 형태의 자료구조
- 완전이진트리는 자식 노드를 왼쪽부터 채워나가는 형태의 자료구조
- 큰 값이 상위, 작은 값이 하위에 위치한 트리형 자료구조로써 부모-자식 관계가 일정
- 주로 우선순위 큐를 구현하는 데 사용

<img src ="https://zrr.kr/87QK">

## 최소 힙
- 각 부모 노드의 값이 자식 노드의 값보다 작거나 같아야 함
- 힙의 루트에는 전체 트리에서 가장 작은 값이 위치

## 최대 힙
- 각 부모 노드의 값이 자식 노드의 값보다 크거나 같아야 함
- 힙의 루트에 전체 트리에서 가장 큰 값이 위치

## 힙 요소 삽입
- 요소 추가 시, 트리의 가장 마지막에 위치
- 추가 후, 부모보다 우선순위가 높다면 부모와 순서 변경
- 이 과정을 반복하면 가장 우선순위가 높은 정점이 루트가 됨

## 힙 요소 삭제
- 요소 제거는 루트 정점만 가능
- 루트 정점이 제거된 후 가장 마지막 정점이 루트에 위치
- 루트 정점의 두 자식 정점 중 우선순위가 높은 정점과 변경
- 두 자식 정점이 우선순위가 더 낮을 때 까지 반복

## 힙의 사용 사례
### 1. 우선 순위 큐
- 각 요소가 우선순위를 가지고 있으며, 우선순위가 높은 요소가 먼저 제거
- 배열, 연결 리스트, 힙 등 다양한 방법으로 구현 가능
- 시뮬레이션 시스템, 데이터 압축, 라우팅 알고리즘, 네트워크 대역폭 관리 등 다양한 분야에서 활용

### 힙을 사용한 우선순위 큐의 장점
- 요소의 삽입과 삭제가 O(log n) 시간으로 빨리 처리
- 배열을 기반으로 하는 힙은 크기가 동적으로 조정되므로, 요소의 삽입과 삭제가 자유

### 2. 힙 정렬
- 힙 정렬은 O(n log n)의 시간 복잡도를 가지며, 최악의 경우에도 이 시간 유지
- 다른 효율적인 정렬 알고리즘에 비해 일반적으로 느린 편이지만, 최악의 경우에도 일정한 성능을 보장한다는 점에서 안정적인 정렬 방법

## 자바스크립트에서 힙 구현
- 자바스크립트 라이브러리에는 힙 자료구조가 기본적으로 내장되어 있지 않음
- 일반적인 방법은 배열을 사용하고, 힙의 속성을 유지하기 위해 삽입, 삭제, 힙 재구성 등 이용

### 힙 클래스 구조
```
class MinHeap {
  constructor() {
    this.heap = []; // 힙의 구조를 배열로 초기화
  }
}
```

### 부모 및 자식 노드의 인덱스 계산
```
class MinHeap {
  // ...

  // i번째 요소의 부모 노드의 인덱스를 반환
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  // i번째 요소의 왼쪽 자식 노드의 인덱스를 반환
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  // i번째 요소의 오른쪽 자식 노드의 인덱스를 반환
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
}
```

### 요소 교환
```
class MinHeap {
  // ...

  // 배열 내의 두 요소 교환
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]]
  }
} 
```

### 삽입 메소드
```
class MinHeap {
  // ...

  // 힙에 새로운 값을 삽입
  // 삽입 후, 힙의 조건을 만족시키기 위해 재정렬
  insert(value) {
    this.heap.push(value); // 힙에 값 삽입
    let index = this.heap.length - 1; // 삽입된 값의 인덱스
    let parent = this.getParentIndex(index); // 삽입된 값의 부모 노드의 인덱스

    // 새로 삽입된 값이 최소 힙 조건을 만족하지 않으면,
    // 부모 노드와 자리를 바꿉니다.
    while (index > 0 && this.heap[parent] > this.heap[index]) {
      this.swap(parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
}
```

### 삭제 메소드
```
class MinHeap {
  // ...

  // 힙에서 최소값 제거하고 반환
  remove() {
    const smallest = this.heap[0]; // 힙의 최소값(루트) 임시 저장
    const last = this.heap.pop(); // 힙의 마지막 요소 제거
    if (this.heap.length > 0) {
      this.heap[0] = last; // 힙의 루트에 마지막 요소 할당
      this.heapify(0); // 힙의 조건 만족시키기 위해 재정렬
    }
    return smallest; // 힙에서 제거한 최소값 반환
  }
} 
```

### 힙 재구성
```
class MinHeap {
  // ...

  // 주어진 인덱스에서 시작하여 힙의 조건을 만족시키도록 재정렬
  heapify(index) {
    let left = this.getLeftChildIndex(index); // 왼쪽 자식 노드의 인덱스
    let right = this.getRightChildIndex(index); // 오른쪽 자식 노드의 인덱스
    let smallest = index; // 가장 작은 값을 가진 노드의 인덱스 저장

    // 왼쪽 자식 노드가 존재하고, 현재 노드보다 작으면 smallest 갱신
    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    // 오른쪽 자식 노드가 존재하고, 현재 가장 작은 값보다 작으면 smallest 갱신
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }
    // 가장 작은 값이 현재 노드가 아니라면, 위치 바꾸고 재귀적으로 heapify 호출
    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapify(smallest);
    }
  }
} 
```

### 힙의 최소값 확인
```
class MinHeap {
  // ...

  // 힙의 최소값(루트) 반환
  peek() {
    return this.heap[0];
  }
} 
```

### 힙의 크기 확인
```
class MinHeap {
  // ...

  // 힙의 크기(요소의 개수) 반환
  size() {
    return this.heap.length;
  }
} 
```
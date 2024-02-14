# 스택(Stack)과 큐(Queue)

## 1. 스택(Stack)

- LIFO(Last In First Out) 자료구조
- 마지막에 추가된 요소가 제일 먼저 제거
- stack의 맨 위에 있는 요소: TOP
- JS의 내장 메소드인 push, pop을 이용해 TOP 요소를 컨트롤

### 1.1 JS에서 배열로 스택 구현하기

#### **1) push: 스택에 새로운 요소를 추가**

```js
const stack = [];

stack.push(1);
stack.push(2);
stack.push(3);
// satck => [1, 2, 3]
```

#### **2) pop: 스택의 마지막 요소를 제거**

```js
stack.pop();
// stack => [1, 2]
// 마지막에 추가된 3이 제거됨
```

#### **3) peek: 스택의 맨 위 요소를 반환**

```js
stack.peek();
// 2
// 가장 마지막에 추가된 데이터가 무엇인지 반환
// stack => [1, 2]
```

<br/>

## 큐(Queue)

- FIFO(First In First Out) 자료구조
- 먼저 추가된 요소가 먼저 제거 (선입선출)
- 연결리스트를 통한 구현이 일반적
- JS의 내장 메소드인 push, shift를 이용하여 배열로 구현할 수도 있음

  - **배열 기반 큐의 단점**

    ```
    shift를 통해 요소를 제거할 때, 남은 요소를 한칸씩 앞으로 이동시켜야 함.
    이로 인해 O(n)의 시간복잡도를 갖게 됨 (n: 배열의 크기)
    ```

### 2.1 JS의 배열로 큐 구현하기

#### **1) shift: 스택의 첫번째 요소를 제거**

```js
const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
// stack => [1, 2, 3]

stack.shift();
// stack => [2, 3]
// 가장 먼저 추가된 1이 제거됨
```

### 2.2 JS에서 연결리스트로 큐 구현하기

#### **1) Enqueue: 연결리스트의 끝에 새로운 노드를 추가**

#### **2) Dequeue: 연결 리스트의 시작 부분에서 노드를 제거하고 반환**

```js
class LinkedListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(item) {
    // 새로운 노드 생성
    const newNode = new ListNode(item);
    if (this.isEmpty()) {
      // 큐가 비어있으면, head와 tail 모두 새 노드를 가리킴
      this.head = this.tail = newNode;
    } else {
      // tail의 다음 노드로 새 노드를 설정하고 tail을 업데이트
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      // 만약 큐가 비어있다면, tail도 null로 설정
      this.tail = null;
    }
    return value;
  }

  isEmpty() {
    return this.head === null;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.head.value;
  }
}
```

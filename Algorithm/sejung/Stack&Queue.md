# 스택과 큐

## 스택(Stack)
- 후입선출 LIFO(Last In, First Out) 원칙에 따라 작동
- 가장 마지막에 추가된 요소가 가장 먼저 제거
- 서로 연관있는 여러 작업을 연달아 수행하면서 이전의 작업 내용을 저장할 때 사용

### 스택을 선택하는 기준
- **후입선출 특성이 필요한 경우**: 가장 마지막에 추가된 요소를 가장 먼저 처리할 때 사용
- **역순 처리가 필요한 경우**: 데이터를 역순으로 처리하거나 저장해야 할 필요가 있을 때 사용
- **재귀 알고리즘**: 함수 호출의 컨텍스트를 저장하는 데 스택이 자연스럽게 사용. 재귀 알고리즘을 사용할 때, 각 재귀 호출은 스택에 쌓임.
- **브라우저의 뒤로 가기**: 사용자의 탐색 기록을 스택에 저장하여, 뒤로 가기 기능을 구현
- **문자열 역순 출력, 괄호 검사 등**: 문자열이나 수식 처리에서 열린 괄호와 닫힌 괄호의 짝을 맞추는 등의 작업에 사용

### 스택의 주요 연산 (JS)
- push(element): 스택의 끝에 요소를 추가
- pop(): 스택의 끝에 있는 요소를 제거하고 그 요소를 반환
- peek(): 스택의 끝에 있는 요소를 반환하지만 제거하지는 않음
- isEmpty(): 스택이 비어 있는지 확인하고 true/false 반환

### 예시코드
```
class Stack {
    constructor() {
        this.items = [];
    }

    // 요소 추가
    push(element) {
        this.items.push(element);
    }

    // 맨 끝의 요소 제거 및 반환
    pop() {
        return this.items.pop();
    }

    // 맨 끝의 요소 확인
    peek() {
        return this.items[this.items.length - 1];
    }

    // 스택이 비었는지 확인
    isEmpty() {
        return this.items.length === 0;
    }
}

let stack = new Stack();
stack.push("a");
stack.push("b");
console.log(stack.peek()); // "b"
console.log(stack.isEmpty()); // false
```


## 큐(Queue)
- 선입선출 FIFO(First In, First Out) 원칙에 따라 작동
- 가장 먼저 추가된 요소가 가장 먼저 제거
- 순서대로 처리해야 하는 작업을 임시로 저장해두는 버퍼(buffer)로 사용

### 큐를 선택하는 기준
- **선입선출 특성이 필요한 경우**: 먼저 들어온 데이터를 먼저 처리할 때 사용
- **데이터 스트림 처리**: 실시간으로 들어오는 데이터 스트림을 순차적으로 처리해야 할 때 사용
- **버퍼(Buffer) 사용이 필요한 경우**: 데이터를 임시 저장해두고, 처리 가능할 때 순차적으로 처리할 때 사용
- **너비 우선 탐색(BFS) 알고리즘**: 그래프나 트리 구조에서 너비 우선 탐색을 할 때, 큐를 사용하여 각 노드를 순차적으로 탐색
- **작업 스케줄링**: 여러 작업을 관리하고 순차적으로 실행해야 할 때 큐를 사용하여 작업들을 관리 (ex. 프린터의 인쇄 작업 관리 등)

### 큐의 주요 연산 (JS)
- enqueue: 큐의 끝에 요소 추가. JS에서는 push 메소드 사용
- dequeue: 큐의 시작 부분에 있는 요소 제거하고 그 요소를 반환. JS에서는 shift 메소드 사용
- peek(): 큐의 시작 부분에 있는 요소를 반환하지만 제거하지는 않음
- isEmpty(): 큐가 비어 있는지 확인하고 true/false 반환

### 예시코드
```
class Queue {
    constructor() {
        this.items = [];
    }

    // 요소 추가
    enqueue(element) {
        this.items.push(element);
    }

    // 시작 부분의 요소 제거 및 반환
    dequeue() {
        if (this.isEmpty()) {
            return 'Queue is empty';
        }
        return this.items.shift();
    }

    // 시작 부분의 요소 확인
    peek() {
        return this.items[0];
    }

    // 큐가 비었는지 확인
    isEmpty() {
        return this.items.length === 0;
    }
}

let queue = new Queue();
queue.enqueue("a");
queue.enqueue("b");
queue.enqueue("c");
console.log(queue.dequeue()); // "a"
console.log(queue.peek()); // "b"
console.log(queue.isEmpty()); // false
```
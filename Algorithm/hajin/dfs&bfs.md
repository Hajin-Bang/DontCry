# 깊이 우선 탐색(DFS)과 너비 우선 탐색(BFS)

## 깊이 우선 탐색(DFS)

- 깊이를 우선으로 탐색하는 알고리즘 (정점의 자식을 먼저 탐색)
- 모든 노드에 대한 방문 확인을 탐색하는 데에 최적인 알고리즘
- BFS보다 속도는 느리지만, 더 간단함
- 방문한 노드에 대해서 반드시 확인해야함

## 깊이 우선 탐색(DFS) 구현하기

### 1. 재귀 함수를 활용한 구현

```js
const Graph = {
  A: ["B", "C"],
  B: ["A", "C", "D"],
  C: ["A", "B", "D"],
  D: ["B", "C"],
};

const visited = [];
const visitedNode = [];

function dfs(startNode) {
  if (!visitedNode.includes(startNode)) {
    visited[startNode] = true;
    visitedNode.push(startNode);
  }
  for (let curNode of Graph[startNode]) {
    if (!visited[curNode]) {
      dfs(curNode);
    }
  }
}

dfs("A");
console.log(visitedNode); // ['A', 'B', 'C', 'D']
```

### 2. 스택(Stack)을 활용한 구현

```js
function dfs(graph, start, visited) {
  const stack = [];
  stack.push(start);

  while (stack.length) {
    let v = stack.pop();
    if (!visited[v]) {
      console.log(v);
      visited[v] = true;

      for (let node of graph[v]) {
        if (!visited[node]) {
          stack.push(node);
        }
      }
    }
  }
}

const graph = [[1, 2, 4], [0, 5], [0, 5], [4], [0, 3], [1, 2]];
const visited = Array(7).fill(false);

dfs(graph, 0, visited);
```

## 너비 우선 탐색(BFS)

- 너비를 우선적으로 탐색하는 알고리즘
  - 현재 위치에서 갈 수 있는 가장 가까운 노드를 우선으로 탐색
- 두 지점 사이의 최단 거리를 구하거나 경로를 찾는데에 최적화됨

## 너비 우선 탐색(BFS) 구현하기

### 큐(Queue)를 이용한 구현

#### 1. 배열을 사용

```js
const Graph = {
  A: ["B", "C"],
  B: ["A", "C", "D"],
  C: ["A", "B", "D"],
  D: ["B", "C"],
};

function bfs(startNode) {
  const Queue = [];
  const visitedNode = [];

  Queue.push(startNode);
  visitedNode.push(startNode);
  while (Queue.length > 0) {
    const curNode = Queue.shift();
    for (let nearNode of Graph[curNode]) {
      if (!visitedNode.includes(nearNode)) {
        Queue.push(nearNode);
        visitedNode.push(nearNode);
      }
    }
  }
  return;
}
console.log(bfs("A")); // ['A', 'B', 'C', 'D']
```

#### 2. 큐(Queue) 클래스를 직접 구현

```js
// 큐 구현
class Queue {
  constructor() {
    this.store = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.store[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }

  push(value) {
    if (this.size() === 0) {
      this.store["0"] = value;
    } else {
      this.rear += 1;
      this.store[this.rear] = value;
    }
  }

  popleft() {
    let temp;
    if (this.front === this.rear) {
      temp = this.store[this.front];
      delete this.store[this.front];
      this.front = 0;
      this.rear = 0;
      return temp;
    } else {
      temp = this.store[this.front];
      delete this.store[this.front];
      this.front += 1;
      return temp;
    }
  }
}

// BFS 구현
function BFS(graph, start, visited) {
  const queue = new Queue();
  queue.push(start);
  visited[start] = true;

  while (queue.size()) {
    const v = queue.popleft();
    console.log(v);

    for (const node of graph[v]) {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    }
  }
}

const graph = [[1, 2, 4], [0, 5], [0, 5], [4], [0, 3], [1, 2]];
const visited = Array(6).fill(false);
BFS(graph, 0, visited);
// 0 1 2 4 5 3
```

<br/>

**<참고>** </br>
https://uic11.tistory.com/entry/%EA%B9%8A%EC%9D%B4-%EC%9A%B0%EC%84%A0-%ED%83%90%EC%83%89Depth-First-Search%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-featJS

https://chamdom.blog/dfs-using-js/

https://uic11.tistory.com/entry/%EB%84%88%EB%B9%84-%EC%9A%B0%EC%84%A0-%ED%83%90%EC%83%89Breadth-First-Search%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-featJS

https://chamdom.blog/bfs-using-js/

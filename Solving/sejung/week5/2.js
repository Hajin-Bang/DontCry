// 디스크 컨트롤러

// 문제 설명
// 하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다. 디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다. 가장 일반적인 방법은 요청이 들어온 순서대로 처리하는 것입니다.

// 예를들어
// - 0ms 시점에 3ms가 소요되는 A작업 요청
// - 1ms 시점에 9ms가 소요되는 B작업 요청
// - 2ms 시점에 6ms가 소요되는 C작업 요청
// 와 같은 요청이 들어왔습니다.

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
      this.heap = [];
  }
  
  push(value) {
      this.heap.push(value);
      // 힙을 소요 시간 기준으로 정렬
      // pop 연산 시 가장 소요 시간이 짧은 작업을 빠르게 가져오기 위함
      this.heap.sort((a, b) => a[1] - b[1]);
  }
  
  pop() {
      return this.heap.shift();
  }
  
  isEmpty() {
      return this.heap.length === 0; // 배열의 길이가 0이면 true, 아니면 false
  }
}

function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]); // 작업을 요청시간 기준으로 정렬
  const priorityQueue = new MinHeap(); // 우선순위 큐 인스턴스 생성
  let time = 0, total = 0, index = 0; // 현재 시간, 총 대기 시간, 처리할 다음 작업의 인덱스
  
  // 모든 작업이 처리될 때까지 반복
  while(index < jobs.length || !priorityQueue.isEmpty()) {
      // 현재 시간 이전에 요청된 모든 작업을 우선순위 큐에 넣음
      while(index < jobs.length && jobs[index][0] <= time) {
          priorityQueue.push(jobs[index++]);
      }
      
      // 우선순위 큐가 비어있지 않으면 작업 처리
      if(!priorityQueue.isEmpty()) {
          const [start, duration] = priorityQueue.pop(); // 가장 소요 시간 짧은 작업 꺼내기
          time += duration; // 현재 시간을 작업 소요 시간만큼 증가
          total += time - start; // 총 대기 시간에 현재 작업의 대기 시간 더함
      } else {
          // 우선순위 큐가 비어 있다면, 다음 작업이 요청되는 시간으로 시간 이동
          time = jobs[index][0];
      }
  }
  return Math.floor(total / jobs.length);
}

console.log(solution([[0, 3], [1, 9], [2, 6]]));
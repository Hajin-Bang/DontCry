// 이중우선순위큐

// 문제 설명
// 이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조를 말합니다.

// 명령어	수신 탑(높이)
// I 숫자	큐에 주어진 숫자를 삽입합니다.
// D 1	    큐에서 최댓값을 삭제합니다.
// D -1	  큐에서 최솟값을 삭제합니다.

// 이중 우선순위 큐가 할 연산 operations가 매개변수로 주어질 때, 모든 연산을 처리한 후 큐가 비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값]을 return 하도록 solution 함수를 구현해주세요.

// 제한사항
// operations는 길이가 1 이상 1,000,000 이하인 문자열 배열입니다.
// operations의 원소는 큐가 수행할 연산을 나타냅니다.
// 원소는 “명령어 데이터” 형식으로 주어집니다.- 최댓값/최솟값을 삭제하는 연산에서 최댓값/최솟값이 둘 이상인 경우, 하나만 삭제합니다.
// 빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은 무시합니다.

// 정렬 알고리즘 풀이
// function solution(operations) {
//   const heap = [];
//   const op = operations.map(operation => operation.split(' '));
  
//   op.forEach(num => {
//       if(num[0] === "I") {
//           heap.push(Number(num[1]))
//       } else {
//           const findValue = (num[1] === "1" ? Math.max : Math.min)(...heap);
//           const delIdx = heap.indexOf(findValue);
//           heap.splice(delIdx, 1);
//       }
//   })
//   return heap.length ? [Math.max(...heap), Math.min(...heap)] : [0, 0];
// }

function solution(operations) {
  let queue = [];
  
  operations.forEach(operation => {
      const [command, number] = operation.split(' ');
      const num = parseInt(number);
      
      if (command === 'I') {
          // 숫자 삽입
          queue.push(num);
      } else if (command === 'D') {
          if (queue.length === 0) return;
          
          // 큐 정렬
          queue.sort((a, b) => a - b);
          
          if (num === 1) {
              // 최댓값 삭제
              queue.pop();
          } else if (num === -1) {
              // 최솟값 삭제
              queue.shift();
          }
      }
  });
  
  if (queue.length === 0) {
      return [0, 0];
  } else {
      queue.sort((a, b) => a - b); // 최종 정렬
      return [queue[queue.length - 1], queue[0]]; // 최댓값과 최솟값 반환
  }
}

console.log(solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]));
console.log(solution(["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"]));

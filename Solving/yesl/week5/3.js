// 이중우선순위큐

// 문제 설명
// 이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조를 말합니다.
// 명령어	수신 탑(높이)
// I 숫자	큐에 주어진 숫자를 삽입합니다.
// D 1	큐에서 최댓값을 삭제합니다.
// D -1	큐에서 최솟값을 삭제합니다.
// 이중 우선순위 큐가 할 연산 operations가 매개변수로 주어질 때, 모든 연산을 처리한 후 큐가 비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값]을 return 하도록 solution 함수를 구현해주세요.

// 제한사항
// operations는 길이가 1 이상 1,000,000 이하인 문자열 배열입니다.
// operations의 원소는 큐가 수행할 연산을 나타냅니다.
// 원소는 “명령어 데이터” 형식으로 주어집니다.- 최댓값/최솟값을 삭제하는 연산에서 최댓값/최솟값이 둘 이상인 경우, 하나만 삭제합니다.
// 빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은 무시합니다.

function solution(operations) {
  const heap = [];
  const op = operations.map((operation) => operation.split(" "));
  // 입력된 명령어를 공백(' ')을 기준으로 분할
  // 따라서 배열[0] = 명령어, 배열[1] = 숫자로 접근할 수 있다.

  op.forEach((num) => {
    if (num[0] === "I") {
      // 명령어가 I라면 데이터 삽입
      heap.push(Number(num[1]));
    } else {
      // 그 외의 경우, 즉 명령어가 D인 경우
      const findValue = (num[1] === "1" ? Math.max : Math.min)(...heap);
      // 숫자가 1이라면 max값을, -1이라면 min값을 적용해서
      const delIdx = heap.indexOf(findValue);
      // 찾고자 하는 값의 인덱스를 찾아서
      heap.splice(delIdx, 1);
      // (이름만 heap인) 배열에서 해당 인덱스의 원소를 제거
    }
  });

  return heap.length ? [Math.max(...heap), Math.min(...heap)] : [0, 0];
}

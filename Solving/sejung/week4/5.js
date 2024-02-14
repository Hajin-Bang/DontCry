// 주식가격

// 문제 설명
// 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

// 제한사항
// prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
// prices의 길이는 2 이상 100,000 이하입니다.

function solution(prices) {
  let answer = new Array(prices.length).fill(0); // 결과 배열 초기화
  for(let i = 0; i < prices.length; i++) { // 현재 가격
      for(let j = i + 1; j < prices.length; j++) { // 비교 대상 가격
          answer[i]++; // 각 초마다 시간 증가
          if(prices[i] > prices[j]) { // 가격이 떨어지면 반복문 종료
              break;
          }
      }
  }
  return answer;
}

console.log(solution([1, 2, 3, 2, 3]));
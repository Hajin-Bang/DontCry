// 주식가격

// 문제 설명
// 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

// 제한사항
// prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
// prices의 길이는 2 이상 100,000 이하입니다.

function solution(prices) {
  const answer = [];
  for (let i = 0; i < prices.length; i++) {
    // 현재가격
    let stack = 0; // 현재 가격(prices[i])이 떨어지지 않은 기간을 세기 위한 변수
    for (let j = i + 1; j < prices.length; j++) {
      // j는 i 다음의 가격
      stack++;
      if (prices[i] > prices[j]) {
        // 가격이 떨어졌으면, 내부 루프를 중단
        break;
      }
    }
    answer.push(stack); // i번째 시점의 주식 가격이 떨어지지 않은 기간
  }
  return answer;
}

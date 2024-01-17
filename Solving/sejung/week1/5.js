// 약수의 개수와 덧셈

// 문제 설명
// 두 정수 left와 right가 매개변수로 주어집니다. left부터 right까지의 모든 수들 중에서, 약수의 개수가 짝수인 수는 더하고, 약수의 개수가 홀수인 수는 뺀 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ left ≤ right ≤ 1,000

function solution(left, right) {
  let answer = 0; 
  
  for(let i = left; i <= right; i++) {
      let count = 0; // 약수의 개수
      for(let j = 1; j <= i; j++) { // 약수 구하는 식
          if(i % j === 0) count++;
      }
      if(count % 2 === 0) answer += i; // 약수의 개수가 짝수면 더하고
      else answer -= i; // 약수의 개수가 홀수면 빼기
  }
  return answer;
}

console.log(solution(13, 17));
console.log(solution(24, 27));


// 다른 사람의 풀이
// function solution(left, right) {
//   let answer = 0;
//   for(let i = left; i <= right; i++) {
//       // 제곱근이 정수면 약수의 개수가 홀수
//       if(Number.isInteger(Math.sqrt(i))) {
//           answer -= i;
//       } else {
//           answer += i;
//       }
//   }
//   return answer;
// }

// Math.sqrt(number) => 주어진 숫자(number)에 루트를 씌워 제곱근 반환. 숫자가 음수이면 NaN 반환.
// Number.isInteger(value) => 주어진 값(value)이 정수인지 판별. 정수면 true, 아니면 false 반환.
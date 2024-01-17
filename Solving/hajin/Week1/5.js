// 5. 약수의 개수와 덧셈
/* 두 정수 left와 right가 매개변수로 주어집니다. 
left부터 right까지의 모든 수들 중에서, 약수의 개수가 짝수인 수는 더하고, 
약수의 개수가 홀수인 수는 뺀 수를 return 하도록 solution 함수를 완성해주세요.*/
/* left	right result
    13	17	43
    24	27	52 */

// 답
function solution(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    let result = Math.sqrt(i) % 1 === 0 ? -i : i;
    answer += result;
  }
  return answer;
}
// 제곱근이 정수이면 약수의 개수가 홀수인 점을 이용
// Math.sqrt를 이용해서 제곱근을 구하고, 삼항연산자로 제곱근이 정수인지 판별

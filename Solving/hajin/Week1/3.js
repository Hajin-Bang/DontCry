// 문제3. 내적
/* 길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. 
a와 b의 내적을 return 하도록 solution 함수를 완성해주세요.
이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1] 입니다. (n은 a, b의 길이) */

// 답
function solution(a, b) {
  let answer = 0;
  for (i = 0; i < a.length; i++) {
    answer += a[i] * b[i];
  }
  return answer;
}

// 다른 사람 풀이
function solution(a, b) {
  return a.reduce((acc, _, i) => (acc += a[i] * b[i]), 0);
}
// reduce()
// 배열의 각 요소에 대해 주어진 reducer 함수를 실행하고, 그 결과를 누적하여 하나의 결과값을 반환한다.
// reduce(callback(누적값, 현재값, 인덱스, 요소), initialValue)
// 여기서는 현재값을('_')사용하지 않았다.
// reduce를 다른 곳에서 사용할 자신이 없습니다;

// 수박수박수박수박수박수?

// 문제 설명
// 길이가 n이고, "수박수박수박수...."와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 예를들어 n이 4이면 "수박수박"을 리턴하고 3이라면 "수박수"를 리턴하면 됩니다.

// 제한 조건
// n은 길이 10,000이하인 자연수입니다.

function solution(n) {
  let answer = '';
  for(let i = 0; i < n; i++) {
      if(i % 2 === 0) answer += "수";
      else answer+= "박";
  }
  return answer;
}

// 다른 사람의 풀이
// const solution = n => "수박".repeat(n).slice(0,n);

// str.repeat(count) => 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열 반환
// str.slice(beginIdx, endIdx) => 문자열의 일부를 추출하면서 새로운 문자열 반환. endIdx 직전까지 추출

console.log(solution(3));
console.log(solution(4));
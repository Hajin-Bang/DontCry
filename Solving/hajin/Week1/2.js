// 문제2. 가운데 글자 가져오기
/* 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 
단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.
"abcde" -> "c"
"qwer"	-> "we" */

// 답
function solution(s) {
  let answer = "";
  let len = s.length;
  if (len % 2 === 0) {
    answer = s[len / 2 - 1] + s[len / 2];
  } else {
    answer = s[Math.floor(len / 2)];
    //Math.floor: 숫자 내림
  }
  return answer;
}

// 다른 사람 풀이
function solution(s) {
  return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
// substr(a,b): a번째 인덱스부터 b개의 문자 반환
// substring(a,b): a번째 인덱스부터 (b-1)번째 인덱스까지 반환
// Math.ceil: 소수점 올림

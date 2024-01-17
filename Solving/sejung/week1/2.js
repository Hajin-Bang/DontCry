// 가운데 글자 가져오기

// 문제 설명
// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

// 재한사항
// s는 길이가 1 이상, 100이하인 스트링입니다.

function solution(s) {
  let mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? s[mid - 1] + s[mid] : s[mid];
}

console.log(solution("abcde"));
console.log(solution("qwer"));

// Math.floor(): 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수 반환 => 내림
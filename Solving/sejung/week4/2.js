// 올바른 괄호

// 문제 설명
// 괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

// "()()" 또는 "(())()" 는 올바른 괄호입니다.
// ")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
// '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 문자열 s의 길이 : 100,000 이하의 자연수
// 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

function solution(s){
  let tempArr = [];
  
  for(let i = 0; i < s.length; i++) {
      if(s[i] === '(') { // '('를 만나면 tempArr에 push
          tempArr.push(s[i]);
      } else { // ')'를 만나면
          if(tempArr.length === 0) { // tempArr가 비어있는지 확인
              return false;
          }
          tempArr.pop(); // 비어있지 않다면 pop
      }
  }
  return tempArr.length === 0 ? true : false;
}

console.log(solution("()()"));
console.log(solution("(())()"));
console.log(solution(")()("));
console.log(solution("(()("));
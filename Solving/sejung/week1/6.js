// JadenCase 문자열 만들기

// 문제 설명
// JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
// 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

// 제한 조건
// s는 길이 1 이상 200 이하인 문자열입니다.
// s는 알파벳과 숫자, 공백문자(" ")로 이루어져 있습니다.
// 숫자는 단어의 첫 문자로만 나옵니다.
// 숫자로만 이루어진 단어는 없습니다.
// 공백문자가 연속해서 나올 수 있습니다.

function solution(s) {
    let arr = s.toLowerCase().split(' ');
    return arr.map(word => 
            word.length > 0 
            ? word[0].toUpperCase() + word.slice(1)
            : null)
            .join(' ');
};

console.log(solution("3people unFollowed me"));
console.log(solution("for the last week"));
console.log(solution("  for the what 1what  "));

// 테스트 케이스 추가: "  for the what 1what  "
// 공백문자가 연속해서 나올 경우 word[0]은 undefined가 될 수 있으며, 이를 toUpperCase() 메소드로 변환하려고 하면 런타임 에러(타입 에러) 발생
// 문자열이 비어있는지 확인하고, 각 단어의 첫 문자가 실제로 존재하는지 확인하는 로직을 추가

// str.slice(beginIdx, EndIdx): 문자열의 일부를 추출하면서 새로운 문자열 반환. EndIdx가 생략된다면, slice()는 문자열 마지막까지 추출
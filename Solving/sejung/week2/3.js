// 전화번호 목록

// 문제 설명
// 전화번호부에 적힌 전화번호 중, 한 번호가 다른 번호의 접두어인 경우가 있는지 확인하려 합니다.
// 전화번호가 다음과 같을 경우, 구조대 전화번호는 영석이의 전화번호의 접두사입니다.

// 구조대 : 119
// 박준영 : 97 674 223
// 지영석 : 11 9552 4421
// 전화번호부에 적힌 전화번호를 담은 배열 phone_book 이 solution 함수의 매개변수로 주어질 때, 어떤 번호가 다른 번호의 접두어인 경우가 있으면 false를 그렇지 않으면 true를 return 하도록 solution 함수를 작성해주세요.

// 제한 사항
// phone_book의 길이는 1 이상 1,000,000 이하입니다.
// 각 전화번호의 길이는 1 이상 20 이하입니다.
// 같은 전화번호가 중복해서 들어있지 않습니다.

// function solution(phone_book) {
//   let answer = true;
//   let sortedArr = phone_book.sort(); // 배열 정렬 후 인접한 요소 비교
//   console.log(sortedArr)
//   for(let i = 0; i < sortedArr.length - 1; i++) {
//       if(sortedArr[i + 1].startsWith(sortedArr[i])) {
//           answer = false;
//           break;
//       } else {
//           answer;
//       }
//   }
//   return answer;
// }

// string.startsWith(searchString): 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true / false로 반환


function solution(phone_book) {
    let phoneMap = new Map(); // 전화번호 저장할 Map 객체 생성
  
    // 전화번호 목록의 각 번호 반복
    for(let number of phone_book) {
        phoneMap.set(number, true); // 현재 번호를 phoneMap에 저장
    }
  
    // 전화번호 목록의 각 번호 재반복
    for(let number of phone_book) {
        for(let i = 1; i < number.length; i++) { // 현재 번호의 접두어 반복
            let prefix = number.substring(0, i); // 현재 번호의 접두어
            if(phoneMap.has(prefix)) {
                return false;
            }
        }
    }
    return true;
}

// string.substring(indexStart, indexEnd): string 객체의 시작 인덱스부터 종료 인덱스 전까지 문자열의 부분 문자열 반환 

console.log(solution(["119", "97674223", "1195524421"]));
console.log(solution(["123","456","789"]));
console.log(solution(["12","123","1235","567","88"]));
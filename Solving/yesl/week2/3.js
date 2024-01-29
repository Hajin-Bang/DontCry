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

function solution(phone_book) {
  phone_book.sort(); // 전화번호를 정렬합니다.

  const hashTable = new Set(phone_book); // 해시 테이블 생성

  for (let phone of phone_book) {
    let temp = '';
    for (let number of phone) {
      temp += number; // 번호의 각 자릿수를 추가하면서
      if (temp !== phone && hashTable.has(temp)) {
        // 현재 번호가 아니면서 해시 테이블에 존재한다면 접두사가 있는 것입니다.
        return false;
      }
    }
  }
  return true; // 모든 번호를 확인 후 접두사가 없으면 true 반환
}

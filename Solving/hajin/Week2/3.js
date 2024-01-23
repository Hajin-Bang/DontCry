// 전화번호 목록
/* 전화번호부에 적힌 전화번호 중, 한 번호가 다른 번호의 접두어인 경우가 있는지 확인하려 합니다.
전화번호가 다음과 같을 경우, 구조대 전화번호는 영석이의 전화번호의 접두사입니다.
구조대 : 119
박준영 : 97 674 223
지영석 : 11 9552 4421
전화번호부에 적힌 전화번호를 담은 배열 phone_book 이 solution 함수의 매개변수로 주어질 때, 
어떤 번호가 다른 번호의 접두어인 경우가 있으면 false를 그렇지 않으면 true를 return 하도록 solution 함수를 작성해주세요.
제한 사항
phone_book의 길이는 1 이상 1,000,000 이하입니다.
각 전화번호의 길이는 1 이상 20 이하입니다.
같은 전화번호가 중복해서 들어있지 않습니다.
*/

// 답1
function solution(phone_book) {
  const hash = {};

  for (let phoneNumber of phone_book) {
    hash[phoneNumber] = true;
  }

  for (let phoneNumber of phone_book) {
    for (let i = 1; i < phoneNumber.length; i++) {
      let prefix = phoneNumber.substring(0, i);
      if (hash[prefix]) {
        return false;
      }
    }
  }
  return true;
}

// 답2
function solution(phone_book) {
  const phoneMap = new Map();

  // 해시맵에 전화번호 저장
  for (let phoneNumber of phone_book) {
    phoneMap.set(phoneNumber, true);
  }

  // 각 전화번호가 다른 번호의 접두어인지 확인
  for (let phoneNumber of phone_book) {
    for (let i = 1; i < phoneNumber.length; i++) {
      let prefix = phoneNumber.slice(0, i);
      if (phoneMap.has(prefix)) {
        return false;
      }
    }
  }

  // 모든 번호가 확인되었을 때는 중복된 번호가 없으므로 true 반환
  return true;
}

// slice 와 substring
// 둘 다 start 인덱스부터 end-1 인덱스까지 반환하는 것은 동일

// 차이점은?
// start 값이 end 값보다 작은 경우:
// substring: 두 인덱스 값을 서로 교환해서 정상적으로 동작
// slice: 빈 문자열(””)을 결과로 반환

// start, end에 음수인 값을 전달할 경우:
// substring: 음수를 0으로 변경해서 메소드를 수행
// slice: 문자열의 마지막 인덱스를 기준으로 뺀 값을 사용해서 메소드를 정상적으로 수행

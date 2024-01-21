// 의상

// 문제 설명
// 코니는 매일 다른 옷을 조합하여 입는것을 좋아합니다.

// 예를 들어 코니가 가진 옷이 아래와 같고, 오늘 코니가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야합니다.

// 종류	이름
// 얼굴	동그란 안경, 검정 선글라스
// 상의	파란색 티셔츠
// 하의	청바지
// 겉옷	긴 코트
// 코니는 각 종류별로 최대 1가지 의상만 착용할 수 있습니다. 예를 들어 위 예시의 경우 동그란 안경과 검정 선글라스를 동시에 착용할 수는 없습니다.
// 착용한 의상의 일부가 겹치더라도, 다른 의상이 겹치지 않거나, 혹은 의상을 추가로 더 착용한 경우에는 서로 다른 방법으로 옷을 착용한 것으로 계산합니다.
// 코니는 하루에 최소 한 개의 의상은 입습니다.
// 코니가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
// 코니가 가진 의상의 수는 1개 이상 30개 이하입니다.
// 같은 이름을 가진 의상은 존재하지 않습니다.
// clothes의 모든 원소는 문자열로 이루어져 있습니다.
// 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.

// 최초 풀이
// function solution(clothes) {
//     let clothesMap = new Map(); // 종류 저장할 Map 생성
    
//     for(let i = 0; i < clothes.length; i++) {
//         let type = clothes[i][1]; // 현재 의상의 종류
//         if(clothesMap[type]) { // 이미 해당 종류의 의상이 Map에 있으면 옵션 1 증가
//             clothesMap[type]++;
//         } else { // 해당 종류의 의상이 처음이면 2로 시작(아무것도 선택하지 않는 경우 포함)
//             clothesMap[type] = 2;
//         }
//     }

//     let answer = 1;// 모든 조합의 수를 저장할 변수
//     for(let type in clothesMap) { // clothesMap을 순회하며 각 종류별 옵션 수 곱하기
//         answer *= clothesMap[type];
//     }
//     return answer - 1; // 모든 옵션의 조합 중에서 아무것도 선택하지 않는 경우 제외
// }

function solution(clothes) {
  let clothesMap = new Map();
  
  for(let i = 0; i < clothes.length; i++) {
      let type = clothes[i][1];
      if(clothesMap.has(type)) {
          clothesMap.set(type, clothesMap.get(type) + 1);
      } else {
          clothesMap.set(type, 1);
      }
  }
  
  let answer = 1;
  for(let count of clothesMap.values()) {
      answer *= (count + 1);
  }
  
  return answer - 1;
}

// object.has(key): 객체 안에 주어진 키가 존재하는지 확인. 존재하면 true, 아니면 false 반환
// object.set(key, value): 객체에 주어진 키와 값을 연결하여 저장. 해당 키가 이미 존재하면 그 키 값을 새로운 값으로 업데이트
// object.get(key): 주어진 키에 대응하는 값을 반환.
// object.values(obj): 파라미터 객체가 가지는 속성의 값들로 이루어진 배열을 리턴.
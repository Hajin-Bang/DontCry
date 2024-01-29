// 완주하지 못한 선수

// 문제 설명
// 수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

// 마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
// completion의 길이는 participant의 길이보다 1 작습니다.
// 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
// 참가자 중에는 동명이인이 있을 수 있습니다.

// 배열 정렬 풀이
// function solution(participant, completion) {
//     participant.sort();
//     completion.sort();
//     for(let i = 0; i < participant.length; i++) {
//         if(participant[i] !== completion[i]) {
//             return participant[i];
//         }
//     }
// }

// Hash 풀이
function solution(participant, completion) {
  let hash = {}; // 해시 테이블 초기화
  
  participant.forEach(name => {
      if(hash[name]) { // 참가자 이름이 이미 해시 테이블에 있으면
          hash[name]++; // 해당 참가자 수 1 증가
      } else { // 참가자 이름이 해시 테이블에 없으면
          hash[name] = 1; // 해당 참가자 수 1로 설정
      }
  });
  // {
  //     "leo": 1,
  //     "kiki": 1,
  //     "eden": 1,
  // }
  
  completion.forEach(name => {
      hash[name]--; // 완주자 이름을 해시 테이블에서 찾아 해당 참가자 수 1 감소
  });
  // {
  //     "leo": 1,
  //     "kiki": 0,
  //     "eden": 0,
  // }
  
  for(let name in hash) {
      if(hash[name] > 0) {
          return name;
      }
  }
}
// for...in: 객체 키나 속성 이름을 순회할 때 사용
// for...of: 배열이나 반복 가능한 객체(배열, 문자열, Map, Set 등)의 값에 접근할 때 사용


console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"]))
console.log(solution(["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"]))
console.log(solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"]))
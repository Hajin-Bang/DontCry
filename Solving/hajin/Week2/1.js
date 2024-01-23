// 완주하지 못한 선수
/* 수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.
마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 
완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.
마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
completion의 길이는 participant의 길이보다 1 작습니다.
참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
⭐️⭐️⭐️참가자 중에는 동명이인이 있을 수 있습니다. */

// ------------답1 (sort를 이용한 풀이)---------------
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }
}
/* sort(정렬)를 사용한 방법의 시간복잡도는 nlogn이다. 배열을 정렬하는 데에 O(nlogn)의 시간이 소요되기 때문이다.
여기서, participant.sort()와 completion.sort() 모두 O(nlogn)의 시간이 소요되기 때문에 좋은 풀이라고 볼 수는 없다.
*/

// **첫번째 시도한 오답
// 문제: 참가자 중에 동명이인이 있을 경우 하나의 문자로 판단하여 오류가 난다.
function solution(participant, completion) {
  return participant.filter((x) => !completion.includes(x)).toString();
}

// ------------답2 (Object를 이용한 풀이)---------------
function solution(participant, completion) {
  const hash = {};

  // 각 이름의 등장 횟수를 해시에 기록
  for (let i = 0; i < participant.length; i++) {
    let name = participant[i];
    hash[name] = (hash[name] || 0) + 1; // 이름이 해시 테이블에 없으면 0으로 초기화 후 1 증가, 이미 있다면 1 증가
  }

  // completion에서 각 이름의 등장 횟수를 해시에서 뺌
  for (let i = 0; i < completion.length; i++) {
    let name = completion[i];
    hash[name] -= 1;
  }

  // 횟수가 1인 선수를 찾아 반환
  for (let key in hash) {
    if (hash[key] > 0) {
      return key;
    }
  }
}

// ------------답3 (HashMap을 이용한 풀이)---------------
function solution(participant, completion) {
  const participantMap = new Map();
  // 'participant' 배열의 각 요소를 key로 하고, 해당 요소의 출현 횟수를 value로 하는 해시맵

  // 참가자 목록을 해시맵에 추가
  for (let name of participant) {
    // participant 배열의 각 요소를 순회하면서 'name' 변수에 할당한다
    participantMap.set(name, (participantMap.get(name) || 0) + 1);
    // name이 있을 때: 그 값을 반환한 뒤 + 1
    // name이 없을 때: 0을 반환한 뒤 + 1
  }

  // 완주자 목록에서 참가자를 제외
  for (let name of completion) {
    participantMap.set(name, participantMap.get(name) - 1);
    if (participantMap.get(name) === 0) {
      participantMap.delete(name);
    } // 1씩 감소한 결과 인원수가 0이 되었다면, 해당 참가자를 해시맵에서 삭제
  }

  // 해시맵에 남아있는 참가자 확인
  const answer = [...participantMap.keys()][0];
  return answer;
}

//////////////////////////////////////////////////////////////////////////////////
// 천재같은 사람이 너무 많은 경우
// 흑흑...
// ....
// 내는 못한다
function solution(participant, completion) {
  const map = new Map();

  for (let i = 0; i < participant.length; i++) {
    let a = participant[i],
      b = completion[i];

    map.set(a, (map.get(a) || 0) + 1);
    map.set(b, (map.get(b) || 0) - 1);
  }

  for (let [k, v] of map) {
    if (v > 0) return k;
  }

  return "nothing";
}

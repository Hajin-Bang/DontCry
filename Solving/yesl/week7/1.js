// 단어 변환

// 문제 설명
// 두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.
// 1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
// 2. words에 있는 단어로만 변환할 수 있습니다.
// 예를 들어 begin이 "hit", target가 "cog", words가 ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐 변환할 수 있습니다.
// 두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 각 단어는 알파벳 소문자로만 이루어져 있습니다.
// 각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
// words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
// begin과 target은 같지 않습니다.
// 변환할 수 없는 경우에는 0를 return 합니다.

function solution(begin, target, words) {
  // visited 객체를 사용하여 단어의 방문 여부와 해당 단어까지 도달하는데 필요한 단계 수를 저장
  const visited = { [begin]: 0 };
  // BFS 탐색을 위한 큐, 시작 단어를 포함하여 초기화
  const queue = [begin];

  // 큐가 비어있지 않은 동안 반복
  while (queue.length) {
    // 큐에서 현재 단어(cur)를 추출
    const cur = queue.shift();

    // 현재 단어가 target과 같다면 반복 중단
    if (cur === target) break;

    // 모든 words를 순회하면서 연결될 수 있는 단어 탐색
    for (const word of words) {
      // 현재 단어와 연결되는지 확인하고, 아직 방문하지 않은 단어인 경우
      if (isConnected(word, cur) && !visited[word]) {
        // visited 객체에 단어와 단계 수를 저장
        visited[word] = visited[cur] + 1;
        // 다음 탐색을 위해 큐에 단어를 추가
        queue.push(word);
      }
    }
  }
  // target 단어까지의 최소 단계 수를 반환, target에 도달할 수 없는 경우 0 반환
  return visited[target] ? visited[target] : 0;
}

// 두 단어가 한 글자만 다른지 확인하는 함수
const isConnected = (str1, str2) => {
  let count = 0; // 다른 글자의 수를 세기 위한 변수
  const len = str1.length;

  // 두 단어의 각 글자를 비교
  for (let i = 0; i < len; i++) {
    if (str1[i] !== str2[i]) count++; // 다른 글자가 있을 경우 count 증가
  }

  // 한 글자만 다른 경우 true 반환, 그렇지 않으면 false 반환
  return count === 1 ? true : false;
};

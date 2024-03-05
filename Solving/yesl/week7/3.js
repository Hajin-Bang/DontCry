// 여행경로

// 문제 설명
// 주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.
// 항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
// 주어진 공항 수는 3개 이상 10,000개 이하입니다.
// tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
// 주어진 항공권은 모두 사용해야 합니다.
// 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
// 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

function solution(tickets) {
  tickets.sort(); // 티켓을 알파벳 순으로 정렬
  let visited = Array(tickets.length).fill(false); // 방문한 티켓 관리를 위한 배열
  let answer = []; // 결과 경로 저장을 위한 배열

  function dfs(airport, path, count) {
    path.push(airport); // 현재 공항을 경로에 추가

    if (count === tickets.length) {
      // 모든 티켓을 사용했다면
      answer = path; // 현재 경로를 결과로 설정
      return true;
    }

    for (let i = 0; i < tickets.length; i++) {
      if (!visited[i] && tickets[i][0] === airport) {
        // 방문하지 않았고, 현재 공항에서 출발하는 티켓이라면
        visited[i] = true; // 티켓을 사용했다고 표시
        if (dfs(tickets[i][1], [...path], count + 1)) return true; // 다음 공항으로 이동
        visited[i] = false; // 백트래킹
      }
    }
  }

  dfs("ICN", [], 0); // "ICN"에서 시작
  return answer;
}

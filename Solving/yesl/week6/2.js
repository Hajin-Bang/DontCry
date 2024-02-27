// 네트워크

// 문제 설명
// 네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.
// 컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

// 제한사항
// 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
// 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
// i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
// computer[i][i]는 항상 1입니다.

function solution(n, computers) {
  let answer = 0;
  const visited = [];

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i, visited, computers); // 방문하지 않은 노드에서 dfs 탐색
      answer++; // 해당 시점에서는 위의 조건문으로 이미 위에 dfs 탐색에서 방문된 노드는 더 이상 방문하지 않는 것이 보장됨
      // 따라서 그냥 방문 후 개수 count 해도 중복 발생 X
    }
  }

  return answer;
}

const dfs = (node, visited, computers) => {
  visited[node] = true; // 현재 node를 방문처리 하고
  for (let i = 0; i < computers.length; i++) {
    if (computers[node][i] === 1 && !visited[i])
      // 연결된 노드가 있고 해당 노드를 방문하지 않았다면
      dfs(i, visited, computers); // dfs로 방문 진행
  }
};

// 문제2. 네트워크
/* 
네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 
예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 
컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 
따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 
네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

제한사항
컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
computer[i][i]는 항상 1입니다.

n	computers	                        return
3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	    2
3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	    1
*/

// 답
function solution(n, computers) {
  let visited = new Array(n).fill(false);
  let answer = 0;

  function dfs(start) {
    visited[start] = true;

    for (let i = 0; i < n; i++) {
      // 현재 노드와 i 노드가 연결 && i노드를 방문 안함
      if (computers[start][i] === 1 && !visited[i]) {
        dfs(i); // i노드부터 시작하는 dfs 수행
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++;
    }
  }
  return answer;
}

// 모든 노드를 탐색해서 시작점을 파악해야하므로 DFS 사용
// 재귀함수를 이용한 구현

// let visited = Array(n).fill(false)
// => 모든 요소를 false로 하는 배열을 만들고, 방문할 때마다 true로 바꿔주어 방문 여부를 파악한다.

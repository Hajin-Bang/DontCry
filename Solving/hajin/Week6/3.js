// 문제3. 게임 맵 최단거리
/* 
ROR 게임은 두 팀으로 나누어서 진행하며, 상대 팀 진영을 먼저 파괴하면 이기는 게임입니다. 
따라서, 각 팀은 상대 팀 진영에 최대한 빨리 도착하는 것이 유리합니다.

지금부터 당신은 한 팀의 팀원이 되어 게임을 진행하려고 합니다. 
다음은 5 x 5 크기의 맵에, 당신의 캐릭터가 (행: 1, 열: 1) 위치에 있고, 상대 팀 진영은 (행: 5, 열: 5) 위치에 있는 경우의 예시입니다.
..
문제 생략
..
.
*/

// 답
function solution(maps) {
  const n = maps.length; // 지도의 가로
  const m = maps[0].length; // 지도의 세로

  // 상하좌우 이동을 위해 설정
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const queue = [[0, 0]];
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  visited[0][0] = true;

  const distance = Array.from(Array(n), () => Array(m).fill(0));
  distance[0][0] = 1;

  while (queue.length > 0) {
    const [curX, curY] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const x = curX + dx[i];
      const y = curY + dy[i];

      // 맵의 범위를 벗어나지 않음 && 벽이 아님 && 방문하지 않음
      if (
        x >= 0 &&
        x < n &&
        y >= 0 &&
        y < m &&
        maps[x][y] === 1 &&
        !visited[x][y]
      ) {
        queue.push([x, y]);
        visited[x][y] = true;
        distance[x][y] = distance[curX][curY] + 1;
      }
    }
  }

  return distance[n - 1][m - 1] > 0 ? distance[n - 1][m - 1] : -1;
}

// "최단거리"를 구하는 문제이므로 BFS 사용

// const visited = Array.from(Array(n), () => Array(m).fill(false))
// => n,m의 2차원 배열을 생성하고 모두 false로 초기화, 방문할 때마다 true로 바꿔주어 방문 여부를 파악한다.

//const distance = Array.from(Array(n), () => Array(m).fill(0))
// => 모든 요소를 0으로 초기화한 2차원 거리 배열을 생성
// => 시작 지점의 거리는 1이 된다.

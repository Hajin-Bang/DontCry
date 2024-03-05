// 퍼즐 조각 채우기

// 문제 설명
// 테이블 위에 놓인 퍼즐 조각을 게임 보드의 빈 공간에 적절히 올려놓으려 합니다. 게임 보드와 테이블은 모두 각 칸이 1x1 크기인 정사각 격자 모양입니다. 이때, 다음 규칙에 따라 테이블 위에 놓인 퍼즐 조각을 게임 보드의 빈칸에 채우면 됩니다.
// 조각은 한 번에 하나씩 채워 넣습니다.
// 조각을 회전시킬 수 있습니다.
// 조각을 뒤집을 수는 없습니다.
// 게임 보드에 새로 채워 넣은 퍼즐 조각과 인접한 칸이 비어있으면 안 됩니다.
// 다음은 퍼즐 조각을 채우는 예시입니다.
// 위 그림에서 왼쪽은 현재 게임 보드의 상태를, 오른쪽은 테이블 위에 놓인 퍼즐 조각들을 나타냅니다. 테이블 위에 놓인 퍼즐 조각들 또한 마찬가지로 [상,하,좌,우]로 인접해 붙어있는 경우는 없으며, 흰 칸은 퍼즐이 놓이지 않은 빈 공간을 나타냅니다. 모든 퍼즐 조각은 격자 칸에 딱 맞게 놓여있으며, 격자 칸을 벗어나거나, 걸쳐 있는 등 잘못 놓인 경우는 없습니다.
// 이때, 아래 그림과 같이 3,4,5번 조각을 격자 칸에 놓으면 규칙에 어긋나므로 불가능한 경우입니다.
// 3번 조각을 놓고 4번 조각을 놓기 전에 위쪽으로 인접한 칸에 빈칸이 생깁니다.
// 5번 조각의 양 옆으로 인접한 칸에 빈칸이 생깁니다.
// 다음은 규칙에 맞게 최대한 많은 조각을 게임 보드에 채워 넣은 모습입니다.
// 최대한 많은 조각을 채워 넣으면 총 14칸을 채울 수 있습니다.
// 재 게임 보드의 상태 game_board, 테이블 위에 놓인 퍼즐 조각의 상태 table이 매개변수로 주어집니다. 규칙에 맞게 최대한 많은 퍼즐 조각을 채워 넣을 경우, 총 몇 칸을 채울 수 있는지 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 3 ≤ game_board의 행 길이 ≤ 50
// game_board의 각 열 길이 = game_board의 행 길이
// 즉, 게임 보드는 정사각 격자 모양입니다.
// game_board의 모든 원소는 0 또는 1입니다.
// 0은 빈칸, 1은 이미 채워진 칸을 나타냅니다.
// 퍼즐 조각이 놓일 빈칸은 1 x 1 크기 정사각형이 최소 1개에서 최대 6개까지 연결된 형태로만 주어집니다.
// table의 행 길이 = game_board의 행 길이
// table의 각 열 길이 = table의 행 길이
// 즉, 테이블은 game_board와 같은 크기의 정사각 격자 모양입니다.
// table의 모든 원소는 0 또는 1입니다.
// 0은 빈칸, 1은 조각이 놓인 칸을 나타냅니다.
// 퍼즐 조각은 1 x 1 크기 정사각형이 최소 1개에서 최대 6개까지 연결된 형태로만 주어집니다.
// game_board에는 반드시 하나 이상의 빈칸이 있습니다.
// table에는 반드시 하나 이상의 블록이 놓여 있습니다.

// piece를 90도 회전시키는 함수
function rotate(piece) {
  // map을 사용하여 각 좌표를 회전시키고, 회전된 조각을 정렬합니다.
  return piece
    .map(([x, y]) => [y, -x])
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
}

// DFS를 이용하여 board에서 piece 또는 hole을 탐색하는 함수
function dfs(board, x, y, mark) {
  const n = board.length;
  const stack = [[x, y]];
  const result = [];
  while (stack.length) {
    const [cx, cy] = stack.pop();
    if (cx >= 0 && cx < n && cy >= 0 && cy < n && board[cx][cy] === mark) {
      board[cx][cy] = mark === 1 ? 0 : 2; // 방문한 위치를 마킹합니다.
      result.push([cx, cy]);
      // 상, 하, 좌, 우 방향으로 탐색을 진행합니다.
      [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ].forEach(([dx, dy]) => stack.push([cx + dx, cy + dy]));
    }
  }
  return result;
}

// 조각의 모든 좌표를 정규화하는 함수
function normalize(shape) {
  const minX = Math.min(...shape.map(([x, _]) => x));
  const minY = Math.min(...shape.map(([_, y]) => y));
  return shape
    .map(([x, y]) => [x - minX, y - minY])
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
}

// 두 조각이 서로 맞는지 확인하는 함수
function match(piece, hole) {
  if (piece.length !== hole.length) return false;
  for (let i = 0; i < 4; i++) {
    // 조각을 회전시키며 hole과 일치하는지 확인합니다.
    const rotated = normalize(rotate(piece));
    if (JSON.stringify(rotated) === JSON.stringify(hole)) return true;
    piece = rotated;
  }
  return false;
}

// 메인 함수: game_board에서 빈 공간을 찾고, table에서 퍼즐 조각을 찾아 맞추는 과정
function solution(game_board, table) {
  const n = game_board.length;
  let answer = 0;

  const holes = []; // 게임 보드의 빈 공간을 저장할 배열
  const pieces = []; // 테이블의 퍼즐 조각을 저장할 배열

  // 게임 보드에서 빈 공간을 찾습니다.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (game_board[i][j] === 0)
        holes.push(normalize(dfs(game_board, i, j, 0)));
    }
  }

  // 테이블에서 퍼즐 조각을 찾습니다.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (table[i][j] === 1) pieces.push(normalize(dfs(table, i, j, 1)));
    }
  }

  // 각 빈 공간에 대해, 맞는 퍼즐 조각을 찾아 매칭합니다.
  holes.forEach((hole) => {
    for (let i = 0; i < pieces.length; i++) {
      if (match(pieces[i], hole)) {
        answer += pieces[i].length; // 매칭된 조각의 크기를 정답에 더합니다.
        pieces.splice(i, 1); // 매칭된 조각을 제거합니다.
        break;
      }
    }
  });

  return answer;
}

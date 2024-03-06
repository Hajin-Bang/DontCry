// 문제 4. 퍼즐 조각 채우기
// 문제 생략

// 답
function moveBlock(block) {
  let minX = Math.min(...block.map((v) => v[0]));
  let minY = Math.min(...block.map((v) => v[1]));

  return block.map((v) => [v[0] - minX, v[1] - minY]).sort();
}

function rotate(block) {
  let max = Math.max(...block.map((v) => Math.max(v[0], v[1])));
  let rotateBlock = block.map((v) => [max - v[1], v[0]]);

  return moveBlock(rotateBlock);
}

function bfs(start, table, k) {
  // bfs(시작점, 게임판, 빈칸or블록)
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  let needVisit = start;
  let block = []; // 블록 좌표
  while (needVisit.length > 0) {
    let [cx, cy] = needVisit.shift(); // 현재 좌표를 반환하여 저장
    block.push([cx, cy]);
    for (let i = 0; i < 4; i++) {
      let nx = cx + dx[i]; // 새로운 x좌표
      let ny = cy + dy[i]; // 새로운 y좌표

      // 좌표가 0보다 작거나 테이블 크기보다 크다면
      if (nx < 0 || ny < 0 || nx >= table.length || ny >= table.length)
        continue;
      // 새 좌표의 칸이 원하는 칸이 아니라면
      else if (table[nx][ny] === k) continue;
      // 원하는 칸이 맞다면
      else {
        needVisit.push([nx, ny]);
        table[nx][ny] = k; // 재방문을 방지
      }
    }
  }
  return moveBlock(block);
}

function solution(game_board, table) {
  let blanks = [];
  let blocks = [];
  for (let i = 0; i < game_board.length; i++) {
    for (let j = 0; j < game_board.length; j++) {
      if (game_board[i][j] === 0) {
        game_board[i][j] = 1;
        blanks.push(bfs([[i, j]], game_board, 1));
      }
    }
  }
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      if (table[i][j] === 1) {
        table[i][j] = 0;
        blocks.push(bfs([[i, j]], table, 0));
      }
    }
  }
  let answer = 0;
  blocks.forEach((val) => {
    for (let i = 0; i < blanks.length; i++) {
      let match = false;
      for (let j = 0; j < 4; j++) {
        val = rotate(val);
        if (JSON.stringify(val) === JSON.stringify(blanks[i])) {
          blanks.splice(i, 1);
          answer += val.length;
          match = true;
          break;
        }
      }
      if (match) break;
    }
  });
  return answer;
}

// 절대 못풀어요
// 이 문제는 더 공부하겠습니다.....

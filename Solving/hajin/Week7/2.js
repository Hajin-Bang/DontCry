// 문제 2. 아이템 줍기
// 문제 생략

// 답
function solution(rectangle, characterX, characterY, itemX, itemY) {
  //좌표에 2를 곱함
  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;

  let doubleRec = rectangle.map((rec) => rec.map((point) => point * 2));

  // 이동좌표(상하좌우) 설정
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  // 모두 0으로 초기화
  let map = Array.from({ length: 103 }, () => Array(103).fill(0));

  // 사각형 그리기
  doubleRec.forEach(([x1, y1, x2, y2]) => {
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        if (i === x1 || i === x2 || j === y1 || j === y2) {
          if (map[i][j] === 0) {
            map[i][j] = 1; // 사각형의 경계를 1로 표시
          }
        } else {
          map[i][j] = 2; // 내부를 2로 표시
        }
      }
    }
  });

  //큐를 생성하고 시작점 설정
  let start = [characterX, characterY, 0]; // 마지막은 카운트값
  let queue = [start];

  //시작점을 탐색하면 안되므로 0으로 설정
  map[characterX][characterY] = 0;

  while (queue.length > 0) {
    let [x, y, cnt] = queue.shift();

    if (x === itemX && y === itemY) {
      return cnt / 2; //
    }

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];
      if (map[nx][ny] === 1) {
        // 경계를 따라서 이동
        queue.push([nx, ny, cnt + 1]);
        map[nx][ny] = 0;
      }
    }
  }

  return 0;
}

// 이거 저는 ... 저는 절대 ..
// 구글링을 해도 이해가 잘 ..................

// 최단 거리를 찾아야함 => BFS 이용

// 모든 사각형의 꼭짓점을 2배로 확대하는 이유는?
// 경계를 정확하게 구분하기 위함 ==> 캐릭터가 경계선과 그 내부를 구분해서 경계선 위만을 따라서 움직일 수 있도록 하기 위해서이다.

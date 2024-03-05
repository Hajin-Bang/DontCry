// 아이템 줍기

// 문제 설명
// 다음과 같은 다각형 모양 지형에서 캐릭터가 아이템을 줍기 위해 이동하려 합니다.
// 지형은 각 변이 x축, y축과 평행한 직사각형이 겹쳐진 형태로 표현하며, 캐릭터는 이 다각형의 둘레(굵은 선)를 따라서 이동합니다.
// 만약 직사각형을 겹친 후 다음과 같이 중앙에 빈 공간이 생기는 경우, 다각형의 가장 바깥쪽 테두리가 캐릭터의 이동 경로가 됩니다.
// 단, 서로 다른 두 직사각형의 x축 좌표 또는 y축 좌표가 같은 경우는 없습니다.
// 즉, 위 그림처럼 서로 다른 두 직사각형이 꼭짓점에서 만나거나, 변이 겹치는 경우 등은 없습니다.
// 다음 그림과 같이 지형이 2개 이상으로 분리된 경우도 없습니다.
// 한 직사각형이 다른 직사각형 안에 완전히 포함되는 경우 또한 없습니다.
// 지형을 나타내는 직사각형이 담긴 2차원 배열 rectangle, 초기 캐릭터의 위치 characterX, characterY, 아이템의 위치 itemX, itemY가 solution 함수의 매개변수로 주어질 때, 캐릭터가 아이템을 줍기 위해 이동해야 하는 가장 짧은 거리를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// rectangle의 세로(행) 길이는 1 이상 4 이하입니다.
// rectangle의 원소는 각 직사각형의 [좌측 하단 x, 좌측 하단 y, 우측 상단 x, 우측 상단 y] 좌표 형태입니다.
// 직사각형을 나타내는 모든 좌표값은 1 이상 50 이하인 자연수입니다.
// 서로 다른 두 직사각형의 x축 좌표, 혹은 y축 좌표가 같은 경우는 없습니다.
// 문제에 주어진 조건에 맞는 직사각형만 입력으로 주어집니다.
// charcterX, charcterY는 1 이상 50 이하인 자연수입니다.
// 지형을 나타내는 다각형 테두리 위의 한 점이 주어집니다.
// itemX, itemY는 1 이상 50 이하인 자연수입니다.
// 지형을 나타내는 다각형 테두리 위의 한 점이 주어집니다.
// 캐릭터와 아이템의 처음 위치가 같은 경우는 없습니다.
// 전체 배점의 50%는 직사각형이 1개인 경우입니다.
// 전체 배점의 25%는 직사각형이 2개인 경우입니다.
// 전체 배점의 25%는 직사각형이 3개 또는 4개인 경우입니다.

function solution(rectangle, characterX, characterY, itemX, itemY) {
  // 좌표를 2배로 늘림. 세밀한 이동을 표현.
  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;
  let dobuleRec = rectangle.map((rec) => rec.map((point) => point * 2));

  // 위, 아래, 우측, 좌측 방향 설정
  const moveX = [1, -1, 0, 0];
  const moveY = [0, 0, 1, -1];

  // 시작 위치를 초기화.
  const start = [characterX, characterY, 0];
  let que = [start];

  // 움직일 수 있는 좌표를 2차원 배열로 정의하여 0으로 초기화.
  let range = Array.from({ length: 103 }, () => Array(103).fill(0));

  // 테두리는 1, 테두리의 내부는 2로 값을 변경.
  dobuleRec.forEach(([x1, y1, x2, y2]) => {
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        if (i === x1 || i === x2 || j === y1 || j === y2) {
          if (range[i][j] === 0) range[i][j] = 1;
        } else {
          range[i][j] = 2;
        }
      }
    }
  });

  // 시작 위치를 0으로 변경하여 다시 방문하지 않도록 함.
  range[characterX][characterY] = 0;

  // bfs 탐색. 큐에 담긴 값이 없을 때(도착지점에 도착했을 때)까지 반복.
  while (que.length > 0) {
    // 처음 값(shift)을 가져와 탐색.
    let [x, y, cnt] = que.shift();

    // 현재 위치가 도착 위치에 도달하면 리턴.
    if (x === itemX && y === itemY) return cnt / 2;

    // 도착하지 않았다면 움직일 수 있는( 1인 경우 ) 좌표 값가 횟수를 추가.
    for (let i = 0; i < 4; i++) {
      let chX = x + moveX[i];
      let chY = y + moveY[i];
      if (range[chX][chY] === 1) {
        que.push([chX, chY, cnt + 1]);
        range[chX][chY] = 0;
      }
    }
  }
  return 0;
}

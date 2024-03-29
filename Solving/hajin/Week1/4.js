// 4. 수박수박수박수박수박수?
/* 길이가 n이고, "수박수박수박수...."와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 
예를들어 n이 4이면 "수박수박"을 리턴하고 3이라면 "수박수"를 리턴하면 됩니다. */
/* n	return
    3	"수박수"
    4	"수박수박" */

// 답
function solution(n) {
  let answer = "";
  for (i = 1; i <= n; i++) {
    answer += i % 2 === 0 ? "박" : "수";
  }
  return answer;
}
// 문자열에 홀수에는 박, 짝수에는 수를 추가하여 리턴

// 다른 사람 풀이
const waterMelon = (n) => "수박".repeat(n).slice(0, n);
// repeat
// 문자열을 n번 반복 (존재조차 까먹음)

// slice(n,m)
// n번째 인덱스부터 m-1번째 인덱스까지 잘라서 추출
// m에 음수값을 넣으면 반대 방향으로 계산
// ==> 정해진 구간까지 추출하여 "새로운 배열"을 반환한다.

// slice와 splice의 차이
// splice(n, m, 'item1', 'item2')
// 배열에서 요소를 추가 제거, 교체 작업을 수행
// n번째 인덱스부터 m개의 요소를 삭제하고, 'item1, 'item2'를 추가한다.
// ==> 원본 배열이 수정된다.

// 즉, 수박을 n번 반복한 뒤, n번째 문자열까지만 잘라서 반환한다.
// 내는 못한다

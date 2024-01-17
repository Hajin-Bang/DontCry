// 제일 작은 수 제거하기

// 문제 설명
// 정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

// 제한 조건
// arr은 길이 1 이상인 배열입니다.
// 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.

function solution(arr) {
  let answer = [];
  if (arr.length <= 1) {
    return [-1];
  } else {
    arr.splice(arr.indexOf(Math.min(...arr)), 1);
    answer = arr;
  }
  return answer;
}

// indexOf는 요소를 찾을 수 있는 첫 번째 인덱스를 반환, indexOf(1,1)은 첫번째 1을 찾아 인덱스를 반환
// splice 제거하거나 추가 변경하여 배열의 내용을 변경, splice(3)은 3번 인덱스포함 그 이후 삭제

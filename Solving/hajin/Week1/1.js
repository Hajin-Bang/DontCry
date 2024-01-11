// 문제1. 제일 작은 수 제거하기
/* 정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 
단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 
예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다. 
[4,3,2,1] -> [4,3,2]
[10] -> [-1]  */

// 답
// 전개구문, filter 구글링함
function solution(arr) {
  let result = "";
  if (arr.length > 1) {
    result = arr.filter((x) => x !== Math.min(...arr));
    return result;
  } else {
    return [-1];
  }
}
// (...) 전개구문
// Math.min은 배열을 인수로 받으면 값을 반환할 수 없다. (배열로 간주되지 않고, 하나의 인수로 간주된다) => 결과값은 NaN
// 따라서 스프레드 문법(전개구문)을 사용해서 배열의 각 요소를 개별적인 인수로 전달해야한다.

// filter
// 주어진 함수의 조건을 충족하는 요소만 필터링한다.

// ** 처음 시도한 오답
// 틀린 이유: arr에서 최소값만 제거한 뒤 그대로 출력해야하는데, 이 코드는 sort로 배열을 정렬한다.
function solution(arr) {
  if (arr.length > 1) {
    arr.sort((a, b) => b - a).pop();
    return arr;
  } else {
    return [-1];
  }
}

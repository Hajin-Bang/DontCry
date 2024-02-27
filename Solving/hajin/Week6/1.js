// 문제1. 타겟 넘버
/* 
n개의 음이 아닌 정수들이 있습니다. 
이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 
예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 
숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.
*/

// 답
function solution(numbers, target) {
  let answer = 0;
  const dfs = (index, sum) => {
    if (index === numbers.length) {
      if (sum === target) answer++;
      return;
    }
    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum - numbers[index]);
  };

  dfs(0, 0);
  return answer;
}

// 타겟 넘버를 만들 수 있는 "모든 경우의 수"를 탐색해야하므로 DFS 사용
// 현재 숫자에서 더하기와 빼기를 각각 하고, 합계가 타겟 넘버와 일치하는지 확인

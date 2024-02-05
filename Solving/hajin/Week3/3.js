// 문제 3. H-Index
/* H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 
어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.
어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.
어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 
이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요. 
citations	        return
[3, 0, 6, 1, 5]	    3
*/

// 답
function solution(citations) {
  let answer = 0;
  for (let i = citations.length; i >= 1; i--) {
    if (citations.filter((num) => num >= i).length >= i) {
      answer = i;
      break; // 값을 찾은 후에는 반복문을 중단해야함
    }
  }
  return answer;
}
// break를 하지 않으면 오답인 이유
// : 최대 h값을 찾아야하므로 최초의 h값을 찾으면 더 이상 내려가면서 찾을 필요가 없음

// 정렬 풀이
function solution(citations) {
  citations.sort((a, b) => b - a);

  let answers = 0;
  for (let i = 0; i < citations.length; i++) {
    if (i < citations[i]) {
      answers++;
    }
  }

  return answers;
}

/* [3, 0, 6, 1, 5] 예시
정렬: [6, 5, 3, 1, 0] 
1. 첫번째 논문은 6번 인용됨 -> 6번 이상 인용된 논문은 1편 (6>1)
2. 두번째 논문은 5번 인용됨 -> 5번 이상 인용된 논문은 2편 (5>2)
3. 세번째 논문은 3번 인용됨 -> 3번 이상 인용된 논문은 3편 (3>=3)
4. 네번째 논문은 1번 인용됨 -> 1번 이상 인용된 논문은 4편 (1<4)
==> H-index는 3
*/

// 문제 이해가 안됐음 ..
/* 문제 참고
https://www.ibric.org/bric/trend/bio-series.do?mode=series_view&newsArticleNo=8802417&articleNo=8882714&beforeMode=latest_list#!/list
*/

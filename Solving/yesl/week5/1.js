// 더 맵게

// 문제 설명
// 매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.
// 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
// Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
// Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

// 제한 사항
// scoville의 길이는 2 이상 1,000,000 이하입니다.
// K는 0 이상 1,000,000,000 이하입니다.
// scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
// 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

class MinHeap {
  constructor() {
    this.heap = [];
  } // 최소 힙의 기본 구조를 저장할 빈 배열을 초기화
  size() {
    return this.heap.length;
  } // 현재 힙에 저장된 요소의 개수를 반환
  peek() {
    return this.heap[0];
  } // 힙의 최상단 요소(가장 작은 값)를 반환

  push(value) {
    this.heap.push(value); // 새로운 요소를 힙에 추가
    let index = this.heap.length - 1;

    while (
      index > 0 &&
      this.heap[index] < this.heap[Math.floor((index - 1) / 2)]
    ) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[Math.floor((index - 1) / 2)];
      this.heap[Math.floor((index - 1) / 2)] = temp;
      index = Math.floor((index - 1) / 2);
    } // 삽입된 요소가 부모 노드의 값보다 작으면 위치를 상향 조정하여 올바른 위치로 이동
  }

  // 값을 빼되, 오름차 순 정렬 함
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    // 힙에서 최소값을 제거하고 반환

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    let index = 0;

    while (index * 2 + 1 < this.heap.length) {
      let minChildIndex =
        index * 2 + 2 < this.heap.length &&
        this.heap[index * 2 + 2] < this.heap[index * 2 + 1]
          ? index * 2 + 2
          : index * 2 + 1;

      if (this.heap[index] < this.heap[minChildIndex]) {
        break;
      }

      const temp = this.heap[index];
      this.heap[index] = this.heap[minChildIndex];
      this.heap[minChildIndex] = temp;
      index = minChildIndex;
    }
    return minValue;
  } // 힙의 마지막 요소를 최상단으로 이동시키고, 힙의 성질을 유지하기 위해 하향 조정
}

function solution(scoville, K) {
  const minHeap = new MinHeap();

  for (const sco of scoville) {
    minHeap.push(sco);
  } // 주어진 스코빌 지수 배열의 모든 요소를 순회하며 최소 힙에 삽입

  let mixedCount = 0; // 섞는 횟수를 세기 위한 변수를 0으로 초기화

  // 힙 안에 음식이 2개 이상 있고
  // 스코빌 지수가 가장 작은 음식의 수치가 K보다 작을 때까지 반복
  while (minHeap.size() >= 2 && minHeap.peek() < K) {
    // 스코빌 지수가 가장 작은 두 음식 섞기
    const first = minHeap.pop();
    const second = minHeap.pop();
    const mixedFood = first + second * 2;
    minHeap.push(mixedFood);
    mixedCount++;
  }

  return minHeap.peek() >= K ? mixedCount : -1;
}

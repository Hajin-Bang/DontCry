// 다리를 지나는 트럭

// 문제 설명
// 트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.

// 예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

// 경과 시간	다리를 지난 트럭	다리를 건너는 트럭	  대기 트럭
// 0	          []	              []	               [7,4,5,6]
// 1~2	          []	              [7]	               [4,5,6]
// 3	          [7]	              [4]	               [5,6]
// 4	          [7]	              [4,5]	               [6]
// 5	          [7,4]	              [5]	               [6]
// 6~7	          [7,4,5]	          [6]	               []
// 8	          [7,4,5,6]	          []	               []
// 따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

// solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭 별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

// 제한 조건
// bridge_length는 1 이상 10,000 이하입니다.
// weight는 1 이상 10,000 이하입니다.
// truck_weights의 길이는 1 이상 10,000 이하입니다.
// 모든 트럭의 무게는 1 이상 weight 이하입니다.

function solution(bridge_length, weight, truck_weights) {
  let time = 0; // 전체 걸린 시간
  let bridge = new Array(bridge_length).fill(0); // 다리 상태. 다리 길이만큼 0으로 초기화
  let currentWeight = 0; // 현재 다리 위의 트럭 총 무게
  
  while(bridge.length > 0) {
      // 다리에서 첫 번째 요소 제거하고, 그 무게만큼 현재 다리 위 트럭 무게에서 빼줌
      currentWeight -= bridge.shift();
      // 대기중인 트럭 유무 확인
      if(truck_weights.length > 0) {
          // 새로운 트럭을 다리에 추가로 올릴 수 있는지 확인
          if(currentWeight + truck_weights[0] <= weight) {
              let truck = truck_weights.shift();
              bridge.push(truck);
              currentWeight += truck;
          } else { // 올릴 수 없다면, 다리에 무게 0 추가
              bridge.push(0);
          }
      }
      time++; // 시간 1초 증가
  }
  return time; // 모든 트럭이 다리 건넌 후 총 시간 반환
}

console.log(solution(2, 10, [7,4,5,6]));
console.log(solution(100, 100, [10]));
console.log(solution(100, 100, [10,10,10,10,10,10,10,10,10,10]));
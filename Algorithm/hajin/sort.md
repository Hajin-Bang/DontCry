# 정렬(Sort)

## 1. 정렬(Sort)

- 데이터를 특정 순서에 따라 배치하는 것
- 시간 복잡도 O(n^2)

## 2. 정렬의 종류

### **1. 버블 정렬 (Bubble Sort)**

- 연속한 두 개의 인덱스값을 비교한 후, 기준을 만족하는 값을 맨 뒤로 보내는 방법

- 모든 짝을 비교하기 때문에 성능이 좋지 않음

- EX) "더 큰 수"를 뒤로 보내는 기준을 정한다면?

  - 자신이 오른쪽 항목보다 크면 swap하여 정렬

  - 최종적으로는, **가장 큰 수**가 오른쪽에 정렬됨

  - 반복할수록 정렬해야하는 항목이 줄어듦

  ### < **예시 코드** >

  ```js
  function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
    return arr;
  }
  ```

  ```js
  function swap(arr, idx1, idx2) {
    let tmp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = tmp;
    // 뒤로 하나씩 밀어주기
  }
  ```

### **2. 선택 정렬(Selection Sort)**

- 배열 내에서 가장 작은 값을 찾은 닫음, 맨 앞에 배치시키는 방법
- 맨 앞을 제외하고 다시 순회하며 최솟값을 찾음 --> 반복
- n번째 회전이 끝날 때마다 앞에서 n번째 데이터의 위치가 정해짐

  ### < **예시 코드** >

  ```js
  function selectionSort(arr) {
      for (let i=0; i<arr.length; i++) {
          let min = i;
          for (let j=i+1; j<arr.length; j++) {
              if(arr[min]) > arr[j] {
                  min=j;
              }
          }
          if (min !== i) {
              let swap = arr[min];
              arr[min] = arr[i];
              arr[i] = swap;
          }
      }
      return arr
  }

  ```

### **3. 삽입 정렬(Insertion Sort)**

- 정렬되지 않은 데이터를 이미 정렬된 데이터와 비교하고, 알맞은 위치를 찾아 삽입하는 방법
- 배열의 두번째 요소부터 모든 요소를 앞부분의 배열과 비교

  ### < **예시 코드** >

  ```js
  function insertionSort(arr) {
      for(let i=1; i<arr.length; i++) {
          let cur = arr[i];
          let j = i-1;

          white(j>=0 && array[j] > cur) {
              arr[j+1] = arr[j];
              j--;
          }
          arr[j+1] = cur;
      }
      return arr;
  }
  ```

</br>

**<참고>** </br>
https://mine-it-record.tistory.com/533

https://velog.io/@young_mason/Algorithm-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Sorting-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Basic%ED%8E%B8

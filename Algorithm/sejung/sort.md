# 정렬 알고리즘

## 버블 정렬 (Bubble Sort)
- 가장 간단하고 직관적인 정렬 알고리즘 중 하나
- 인접한 두 원소를 비교하여 큰 값을 뒤로 보내는 방식으로 정렬
- 배열의 모든 원소에 대해 반복하여 배열을 정렬

### 구현 방법
1. 첫 번째 원소부터 시작해 인접한 원소와 비교
2. 만약 앞의 원소가 뒤의 원소보다 크다면, 두 원소의 위치 교환
3. 배열의 끝까지 이 과정 반복

### 예시코드(JS)
```
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

### 장점
- 구현이 매우 간단하고, 코드가 직관적
- 이미 정렬된 데이터에 대해서는 빠르게 동작 (최선의 경우 O(n))

### 단점
- 시간 복잡도는 O(n^2)로, 데이터의 양이 많을 때 비효율적
- 정렬된 상태에서 새로운 데이터가 추가될 경우에도 비효율적


## 선택 정렬 (Selection Sort)
- 배열 전체에서 가장 작은 원소를 찾아 첫 번쨰 위치와 교환
- 그 다음으로 작은 원소를 찾아 두 번째 위치와 교환하는 과정 반복
- 배열에서 최솟값을 찾아야 하므로 비교 횟수는 많지만 실제로 값을 바꾸는 교환 횟수는 적음

### 구현 방법
1. 배열 전체에서 가장 작은 원소 검색
2. 그 원소를 배열의 첫 번째 위치와 교환
3. 남은 원소에 대해서도 같은 과정 반복

### 예시코드(JS)
```
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}
```

### 장점
- 구현이 매우 간단
- 비교하는 횟수에 비해 교환하는 횟수가 적기 때문에, 많은 교환이 일어나야 하는 자료 상태에서 비교적 효율적

### 단점
- 시간 복잡도가 O(n^2)로, 데이터의 양이 많을 때 비효율적
- 안정성이 보장되지 않음 (동일한 값을 가진 원소의 상대적인 순서 변동 가능)
- 정렬된 상태에서 새로운 데이터가 추가될 경우에도 비효율적


## 삽입 정렬 (Insertion Sort)
- 버블 정렬의 비효율성을 개선하기 위해 등장한 방법
- 각 원소를 이미 정렬된 배열 부분에 적절한 위치에 삽입
- 마치 카드 게임에서 카드를 정렬하는 방식과 유사
- 선택 정렬은 i+1번째 원소를 찾기 위해 나머지 모든 원소들을 탐색하지만,
- 삽입 정렬은 i+1번째 원소를 배치하는데 필요한 만큼의 원소만 탐색하기 때문에 훨씬 효율적으로 실행

### 구현 방법
1. 두 번째 원소부터 시작하여 현재 원소를 임시 변수에 저장
2. 현재 원소 이전의 모든 원소를 비교하여 적절한 위치 탐색
3. 찾은 위치에 현재 원소 삽입

### 예시코드(JS)
```
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let prev = i - 1;
        while (prev >= 0 && arr[prev] > current) {
            arr[prev + 1] = arr[prev];
            prev--;
        }
        arr[prev + 1] = current;
    }
    return arr;
}
```

### 장점
- 대체로 작은 규모의 데이터셋에 효율적
- 이미 정렬된 데이터에 대해서는 빠르게 동작 (최선의 경우 O(n))

### 단점
- 시간 복잡도가 O(n^2)로, 데이터의 양이 많을 때 비효율적
- 정렬해야 할 리스트가 클 때는 다른 정렬 알고리즘과 비교하여 성능 저하


## 병합 정렬 (Merge Sort)
- 배열을 반으로 나누고, 각 부분을 재귀적으로 정렬한 후 두 부분을 병합하여 전체 정렬
- 대량의 데이터에 대해서도 효율적

### 구현 방법
1. 배열을 반으로 나눔
2. 각 부분을 재귀적으로 정렬
3. 정렬된 두 부분을 병합하여 전체 정렬

### 예시코드(JS)
```
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

```

### 장점
- 시간 복잡도가 O(n log n)으로, 대량의 데이터를 효율적으로 처리
- 안정적인 정렬 방법

### 단점
- 배열을 복사하여 저장하는 데 추가적인 메모리 필요
- 배열이 아닌 연결 리스트로 데이터 저장하는 경우, 다른 정렬 알고리즘에 비해 상대적으로 느릴 수 있음
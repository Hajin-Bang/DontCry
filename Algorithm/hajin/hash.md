# 해시(Hash)

## 1. 해시(Hash)

- 해시함수를 이용해 데이터(key)를 고정된 크기의 데이터(value)로 변화시켜 저장하는 것
- 모든 데이터 타입으로 접근이 가능
  - 정수가 아닌 key를 가질 수 있어서 배열로는 담을 수 없는 정보를 담을 수 있음
- 해시값 자체를 index로 사용하기 때문에 평균 시간복잡도가 O(1)로 매우 빠름
  - 모든 데이터를 확인하지 않아도 검색/삽입/삭제를 빠르게 할 수 있음

</br>

- 언제 써야할까?
  </br>
  :string을 기반으로 정보를 기록하고 관리해야 할 때 (대부분의 경우는 string 형태의 key를 가짐)

## 2. 해시 함수(Hash Function)

- key와 연결되어있는 value를 삽입, 삭제, 탐색하는 함수
  - key에 대한 해시값을 만드는 함수
- 키에 대한 해시값을 구하는 과정을 해싱(hashing)이라고 하며, 이 때 사용하는 함수를 해시함수라고 함
- 키 값에 대한 중복값이 없도록 만드는 것이 좋은 함수

  ### **2-1. 특징**

- key값이 조금만 달라도 전혀 다른 해시 값을 출력
- key값의 길이와 상관 없이 고정된 길이의 해시 값을 출력
- 단방향 암호화
  - 해시값을 통해 key값을 알아낼 수는 없음

## 3. 해시 테이블(Hash Table)

- 해시 함수로 인덱스 매핑된 최종 데이터
- (key:value) 쌍으로 생성됨
  - key:value의 형태를 갖는 자료구조

## 4. 해시 충돌(Hash Collision)

- 서로 다른 입력값에 대해 동일한 해시값이 계산되는 경우
- 충돌이 일어나지 않는 것이 최적의 해시 함수이지만, 충돌을 완전히 방지하기가 어려움

### 4-1. 충돌을 해결하기 위한 방법

1. **체이닝(Chaining)**

- 해시 충돌이 발생한 경우, 동일한 해시값을 가진 데이터들을 하나의 버킷에 모아두는 방법

  - 버킷: 데이터가 저장되는 곳
  - 한 버킷당 들어갈 수 있는 데이터 수에 제한을 두지 않음
  - 첫번째 버킷에 데이터가 이미 있다면 그 다음 노드를 가리키는 방식이라서 체이닝?

- 충돌을 허용하지만 최소화 하는 것
- 최악의 경우 모든 데이터가 같은 해시값을 가져 O(n)의 복잡도를 가지게 됨

</br>

2. **개방 주소법(Open Addressing)**

- 한 버킷당 들어갈 수 있는 데이터가 하나 뿐인 해시 테이블
- 해시 함수로 얻은 주소가 아닌, 다른 주소에 데이터를 저장할 수 있도록 허용

  - 들어가려고 했던 주소에 이미 데이터가 있다면, 빈 버킷으로 간다

  </br>

- **Linear Probing(선형 탐사)**
  - 최초 해시값에 해당하는 버킷에 다른 데이터가 있을 경우, 고정 폭을 옮겨 다음 해시값에 해당하는 버킷에 저장
  - 이동하는 폭이 선형적
- **Quadratic Probing(제곱 탐사)**
  - 선형 탐사와 달리 그 폭이 제곱 수로 늘어남
  - Ex. 1^1칸, 2^2칸, 3^3칸

## 5. Hash in JavaScript

**JS의 대표적인 해시 테이블: Object, Map, Set**
</br>
=> key-value로 이루어진 자료구조

### 5.1 Map의 메소드

#### 1. **set(): value 저장**

```js
let map = new Map();

let number = 0;
let str = "string";
let obj = { a: 1 };
let funct = () => {
  console.log("func");
};

map.set(number, 4); //key값에 number 저장
map.set(str, 1); //key값에 string 저장
map.set(func, 3); //key값에 함수 저장
map.set(obj, 2); //key값에 object 저장

// ⭐️key값에 다양한 데이터 타입을 저장할 수 있다⭐️
```

#### 2. **get(): value 얻기**

```js
map.get(str); // 1
map.get(obj); // 2
```

#### 3. **has(): value 존재 여부 확인**

```js
map.get(str); // true
map.get(obj); // true
map.get("hajin"); // false

// 특정 key가 존재하는지 여부를 확인
```

#### 4. **delete(): value 삭제**

```js
map.delete(str); // true
// 성공적으로 삭제되었을 경우 true를 반환한다
map.has(str); // false
```

#### 5. hash 탐색: for~of

```js
// key, value 쌍으로 출력
for (let [key, value] of map) {
  console.log(key + " = " + value);
}

// key만 출력
for (let key of map.keys()) {
  console.log(key);
}

// value만 출력
for (let value of map.values()) {
  console.log(value);
}
```

### 5.2 Set의 메소드

**Set:** 중복을 허용하지 않는 값들의 집합을 나타내며, 배열 등에서 중복된 값을 제거하고자 할 때 유용

#### 1. **add(): value 추가**

#### 2. 이 외에는 map과 거의 비슷하게 사용

    has, delete, clear, size 등

</br>

**<참고>** </br>
https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/

https://runa-nam.tistory.com/84

https://velog.io/@jun094/Hash%EC%99%80-Map

object와 map
https://erim1005.tistory.com/entry/Javascript-%EC%97%90%EC%84%9C-Object%EB%A5%BC-%ED%95%B4%EC%8B%9C%EB%A7%B5%EC%B2%98%EB%9F%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94

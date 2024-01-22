# 해시

### 해시, 해시 함수, 해싱

**해시(Hash)**

- `해시`는 데이터를 다루는 기법 중의 하나로, **검색과 저장을 아주 빠르게**하는 자료구조이다.
- 데이터를 저장할 때 `Key-Value`형태로 데이터가 존재하고, Key값이 배열의 인덱스로 저장되기 때문에 검색과 저장이 빠르게 일어나게 된다.

**해시 함수(Hash Function) & 해싱(Hashing)**

- `해시 함수`는 Key값을 **고정된 길이의 hash**로 변환하는 역할을 한다.
- 해시 함수에서 Key값을 hash로 변환하는 과정을 `해싱(hashing)`이라고 한다.
- 해시 함수에서는 Key값을 해싱 과정을 통해 `해시 값(hash value)` 또는 `해시코드(hash code)`으로 변경하며, 이 해시 값이 저장 위치가 된다고 생각하면 된다.
- 서로 다른 키(key)가 같은 해시(hash)가 되는 경우를 해시 **충돌(Hash Collision)**이라고 하는데, 해시 충돌을 일으키는 확률을 최대한 줄이는 함수를 만드는 것이 중요하다.

### 해시 테이블

**해시 테이블(Hash Table)**

- `해시 테이블`은 **연관 배열구조**를 이용하여 데이터를 `Key`와 `Value`로 저장하는 자료구조이다.
- 해시 테이블은 해시 함수를 사용하여 `인덱스(index)`를 `버킷(bucket)`이나 `슬롯(slot)`의 배열로 계산한다.
- **원래 데이터의 값(Key) -> Hash Function -> Hash Function의 결과 = Hash Code -> Hash Code를 배열의 Index 로 사용 -> 해당하는 Index에 data 넣기**
  > 연관 배열구조?
  >
  > 연관 배열은 자료구조의 하나로, 키 하나와 값 하나가 연관되어 있으며 키를 통해 연관되는 값을 얻을 수 있다.
  >
  > **연관 배열은 일반적으로 다음의 명령을 지원한다.**
  >
  > - 키와 값이 주어졌을 때, 연관 배열에 그 두 값을 저장하는 명령
  > - 키가 주어졌을 때, 연관되는 값을 얻는 명령
  > - 키와 새로운 값이 주어졌을 때, 원래 키에 연관된 값을 새로운 값으로 교체하는 명령
  > - 키가 주어졌을 때, 그 키에 연관된 값을 제거하는 명령

<img width="300" alt="해시 테이블" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/630px-Hash_table_3_1_1_0_1_0_0_SP.svg.png">

- 하나의 키 값이 존재할 때, 해시 함수를 통해서 데이터를 키값으로 바꾸어 버킷에 저장한다.

> **장점**
>
> - 데이터를 효율적으로 관리할 수 있다.
> - 중복을 제거할 수 있다.
> - 데이터 캐싱, 보안에 주로 사용된다.
> - 배열의 인덱스로 접근하기 때문에 검색, 삽입, 삭제가 빠르다.
>
> **단점**
>
> - 공간 복잡도가 커진다.
> - 충돌이 발생할 수 있다.- 충돌이 발생할 경우 시간 복잡도는 O(n)에 가까워진다.
> - 순서가 있는 배열에는 어울리지 않는다.
> - 해시 함수 의존도가 높아진다.

### 충돌

- `충돌(collision)`이란 서로 다른 문자열이 해시 함수를 통하여 해싱한 해시값이 중복인 경우를 말한다.
- 충돌이 많아질수록 탐색의 시간 복잡도가 O(1)에서 점점 O(n)에 가까워지게 된다.
- 충돌을 줄여주는 해시 함수를 사용하는 것이 좋다.
- 충돌 해결 방법은 크게 2가지가 있다.
  > - Separating Chaining - Linked List, Tree(Red-Black Tree)
  > - Open addressing - Linear Probing, Quadratic Probing, Double hashing

**Separating Chaining**

- JDK 내부에서 사용하는 충돌처리 방식으로, LinkedList를 사용하는 방식이다.
- LinkedList뿐만 아니라 Tree(Red-Black Tree)를 사용하기도 한다.
- 두 개의 기준은 data가 6개 이하면 LinkedList를, 8개 이상이면 tree를 사용한다.
- 만일 7개일 경우 데이터를 삭제하게 되면 linkedList로 바꿔야 하고, 추가되면 tree로 바꿔야 한다.
- 이때 바꾸는데 오버헤드가 있어서 기준이 6과 8이 되는 것이다.

<img width="300" alt="Separating Chaining - Linked list" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg/900px-Hash_table_5_0_1_1_1_1_1_LL.svg.png">
<Separating Chaining - Linked list>

- LinkedList를 사용할 경우, 인덱스 충돌이 났을 때 인덱스가 가리키고 있는 LinkedList에 노드를 추가하여 삽입한다.
- 데이터를 탐색할 때는 키에 대한 인덱스가 가리키고 있는 LinkedList를 선형 검색하여, 해당 키에 대한 데이터를 반환한다.
- 삭제하는 것 또한 비슷하게 키에 대한 인덱스가 가리키고 있는 LinkedList에서 그 노드를 삭제한다.
- Separate Chaining방식은 LinkedList 구조를 사용하기에 추가할 수 있는 데이터 수의 제약이 작다.

> **장점**
>
> - 한정된 버컷(Bucket)을 효율적으로 사용할 수 있다.
> - 해시 함수를 선택하는 중요성이 상대적으로 적다.
> - 상대적으로 적은 메모리를 사용해서 미리 공간을 잡아 놓을 필요가 없다.
>
> **단점**
>
> - 한 해시에 자료들이 계속 연결되면 검색 효율을 낮출 수 있다.
> - 외부 저장 공간을 사용해서 외부 저장 공간 작업을 추가로 해야 한다.

**Open addressing**

- 인덱스에 대한 충돌 처리에 대해서 LinkedList와 같은 추가적인 메모리를 사용하지 않고, `Hash Table Array`의 빈 공간을 사용하는 방법이다.
- 추가적인 메모리 공간을 사용하지 않기 때문에 Separate Chaining방식에 비해 메모리를 덜 사용한다.
- Linear Probing, Quadratic Probing, Double hashing등이 있다.

<img width="300" alt="Separating Chaining - Linked list" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Hash_table_5_0_1_1_1_1_0_SP.svg/760px-Hash_table_5_0_1_1_1_1_0_SP.svg.png">
<Open addressing - Linear Probing>

- 인덱스가 중복되는 충돌이 발생할 때 인덱스 뒤에 있는 버킷 중 빈 버킷을 찾아 데이터를 삽입한다.
- 그림의 경우 Sandra의 키 값의 인덱스는 152를 가리킨다. 하지만 John과 충돌이 나기 때문에 그 다음인 153에 삽입한다.
- Linear Probing 방식에서의 탐색은 Sandra의 키에 대해서 검색을 하면, index가 152이기 때문에, key가 일치하지 않기에 뒤의 index를 검색해서 같은 키가 나오거나 Key가 없을 때까지 검색을 진행한다.
- 삭제는 더미 노드를 넣어서 검색할 때 다음 인덱스까지 검색을 연결해주는 역할을 해줘야한다.(삭제가 어렵다.)

> **장점**
>
> - 다른 저장공간 없이 해시 테이블 내에서 데이터 저장 및 처리가 가능하다.
> - 다른 공간에서의 추가적인 작업이 없다.
>
> **단점**
>
> - 해시 함수의 성능에 전체 해시 테이블의 선능이 좌지우지된다.
> - 데이터의 길이가 늘어나면 그에 해당하는 저장소를 마련해야 한다.

**리사이징(Resizing)**

- Separate Chaning의 경우, 버킷이 일정 수준으로 차 버리면 각 버킷에 연결되어 있는 List의 길이가 늘어나기 때문에, 검색 성능이 떨어지게 되므로 버킷의 개수를 늘려줘야 한다.
- Open addressing의 경우, 고정 크기 배열을 사용하기 때문에 데이터를 더 넣기 위해서는 배열을 확장해줘야 한다.
- 이를 `리사이징(Resizing)`이라고 한다.
- 보통 두 배로 확장하는데, 확장하는 임계점은 현재 데이터 개수가 해시 버킷의 개수의 `75%`가 될 때이다.
- 0.75라는 숫자는 load factor라고 불린다.
- 리사이징은 더 큰 버킷을 가지는 array를 새로 만든 다음, 기존 array의 hash를 다시 계산해서 복사해줘야 한다.

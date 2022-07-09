---
layout: post
title: "Hack🪓 the #2 Promise"
date: 2022-07-9 22:30:00 +0900
categories: [Hack]
---

## 내가 JS를 배운 방식

![내가 JS를 배운 방식](https://i.postimg.cc/brTsMb5m/js.png)  
{: .center}

사실 나도 2017년 경에 C#과 디자인 패턴 등을 배울 때만 해도 책이나 참고자료 보면서 차근차근 배우는게 가능했었다. 그런데 어느 순간 부터 성인 ADHD라도 발병한건지 그렇게 한 걸음씩 하는걸 몸이 견디질 못하더라. 그래서 근래에 들어서는 그냥 새로운 기술, 언어를 배울 때 어느정도 들이박는 식으로 시작하고 있다. 일단 만들어보자는 식으로. 이런 말도 있잖아.

> 만들기 위해 배우지 말고 배우기 위해 만들어라. {실용주의 사고와 학습}

다짜고짜 왜 이런 이야기로 시작했느냐. 이렇게 배워온 탓인지 그냥 습관적으로 써온 키워드들이 가끔씩 내게 어색하게 다가올 때가 있다. 예를 들자면 이런거:

## Promise

![약속해줘](https://i.postimg.cc/B6b1MHd4/image.png)  
뻔하지만 이것만한게 또 없어요
{: .center}

특히나 **"Promise"**란 단어는 아무래도 초등 교육 받을 꼬꼬마 시절부터 **"약속하다"**로 각인되어 있는 바람에, 나는 이걸 쓸 때 마다 이 사람들이 왜 **"약속"**을 비동기 처리 테크닉의 이름으로 사용했을까 하는 의문이 생기기 시작한 것이다. 그래서 준비한 [의존성 주입](https://anteater333.github.io/hack/2022/03/07/hack-the-terms-1.html) 이후 두 번째 분석 대상. **Promise**{: .middle-big}를 지금부터 뜯어보자.

## 왜 자바스크립트인가?

![인기언어](https://i.postimg.cc/xTLVgqCd/image.png)  
[출처](https://twitter.com/dylayed/status/1539659879706529793?t=38gF-WtspHSPd-DCWy2H8w&s=09)  
{: .center}

우선은 간단한 역사 공부. 자바스크립트는 1990년대에 처음 등장해 어떻게 2020년대에 가장 많은 사용자를 가진 언어 중 하나가 되었을까. 결론부터 이야기 하자면, 웹은 너무 성공했고, 웹 브라우저의 존재감은 덩달아 거대해졌으며, 자바스크립트는 태초부터 웹 브라우저를 위한 언어였다.

보통 웹(Web)으로 말하는 월드 와이드 웹(World Wide Web)은 기본적으로 HTML이라는 정적인 마크업 언어로 작성된 문서를 공유하는 시스템이었다. 전 세계의 사람들이 적절한 인프라만 갖춰지면 쉽게 문서를 주고받을 수 있다는 점은 아무래도 엄청난 매력 포인트였을테고, 곧 사람들은 더 재미있는 문서를 만드는 방법에 대해 몰두하게 되었으리라. 그 결과로 웹 브라우저 개발사는 정적인 마크업 언어의 한계를 보완할 수 있도록 동적인 프로그래밍 언어를 [글루 코드](https://en.wikipedia.org/wiki/Glue_code)로써 도입하길 시작하였고, 기존의 프로그래밍 언어를 사용하려는 몇 번의 시도 이후 웹 브라우저를 위해 설계된 프로그래밍 언어 자바스크립트를 탄생시킨 것이다.

이런 배경을 가진 자바스크립트의 특징을 모두 나열하기엔, 나도 사실 잘 모르기도 하고, 주제가 자바스크립트가 되어버릴 것 같으니 중요한 부분에 집중해보자.

## 비동기非同期Asynchronous

![기다리는중](https://i.postimg.cc/GhZpdNSC/image.jpg)  
사실은 이미 얼어죽은거죠
{: .center}

요점은 자바스크립트는 GUI(HTML)를 다루는 언어로서 탄생했다는 것이고, GUI는 얼어붙은 채 있으면 안된다. 긴 대기 시간이 필요한 작업을 수행하면 화면이 얼어붙는게 아니라 최소한 사용자에게 빙빙 돌아가는 로딩 인디케이터라도 보여줘야 한다. 이것이 바로 **비동기(Asynchronous)** 방식의 프로그래밍이다: 사람은 결과를 기다려도 프로그램이 결과를 기다리지는 않는다.

자바스크립트는 비동기 처리에 유리한 구조를 가지고 있다. 비동기 처리는 항상 자바스크립트의 주요 관심사 중 하나였으며, 자바스크립트의 발전에 따라 비동기 처리의 구현 방식 또한 발전해왔다.

## 일급 함수

앞에서 말한 그 "유리한 구조"란 무엇인지 먼저 알아두고 가자. 자바스크립트의 함수는 **일급 함수(First-class function)**이다. 프로그래밍 언어를 구성하는 객체들은 모두 평등하나 어떤 객체들은 **좀 더 평등**하다. 그들은 값을 할당 받을 수 있고, 비교 연산의 대상이 될 수 있고, 함수에 매개변수로써 전달될 수 있으며 함수의 반환 값이 될 수 있다. 이것을 "일급 객체"라고 하며, 이름에서 유추할 수 있듯이 "일급 함수"인 자바스크립트의 함수는 위에서 나열한 모든 행동들의 대상이 될 수 있다. 간단히 말해서, **자바스크립트에선 함수를 변수 처럼 쓸 수 있다.**

```javascript
// 매개변수로 함수를 받는 함수
function doSomething(value, something) {
  const calculated = value + 5;

  // 매개변수로 전달받은 함수 something을 실행
  const result = something(calculated);

  return result;
}

// 변수에 할당한 함수 (익명함수를 변수에 할당)
const myFunction = function (value) {
  const calculated = value + 10;

  // 함수의 결과물로 새로운 함수를 반환
  return function rtFunction(anotherValue) {
    console.log(calculated + anotherValue);
  };
};

// myFunction을 전달해 doSomething 함수를 실행한 결과값을 변수에 할당
const result = doSomething(1, myFunction);

// 짜잔 전달받은 결과값은 함수였습니다!
result(100);

// console에 116이 출력됩니다.
```

위의 간단한 텅 트위스터 느낌의 예제를 보자. 자바스크립트에선 이렇게 함수를 자유자재로 사용할 수 있다. 이것이 의미하는 것은 무엇인가, 우리는 행동을 위임할 수 있게 되었다.

## 자바스크립트 비동기 처리의 발전

![비동기 처리의 발전](https://i.postimg.cc/PJ0nc6Nh/asynchronous.png)  
[출처](https://www.johnpapa.net/async-comparisons/)  
{: .center}

자바스크립트의 비동기 처리는 일급 함수를 통해 프로그램의 흐름을 다루는 것에 근간을 두고 있다. 이제부터는 자바스크립트의 비동기 처리 구현 방식이 어떻게 발전했는지 살펴보자.

### Callback

```javascript
setTimeout(TheCALLBACK, 1000);
```

`setTimeout`은 지정한 시간 뒤에 특정 함수를 실행해주는 자바스크립트 내장 함수이다. 위 코드를 한국말로 바꾸면, "1000 밀리 초 이후에 `TheCALLBACK` 함수를 실행시켜"이다. **Callback, 콜백 함수**는 이처럼 다른 함수에 매개변수로 전달해 전달 받은 함수가 자신을 실행할 수 있도록 하는 함수를 뜻한다. 콜백 함수를 전달받는 `setTimeout`은 비동기 함수라고 부르자. 비동기 함수에 콜백 함수를 전달함으로써 비동기 함수의 로직을 프로그램이 기다릴 필요 없이 비동기 함수 이후에 콜백 함수가 실행된다는 순서가 지켜지게끔 만들 수 있는 것이다. 이 콜백 함수가 바로 자바스크립트의 첫 번째 비동기 처리 방식이다. 직관적으로, 호출(Call)을 작업이 끝난 이후에(Back) 할 함수라고 이해하자.

![블랙박스](https://i.postimg.cc/xTBLPk1k/blackbox.png)
{: .center}

눈치가 빠른 사람이라면 콜백 함수를 통한 비동기 처리에서 어떤 특징을 발견했을 것이다. 우리가 만든 콜백 함수는 더이상 우리의 통제를 따르지 않는다. 콜백 함수를 비동기 함수에게 넘겨준 순간 콜백 함수의 제어권은 비동기 함수가 갖는다. 우린 비동기 함수라는 **검은 상자**에 콜백 함수를 넣어야 한다. `setTimeout`을 다시 생각해보자. 사람의 입장으로써 1000ms 뒤에 콜백 함수가 실행된다는 점은 아주 예측이 쉬워보인다. 하지만 `setTimeout`을 호출한 이후 1000ms 동안 우리는 정확히 몇 가지 명령어를 더 실행시킬 수 있을까? `setTimeout`이 아닌 외부 라이브러리로부터 제공받은 비동기 함수들은 정확히 몇 초의 연산 시간 후에 콜백을 실행시킬까? 콜백 방식에선 제어의 역전(IoC)이 발생하지만, 그 단어의 맛이 마냥 달콤하지만은 않다. 콜백이 만드는 제어의 역전은 순차성(Sequentiality)과 신뢰성(Trustability)을 떨어뜨린다.

![POD](https://i.postimg.cc/y8cwJhtv/pod.png)  
콜백 지옥, 또는 파멸의 피라미드  
{: .middle-big .center}

사실 이런 있어보이는 단어들을 사용할 것도 없이, 또다른 콜백이 만들어낸 아주 유명한 문제가 있다. 콜백이 만들어내는 코드는 보기에 끔찍하다는 것이다.

### Promise

![약속해줘](https://i.postimg.cc/B6b1MHd4/image.png)  
먼 길을 돌아 드디어 도착
{: .center}

이렇게 못 미더운 비동기 함수로 인해 새로운 해결책이 나오는 것은 당연한 수순이었다. 자바스크립트의 아키텍트들은 믿을 수 없는 비동기 함수 대신 보증을 설 수 있는 구조를 설계했다. **Promise 패턴**{: .middle-big}은 그렇게 탄생했다. [프로미스](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) 객체는 호출 시점에 제대로 생성되었는지 아닌지 확실하지 않은 값을 대신해 나서는 역할을 한다. 프로미스는 미래에 당신이 원하는 값을 얻을 것이라고 **약속**{: .middle-big}해줌으로써 비동기 함수의 결과값을 믿을 수 있게 만들어주는 것이다. 덤으로 저 끔찍한 파멸의 피라미드도 없애줬고.

![promise](https://i.postimg.cc/J0SkWjck/promise.png)
[그림이 이뻐서 가져왔다](https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial)  
{: .center}

프로미스의 인터페이스를 살펴보자. 프로미스 객체는 약속대로 결과값이 충족되었을(fulfill) 때 사용하는 `then` 메소드와 결과값이 제대로 반환되지 않아(reject) 오류 처리가 필요할 때 사용하는 `catch` 메소드로 이루어진다.**(실은 두 상황 모두 상관없이 처리하는 finally 메소드도 있다.)**{: .middle-small} 각 메소드는 매개변수로 콜백 함수를 받는다. 각각 약속대로 진행되었을 때, 오류가 발생했을 때 비동기적으로 실행될 함수들이다. 그리고 각 메소드는 다시 프로미스 객체를 반환한다. 즉 프로미스는 엮을(Chaining) 수 있다.

```javascript
new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
})
  .then(function (result) {
    console.log(result);

    return result * 2;
  })
  .then(function (result) {
    console.log(result);

    return result * 2;
  })
  .then(function (result) {
    console.log(result);

    return result * 2;
  });
```

이렇게 프로미스는 인터페이스를 제공함으로써 제어를 다시 한 번 뒤집어 우리에게 비동기 처리의 제어권을 줬고, 위와 같이 연쇄적으로 엮일 수 있는 구조로 콜백 지옥이 발생하지 않게끔 만들어 주기도 한다.

```javascript
// node.js에서 GET 요청으로 원격 이미지 가져오기
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

프로미스 객체는 실제 개발에서 숱하게 다루게 된다. 라이브러리로부터 제공받은 메소드의 결과물이 프로미스 객체인 경우도 있고, 우리가 직접 프로미스 객체를 만들어야 하는 경우도 있다. 아마 자바스크립트를 배우면 [AJAX 구현](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started)에 대해 배우게 될 것이고, 스스로 [Promise 기반 HTTP 클라이언트](https://axios-http.com/kr/docs/intro)라고 소개하는 **Axios 라이브러리**에 대해서도 금방 알게 될 것이다. 라이브러리가 제공하는 `axios` 메소드는 HTTP 요청을 전송한 다음 그 결과물을 프로미스 객체로 포장해 반환해준다. 그렇게 우리는 비동기 통신의 결과를 믿을 수 있는 순간에 받아서 처리할 수 있는 것이다.

프로미스를 우리가 직접 만드는 경우에 대해서도 살펴보자. 사실 위에서 먼저 `new Promise`라는 코드를 작성했기 때문에 미리 말해버린 셈이 되었는데, 그냥 저렇게 새 프로미스 인스턴스를 만들면 된다. 생성자를 사용하는 방법만 잘 이해하면 된다.

![Promise 생성자](https://i.postimg.cc/B63FJ4HM/promiseconstructor.png)
{: .center}

vscode에서 생성자에 대한 설명을 캡쳐해봤다. 프로미스 객체의 생성자는 콜백 함수 하나를 매개변수로 받는다. 이 때의 콜백 함수는 비동기 연산의 이후에 호출될 연산이 아닌 비동기 연산 그 자체를 뜻한다. `executor` 라는 이름을 가진 이 콜백은 다시 매개변수로 `resolve`와 `reject`라는 두 콜백 함수를 받는다. 간단해 보이지만 자그마치 3개의 함수가 합쳐진 컴비네이션. 

```typescript
/**
 * 영상의 전체 길이를 반환합니다.
 * 외부 라이브러리 등으로 영상 메타테이터를 읽어올 수 없을 때 사용합니다.
 * @param videoURI
 * @returns
 */
export async function checkVideoLengthManually(
  videoURI: string
): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const media = new Audio(videoURI);
    media.onloadedmetadata = function () {
      resolve(Math.ceil(media.duration * 1000));
    };
  });
}
```

위의 예제는 필요해서 만들었던 간단한 유틸 함수이며, 비디오와 관련된 연산을 수행한다. 비디오 등의 멀티미디어 데이터는 이벤트를 통해 비동기적으로 읽어들어야 하는데, 해당 과정을 프로미스로 감싼 것이다. 프로미스 생성자에 전달된 콜백 함수를 보자. 미디어 데이터의 메타데이터가 로드 되었을 때, 미디어 데이터의 길이를 계산한 값을 전달하며 `resolve` 함수를 호출한다. `resolve` 함수의 의미는 쉽게 유추할 수 있을 것이다. `resolve` 함수는 약속한 값이 성공적으로 계산되었음을 알리는 역할을 한다. 반대로 `reject` 함수는**에러 처리에 대한 내 형편없는 마음가짐 덕에 위에서 사용되지는 않았지만**{: .small} 약속한 값을 계산하는데에 실패했음을 알리는 역할을 한다.

## async & await 

![sugar bae](https://i.postimg.cc/P5VHJS7x/sugarbae.jpg)  
Promise를 조금만 더 달콤하게 만들어보자
{: .center}

프로그래밍 언어엔 **[문법적 설탕(Syntactic Sugar)](https://en.wikipedia.org/wiki/Syntactic_sugar)**이라는 표현이 있다. 프로미스, 솔직히 아주 아름다운 구조로 만들어졌고 값을 약속해준다는 의미도 충분히 직관적이라고 생각한다. 하지만 큰 단점이 있으니, 문법적으로 봤을때는 사람에게 그리 친숙하지 않다는 점이다.

```javascript
somePromise.then((resolvedValue) => {
  foo(resolvedValue);
});

bar("some text");
```

우리는 문장이라는 것을 기록하기 시작한 이후로 한 가지 주요한 약속의 영향 속에서 살고있다: "글은 위에서 아래로 읽는다." 그런데 위의 코드를 보자. `foo`와 `bar` 두 함수 중 먼저 실행되는 것은 무엇인가? 우리는 `then`에 콜백 함수를 전달했을 뿐, 그 함수를 호출한 것은 아니다. 따라서, 함수 `bar`가 `foo` 보다 먼저 실행될 것이다. 이런 흐름은 혼란을 야기하기 쉽다. 같은 컨텍스트 안에서 코드는 순차적으로 읽을 수 있는 것이 좋다.

그리고 한 가지 더, 프로미스는 약속을 생성하고 우리가 원할 때 그 약속의 값을 받을 수 있다는 점에서 강력하다. 그런 장점을 살려 `Promise.all()`, `Promise.any()` 등의 정적 메서드들을 제공하기도 한다. 프로미스 객체들을 생성하고, 상황에 맞춰 조합하며 쓰는 것이다. 다만, 일반적으로 우리는 프로미스 객체를 반환 받았을 때 바로 `then`을 호출한다. 프로미스만의 구조와 의미에 집중해가며 사용하지 않는 이상 그저 프로미스 체이닝 같은 난해한 문법이 하나 추가되는 것에 불과할 수도 있는 것이다.

![async/await](https://i.postimg.cc/W3rDVVVQ/asyncawait.png)  
{: .center}

사실 진짜 좋은 설계란, 사용자가 그 내부 구조를 굳이 몰라도 되게끔 만드는 설계일지도 모른다. ES2017에서 소개된 `async`와 `await` 키워드는 사용자를 프로미스로부터 한 발자국 멀어져도 되게끔 만들어주었다. 두 키워드의 의미는 아주 간단하다.

- 함수 선언 앞에 붙는 `async` : 이 함수는 "**비동기 처리**"를 하는 함수입니다.
- 함수 호출 앞에 붙는 `await` : 이 함수의 결과가 나올 때 까지 "**기다리겠습니다.**"

물론 아무 함수나 기다릴 수는 없다. `await`는 프로미스를 반환하는 함수 앞에만 사용할 수 있다. `await`는 해당 프로미스가 `resolve` 하게 되는 값을 기다리는 것이다. 그리고 `await`가 함수의 결과를 기다린다고 지금 실행 중인 프로그램 전체를 멈추는 것도 아니다. `await`는 `async` 키워드를 사용한 함수 안에서만 사용할 수 있다. `await`로 인해 대기하게 되는 컨텍스트는 해당 `await`가 사용된 `async` 함수로 제한된다.

```javascript
function getDeno() {
  return axios.get("https://deno.land/").then((response) => {
    console.log(response);
  });
}

async function getDenoWithAwait() {
  const response = await axios.get("https://deno.land/");
  console.log(response);
}
```

백문이 불여일견, 두 함수는 동일한 기능을 수행한다. 이렇게 둘을 놓고 보니 *"아니 밑에 있는 함수는 리턴이 없는데 어떻게 동일한 기능을 수행하는거야?"* 라고 생각할 수도 있을 것 같다. 하지만 그게 바로 `async`가 뿌려준 설탕의 맛이다. `async` 키워드를 사용한 함수는 자동으로 반환값을 프로미스로 포장한다. 그렇다면 `return`이 없는 경우엔? vscode를 사용하고 있다면 `getDenoWithAwait` 함수 위에 마우스를 올려보자. 반환 값이 없는 `async` 함수는 `Promise<void>` 객체를 자동으로 반환한다. 즉, 둘은 사실 내부적으로 똑같은 코드를 사용한다. 같은 의미를 가지고, 성능에도 큰 차이가 없지만 우리가 이해하기 좋은 문법을 사용하는 것이며, 그래서 **문법적 설탕**이라고들 부르는 것이다.

다만, 의미는 같으나 문법은 달라졌다. 사용에 조금 주의를 요하는 부분이 있다. 다음 문제를 풀어보자. 각 코드의 결과는 어떠할까?

[![전부문제같아~](https://i.postimg.cc/90YDkjHC/image.png)  
클릭해서 보자](https://i.postimg.cc/wqSD76Wy/image.png){:target="_blank"}  
{: .center}

코드가 바뀌는 부분은 20번 라인 부터이며, 단 둘만이 같은 결과를 출력한다. 
  
[정답](https://i.postimg.cc/XV29wKvC/image.png){:target="_blank"}  
{: .center .big}

간단하게 한 가지만 기억해두자. 정상적으로 `async`와 `await`을 사용했다면 우리가 받는 것은 **원했던 값**이며, 그 상황에서 프로미스에 대해선 알 필요가 없어진다.

## 마무리

![비동기 처리의 발전](https://i.postimg.cc/PJ0nc6Nh/asynchronous.png)  
{: .center}  

워낙에 글 써보기에 좋은 주제라서 이것보다 더 좋은 글을 찾으려면 쉽게 찾을 수 있을 것이다. 원래 6월 중에 이 글을 올리는게 목표였는데, 인생 뭐 항상 뜻대로 되는것만 있나. 아무튼 나와 비슷한 의문을 가졌던 사람들에게 조금이나마 도움이 되었으면 좋겠다. 비슷한 의문이라 하면, 프로미스를 디자인 패턴의 하나로 바라보는 시각 같은거라고 해야할지. 내가 받았던 가르침에 의하면 그런 생각에 큰 의미가 있는건 아니겠지만.

아무튼 이번에도 워낙 파편적으로 자료들을 찾아봐서 레퍼런스를 특정하기가 어려운데, [이 글](https://velog.io/@elrion018/%EC%99%9C-%ED%94%84%EB%A1%9C%EB%AF%B8%EC%8A%A4promise-%EC%95%BD%EC%86%8D%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C#%ED%94%84%EB%A1%9C%EB%AF%B8%EC%8A%A4-%EC%B2%B4%EA%B3%84%EC%97%90%EC%84%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90-%EA%B0%9C%EC%84%A0)이 처음 아이디어에 도움된 것 같다.

사실 처음 기획할 땐 사이즈가 꽤 컸었어서 자바의 [Future](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Future.html)도 알아보고 그럴 생각이었는데, 이것 역시 계획대로는 안됐다. [레퍼런스 덩어리의 목적으로 위키백과 페이지라도 남겨놔야 겠다.](https://ko.wikipedia.org/wiki/%ED%93%A8%EC%B2%98%EC%99%80_%ED%94%84%EB%A1%9C%EB%AF%B8%EC%8A%A4)

그나저나 문법적 설탕이란 용어에 대해서는 뭔가 호불호가 갈리는 듯한 분위기가 느껴지는 것 같기도 하다. 그래서 구글링을 가볍게 했는데 [무슨 1986년도 메일이 뜬다.](https://groups.google.com/g/net.lang/c/T3vOVIYYjDI) 진짠지 아닌지는 모르겠다. 해석도 안해봤고.

끝으로, 이 글을 올리면서 [Buy me a coffee☕](https://www.buymeacoffee.com/) 버튼도 달아봤다. 페이지를 위로 올려보면 내 나름대로 커스터마이징 한 버튼이 보일 것이다. 그냥.. 뭐... 커스터마이징 하는거 은근 번거로운 일이었다고.. 색깔 바꾸고 레이아웃 수정하는거... 한마디 자랑 정도 하려구... 아무튼 글 끝.
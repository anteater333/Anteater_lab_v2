---
layout: post
title: '회고록 #2 - 숲 (2)'
date: 2023-10-28 23:17:00 +0900
description: "숲, 나무위키 인기 검색어, 크롤링, 크롤러, 실검, 프로젝트 회고록, React, node, express, deno, 에이전트 프로그램, agent, 백조의 발, UX, alert 사용하지 않기, KISS 원칙, Keep It Simple Stupid, 테스트 러너"
categories: [Memoir]
---

## 숲Soup - 나무위키 인기 검색어
{: .center .big}

[![Soup](https://raw.githubusercontent.com/anteater333/namu-soup/main/images/s1.png)](https://blog.anteater-lab.link/namu-soup/)  
{: .center .rounded-edge-16}

> [(지난 줄거리)](/memoir/2023/09/09/memoir-soup-1.html) 호기롭게 시작한 토이 프로젝트 숲. 메모, 크롤링 등 원하는 기능을 모두 구현하고 배포에 돌입하였으나, CAPTCHA라는 장벽을 맞닥뜨린다. 처절한 실패의 맛에 좌절하고 마는데...

## 프로젝트 부활

2012년 학생 창의력 챔피언대회에서 내가 배운 것은 어떤 요구사항이든 어떻게든 구현할 방법은 있다는 사실. 그 마음가짐으로 당시 우리 팀은 전국에서 모인 수많은 팀 중 유일하게 주어진 과제를 통과했었다. 이번 글에서는 내가 이 서비스를 배포하기 위해 어떤 아이디어로 구조를 개편했는지, 그리고 그렇게 프로젝트를 부활시킨 이후 추가한 기능들에 대해 회고하고자 한다. 

### 백조의 발, 에이전트

![백조](https://i.postimg.cc/MT0WLD3g/swan.gif)  
{: .center .rounded-edge-16}

대학교에 다닐 때 교수님께서 오버헤드에 대한 비유로 "백조는 겉으로 보기엔 우아해 보이지만 수면 아래에선 열심히 발을 구르고 있다."고 하신 것이 기억난다. 사실 그 표현 자체엔 왈가왈부가 좀 있지만, 서비스를 구현할 때 가끔 이 비유가 떠오를 때가 있다.

[![우아한형제들](https://i.postimg.cc/9Qvmmp0g/image.png)  
때마침 이름도 "우아한"형제들](https://www.hellodd.com/news/articleView.html?idxno=70348)
{: .center .rounded-edge-16}

배달의 민족이 초기에 사용했던 전략을 한 번 보자. 사용자가 어플에서 버튼만 눌러 음식을 주문하는 것처럼 보여도 사실 서비스 뒤편에선 콜센터 직원들이 대신 전화를 해주고 있었다. 이 콜센터 직원들이 바로 이 서비스가 기획대로 동작하도록 암약하는 비밀 요원(Agent)들이었던 것이다.

![요원](https://i.postimg.cc/mD6VJ8TV/istockphoto-157562302-612x612.jpg)  
{: .center .rounded-edge-16}

서비스에서 에이전트는 다양한 형태로 존재한다. 소프트웨어로 구현된 에이전트도 물론 존재한다. 예를 들어, 로지텍 무선 마우스를 PC에 연결하면 로지텍에서 본인들의 에이전트 프로그램을 설치하도록 안내한다. 에이전트 프로그램은 마우스의 동작을 보조하거나 동작 정보를 수집해 본인들의 서버로 전달한다. 나는 숲의 나무위키 크롤링 방지 문제를 해결하기 위해 별도의 에이전트 프로그램을 만드는 방법을 생각했다. 왜 굳이 에이전트일까. 일반 사용자들이 나무위키에서 인기 검색어를 확인할 땐 CAPTCHA 화면이 나타나지 않는다. 지난번 개발 기간 동안 개발 PC에서는 크롤링이 정상적으로 동작했던 이유가 이것이다. 숲의 에이전트는 일반 사용자의 얼굴을 빌려 나무위키로부터 인기 검색어를 가져와 서버에 저장하는 역할을 한다.

### 활기를 되찾은 숲

![새 구조](https://i.postimg.cc/mgp7jhVW/image.png)  
{: .center}

에이전트 프로그램을 운영자(이 경우 개발자인 나)의 PC에 백그라운드 프로그램으로 실행시켜 상시 동작하도록 만들어 서비스가 굴러가게 만드는 것이 나의 아이디어였다. 숲 서비스의 에이전트, 이름하여 **숲 요정(Soup Yojeong)**.

![숲요정](https://i.postimg.cc/4yq2MZzW/image.png)  
임무를 수행 중인 숲 요정의 모습 (상상도)
{: .center .rounded-edge-16}

이 에이전트 프로그램이 이번 개발 기간의 핵심 아이디어이긴 했지만, 사실 구현이 그렇게 어려운 기능은 아니었다. 크롤링은 첫 개발 기간 동안 이미 구현해 놓았다. 백엔드에 달린 크롤링 기능을 떼어 원하는 형태로 가공하기만 하면 되는 수준이었다. 하지만 숲 요정이 가져온 효과는 그 이상. 덕분에 나는 프로젝트를 다시 시작할 수 있게 되었고, 앞서 만들어 놓았던 프론트엔드/백엔드 서버들에 대한 고도화도 진행할 수 있었다.

## 두 번째 개발 기간

### 숲 요정 (Agent)

#### 설계

![숲 요정 서비스 구조](https://i.postimg.cc/Kc37PGKS/image.png)  
{: .center}

**숲 요정 서비스**는 운영자의 PC에 설치되어 다음 두 기능을 수행해야 한다. 1) 자동으로 나무위키에서 인기 검색어를 가져와 서버에 저장한다(크롤링). 2) 크롤링을 주기적으로 실행한다(스케줄링). 그 형태를 나타낸 것이 위 그림이다. 필요 기능에 나름 이름을 붙여가며 나열하긴 했는데, 참을 수 없는 존재의 가벼움이 느껴지는 규모가 아닐 수 없다.

#### 구현

개발 환경으로는 deno를 선택했다. 거창한 이유는 없다. 전부터 deno로 뭔가 만들어 보고 싶었다. 오히려 이런 가벼운 규모일수록 전부터 해보고 싶었던 기술을 시도해 보기 좋은 것 같다. 또한 뒤에서도 언급할 텐데 이 프로젝트가 가지고 있는 기조를 따르기에 deno가 적합한 부분이 존재했다. 기존 백엔드 서버에 node를 사용했기 때문에 자바스크립트로 짜여진 크롤링 로직을 거의 그대로 가져와 적용할 수 있어 편하기도 했고.

![기록](https://i.postimg.cc/Dwhfj2pT/image.png)  
{: .center}

모듈도 단 둘, 크롤링 로직이 담긴 에이전트(`main.ts`)와 그 에이전트를 언제 생성할지 스케줄을 결정하는 사령부(`hq.ts`)로 나누어진다. 나름 TDD 방식을 따르려고 테스트 코드 작성 -> 기능 구현의 순서대로 개발을 진행했다. 테스트 작성에는 deno에서 자체적으로 제공하는 테스트 러너를 적극 사용했다.

![숲요정 임무 수행중](https://i.postimg.cc/SNDPv94q/image.png)  
{: .center .rounded-edge-16}

그렇게 만들어진 숲 요정 프로그램은 내 PC의 WSL에 설치되어 있다. 별도의 실행 파일로 빌드하지는 않았고, `rc.local` 파일을 사용해 부팅할 때마다 자동으로 서비스가 시작되도록 설정해 두었다. 이렇게 에이전트는 오늘도 서버에 쉬지 않고 인기 검색어를 전달 중이다.

### 숲 백엔드

![트롤러](https://i.postimg.cc/gJ0Pk96G/xd-F8p-XH4t-S4i-O-Zgd1-J-1kzc-Gnpy1q-OGwma-0qw4-H76-PTe-JOhil5-Vo-KXJ7iy-ANPXLqh5o5m-WBFZD6-TKxvc-K-A.webp)  
{: .center .w-1-quarter .rounded-edge-16}

백엔드 추가 기능의 경우 보안에 대해 집중했다. 보안이란 게 웹 서비스 환경의 Well-known 공격에 대한 대비는 아니고, 트롤러들을 막을 수 있으면 좋을 것 같아 이런 아이디어를 떠올려 봤다.

- 동일 사용자가 연속해서 메모를 등록하지 못하게 하자. (독점 방지)
  - 별도의 블랙리스트 테이블을 갖는 **SameUserGuard** 모듈을 만들었다.
- 동일 내용을 가지는 메모가 한 검색어 키워드 안에서 중복되지 않도록 막자. (도배 방지)
  - 작성 요청받은 메모와 같은 메모가 이미 존재하는지 확인하는 **SameMemoGuard** 모듈을 만들었다.
- 최대 메모 문자열 길이를 제한하자.
  - 기존 메모 생성 로직에 유효성 검증 단계를 하나 더 추가했다.
- 문제 내용을 운영자가 지울 수 있도록 하자.
  - 운영자 비밀번호를 body에 담아 보내 사용할 수 있는 삭제 API를 구현했다.

간략하게 결과를 훑어봤는데, 가장 큰 변화는 **Guard 모듈**의 구현인 것 같다. 만들던 당시엔 나름 잘했다고 생각했는데 몇 가지 아쉬운 부분이 보인다.

**1) 모듈 간의 관계를 더 개선할 수 있을 것 같다.**

메모 생성 API에 해당하는 라우터 함수에서 Guard 모듈을 직접 호출해 검증 로직을 실행했다. 그러지 말고 미들웨어 관계로 만들었으면 더 좋았을 것 같다. 미들웨어로 만들게 되면 라우터 함수에서 Guard 모듈의 존재를 굳이 몰라도 되고 Guard 모듈의 스펙 변경에 라우터 함수가 대응할 필요가 없어지기 때문.

**2) SameMemoGuard는 차라리 메모 저장 함수 내부의 검증에 합치는 게 좋을 것 같다.**

처음에는 SameMemoGuard의 기능을 조금 복잡하게 생각했다. 레벤슈타인 거리를 계산해서 유사한 문장을 걸러내는 식으로. 그런데 이 서비스에서 비용 대비 유의미한 효과를 볼 것 같지 않아서 완전히 같은 문장만 걸러내는 식으로 설계를 변경했다. 아무튼 처음 계획대로는 로직이 조금 복잡해질 거로 생각해서 Guard 모듈로 떼어내야 한다고 생각했는데, 다시 살펴보니 메모 저장 함수 내지는 그 모듈에 포함된 함수로 구현하는 것이 더 좋을 것 같다.

일단 메모 저장 함수 안에도 저장 전 메모 데이터를 검증하는 로직이 존재한다. 요청한 슬롯 번호가 잘못됐다던가, 키워드가 메모리에서 없어졌다든가 하는 내용 등. 이번에 추가한 메모 길이 확인도 여기서 한다. 중복 메모 확인은 결국 그 기능상 메모리(여기선 메모 DB를 편의상 메모리라고 부르겠다.)에 종속적이어야 하는데, 다 만들고 나서 보니 Guard 모듈의 테스트 코드가 메모리 모듈을 생성하고 있더라.

결과적으로 모듈을 구분하는 조건은 그 로직이 얼마나 복잡한 것이냐가 아니라 어떤 기능을 하느냐가 중요하다는 것.

### 숲 프론트

프론트엔드는 크게 3가지로 정리할 수 있을 것 같다.

- 백엔드 변경에 대응
- 자잘한 버그 수정
- UX 개선

백엔드 변경은 윗 단락에서 이야기한 내용들이고, 자잘한 버그 수정은 [이 글](/micro/2023/02/26/micro-tip-7.html)에서 다뤘다. 여기선 UX 개선에 집중해 보도록 하자.

![반응형](https://i.postimg.cc/tJ14J3xy/image.png)  
{: .center .rounded-edge-16}

첫 번째는 CSS 미디어 쿼리(`@media`)를 사용한 반응형 웹 구현. 반응형이라는 단어는 들을 때마다 어렵게 느껴지는데 그래도 막상 해보면 생각보다 어렵지는 않더라. 오히려 어렵다기 보단 번거롭다는 느낌. 물론 이렇게 쉽게 말하는 것치곤 위 사진의 레이아웃이 마냥 깔끔한 건 아니라 조금 민망하긴 하다.

![흐헤헤](https://i.postimg.cc/Gh80hJ1f/image.png)  
{: .center .rounded-edge-16}

그리고 두 번째는 에러 처리를 좀 더 능글맞게 넘기기. 다른 말로 `alert` 사용하지 않기. 에러 내용에 따라 입력창 하단에 메시지를 보여주거나 자연스럽게 화면 전환이 발생하도록 변경했다.

Web API중 하나인 `alert`은 그 편리함 덕분에 웹 페이지 프로토타입을 만들 때 애용하게 되지만, 남들에게 보여주는 페이지에서도 `alert`을 쓰고 있으면 왠지 모양이 빠지는 느낌이 든다. 단순히 멋이 안 난다는 점도 있지만(달리 생각해 보면 석학들이 머리 맞대서 만드는 웹 브라우저에게 UI 디자인을 아웃소싱 한 거라 못생긴 건 아닐지도), 몇 가지 문제 사항이 있다. 예를 들어 앞서 백엔드에서 새로 추가한 글자 수 제한을 초과하는 입력이 발생했다고 가정해 보자. API로부터 에러 코드를 받고 무엇이 문제인지 사용자에게 알려줘야 한다. `alert`은 이때 웹 앱을 잡아먹어 버린다. 사용자가 입력을 다시 수정하려면 엔터를 누르던 확인창을 누르던 경고창을 직접 닫아야 한다.

```javascript
setTimeout(() => {
  console.log("Hello");
}, 5000);
alert("World");
```

사용자 입력뿐만이 아니라 `alert`은 웹 페이지의 자바스크립트 자체를 정지시켜버리기도 한다. 위 예제 코드를 웹 페이지에서 테스트해 보면 5초가 지나도 확인 버튼을 누를 때까지 콘솔 출력이 나타나지 않는 것을 확인할 수 있을 것이다. `alert`은 개발자의 비동기 흐름 예측을 어렵게 만들 수 있으니 고도화된 웹 어플리케이션 개발에서는 지양하는 것이 좋지 않을까 하는 것이 개인적인 생각.

![placeholder](https://i.postimg.cc/hv6F545t/image.png)  
{: .center .rounded-edge-16 .w-half}

그리고 마지막으로 로딩 여부를 나타내는 방식을 Spinner에서 Placeholder로 변경했다. Spinner의 경우 화면 전체를 덮는 반투명 오버레이를 두고 중간에 뺑뺑 돌아가는 컴포넌트를 보여주는 구조였는데, 화면 전체가 너무 깜빡인다는 느낌이 들더라. 그래서 화면에서 로딩의 영향을 받는 부분에만 적용할 수 있는 Placeholder를 사용하기로 했다. 이것도 오래된 기술이지만 그래도 Spinner 보다는 좀 더 MZ한 기분.

## KISS

![KISS](https://i.postimg.cc/3RPvhgG2/kiss.png)  
아무리 그래도 운율 맞추겠다고 멍청이라니...
{: .center .w-half .rounded-edge-16}

숲 프로젝트의 개발 회고록은 아마 당분간은 여기까지가 끝일 것 같다. 지금은 다른 프로젝트들에 더 신경을 쓰는 중이기 때문. 사실 이 회고록 자체가 이미 개발이 끝나고 한참 뒤에 시작하긴 했다. 지금까지의 숲 개발 기간에 대해 한마디로 요약하자면 **KISS, Keep It Simple Stupid** 그 자체였던 것 같다. "이 프로젝트 엄청 작은 규모야", "외부 라이브러리 최대한 적게 써보자" 등등. 그러다 보니 너무 스스로를 얽매고 있었던 것은 아니었나 싶기도 하다. 특히 숲 백엔드 서버에서 사용한 테스트 러너가 아주 가관이다.

```javascript
// guards.test.js
import { assertEquals, assertTrue } from "./asserts.js";
import { SameUserGuard, SameMemoGuard } from "./guards.js";
import db from "./memory.js";

function SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다() {
  console.log(
    SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다.name
  );
  return new Promise((resolve, reject) => {
    // 테스트 환경에서 Blacklist 수명은 5초로 가정
    SameUserGuard.setGlobalSameUserGuardPeriod(5000);

    const user = "127.0.0.1";

    const checkedResult = SameUserGuard.checkUserRegistered(user);

    assertEquals(false, checkedResult);

    SameUserGuard.registerUser(user);

    setTimeout(() => {
      assertEquals(true, SameUserGuard.checkUserRegistered(user));
    }, 3000);
    setTimeout(() => {
      assertEquals(false, SameUserGuard.checkUserRegistered(user));
      resolve();
    }, 6000);
  });
}

function MemoSpamGuard로_한_키워드_안에서_이미_등록된_메모를_금지한다() {
  console.log(
    MemoSpamGuard로_한_키워드_안에서_이미_등록된_메모를_금지한다.name
  );
  return new Promise((resolve, reject) => {
    db.initMemory().then(() => {
      const keyword = db.getAllMemory()[0][0].keyword;

      const memo = "TEST";

      db.setMemory(keyword, 0, "", memo, "127.0.0.1");

      const checkedResult = SameMemoGuard.checkMemoExists(keyword, memo);

      assertTrue(checkedResult);

      resolve();
    });
  });
}

new Promise((resolve, reject) => {
  resolve();
})
  // .then(() =>
  //   SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다()
  // )
  .then(() => MemoSpamGuard로_한_키워드_안에서_이미_등록된_메모를_금지한다())
  .finally(() => {
    console.log(`test ended - ${import.meta.url}`);
  });
```

그.. 나쁜 생각은 아닌 거 같은데.. 이렇게까지 해야 했었나...? 그래도 Deno를 사용한 에이전트 개발에선 Deno 자체가 내장 테스트 러너를 제공해 줘서 "외부 라이브러리 최소화하자!"라는 강박에 조금은 도움이 되었던 것 같다. 근데 또 이렇게 해놓은 거 보니까 구조를 더 개선할 수 있을 것 같이 보이고, 뭔가 제대로 된 테스트 러너라는 것을 만들어 보고 싶은 도전욕구를 자극시키는 것도 있긴 하더라. 아무튼, DB조차도 쓰지 않고 만든 프로젝트였다. 이런 미니 중의 미니 프로젝트지만 나름 별문제 없이 잘 돌아가고 있는 모습을 보니 뿌듯하고 좋긴 하군.

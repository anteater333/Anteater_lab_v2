---
layout: post
title: "Hack🪓 the #4 Rendering"
description: 
date: 2024-02-03 12:40:00 +0900
categories: [Hack]
---

## 🖐️금손 작가, 컴퓨터

![노예비유법](https://i.postimg.cc/x8nrcbJs/image.png)
{:loading="lazy"}  
{: .center .rounded-edge-16 .w-3-quarter}

사람들은 가끔씩 컴퓨터를 노예에 비유해 설명하곤 한다. 재밌는 비유다. [다만 깃허브가 `master` 브랜치를 `main` 브랜치로 개명한지 몇 년이나 된 마당에](https://github.com/github/renaming) 블로그에서 계속 이 비유를 사용하긴 좀 미안하니 그냥 "일꾼"이라고 하자. 아무튼, 이 일꾼은 복잡한 계산을 척척 해내며 20세기쯤부터 여러 사무 작업에서 활약해왔다. 사람이 직접 계산하기엔 너무 복잡해 틀릴 가능성이 높은 계산들. 사람들은 그 계산 결과를 LED 점등으로 확인하기도, 종이에 글을 써내도록 만들어 확인하기도, 소리를 내도록 해서 확인하기도, 그러다 모니터라는 물건이 발전하자 컴퓨터를 여기에 연결시켜 가상의 문서를 그려내도록 만들어 확인하기도... 아니 가만보니 이거 사무 작업에만 쓰기엔 너무 아까운데?

![사람들은 이쯤부터](https://i.postimg.cc/DZZWXm9c/image.png){:loading="lazy"}  
민망하니 굳이 번역은 하지 않겠다.
{: .center .rounded-edge-16 .w-3-quarter}

사람들은 이 일꾼이 계산만 잘하는게 아니라 그림도 잘 그릴 수 있다는 것을 깨닫는다. 그들은 컴퓨터에게 그림을 그리는데 특화된 도구(Graphics card, 그래픽 카드)를 쥐어주고, 그림 형태로 컴퓨터와 소통하는 방법(Graphical User Interface, GUI)을 체계화하기 시작한다. [수상할 정도로 돈이 많은 컴퓨터 사용자들의 커미션에 힘입어](https://i.postimg.cc/Kcps0GjY/XCXROf-SCY-x-CINH-INLR96-F8xx-M8-Nl0l5-S9m1l7-Wip9-Jm-Me97fg-Q-S-i-LHu-F-DF11mpt-Bci-RBZ-G-Jho7-EM1-Sw.webp){:target="_blank"}{: .a-not-colored} 컴퓨터의 그림 실력은 일취월장하였고, 그렇게 **컴퓨터 그래픽(Computer Graphics)**은 오늘날의 수준에 이르렀다. 컴퓨터가 이 컴퓨터 그래픽을 구현하는 행위, 쉽게말해 컴퓨터가 그림을 그리고 있음을 나타내는 단어. 그것이 바로 오늘의 주제 **렌더링(Rendering)**이다.

## 렌더링(Rendering)

### 도와주세요 황석희님

"Render"란 단어는 번역하기 어렵다. 그냥 음차해 "렌더링" 이라고 말하는게 익숙하다. 굳이 우리말 순화 운동을 하려는건 아니지만, 그래도 바로 1:1 대응하는 단어가 존재하면 이해가 편하잖아. 아무튼 [네이버 사전](https://en.dict.naver.com/#/entry/enko/0d52204e03514a3f8a85ff07a03f5d2f)에선 단어 "render"에 대해 이렇게 설명하고 있다.

- (어떤 상태가 되게) 만들다[하다]
- (특히 어떤 것에 대한 대가로 또는 기대에 따라) 주다[제공하다]
- (특히 공식적으로) 제시[제출]하다
- **표현하다, 연기[연주]하다**
- (다른 언어로) 옮기다, 번역하다

"Render"는 똑같이 만들다란 의미를 가진 "make"와 비교하면 조금 더 고급진 표현이라고 한다. 만드는 주체가 독자적인 해석을 가미하거나, 어떤 가치를 더해 결과물을 만든다는 느낌에 가깝다. 영화 각본이나 클래식 악보를 보고, 감독과 지휘자가 자신만의 해석을 곁들여 작품으로 구현해내는 일에 어울리는 단어다.

![렌더링](https://i.postimg.cc/26tV2ZN7/image.png){:loading="lazy"}  
{: .center .rounded-edge-16}

이 설명을 컴퓨터 세계의 render에 대입해보자. 앞서 컴퓨터가 그림을 그리고 있음을 나타내는 단어가 렌더링(Rendering)이라고 했다. 컴퓨터는 그려야 하는 상황에 대한 정보를 입력받는다. 그 상황을 그린 그림을 결과물로 내보낸다. 입력과 출력 그 사이에 존재하는 과정을 사람들은 렌더링이라고 부른다. 아니 그냥 같은 입력이면 같은 결과물이 나와야하는거 아닌가? 컴퓨터가 무슨 해석을 한다고?

![비교](https://i.postimg.cc/gkrtZ1GZ/toon-shading-comparison.jpg){:loading="lazy"}  
{: .center}

렌더링이란 단어가 가장 많이 사용되는 3D 컴퓨터 그래픽을 예시로 들어보자. 두 토끼 그림엔 같은 재료(동일한 토끼 모델링, 동일한 조명)가 사용되었다. 하지만 두 결과는 확연히 다르다. 왼쪽은 그림자 묘사가 더 자세하지만, 그 자세함이 허접한 토끼 모델링을 더 부각한다. 오른쪽은 자세한 묘사가 줄어들면서 그림이 좀 더 만화적으로 보인다. 다른 렌더링 설정, 즉 그림을 그리는 각 컴퓨터들의 다른 해석이 가미되었기 때문에 같은 재료를 사용했지만 다른 결과물이 나온 것이다. 하지만 엄밀히 따지면 이게 컴퓨터가 알아서 해석을 한다는 이야기는 아니다. 해석의 진짜 책임은 컴퓨터 그래픽을 담당하는 엔지니어에게 달려있다. 그것이 바로 우리가 렌더링에 대해서 공부할 필요가 있는 이유.

### 근데 그걸 왜 웹 개발자가

<div class="center">
<iframe class="youtube-iframe" width="560" height="315" src="https://www.youtube.com/embed/shW9i6k8cB0?si=dD3NPvy1E2bkHK1R&amp;start=5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<br/>
<span>그래서 이런거 만들거냐구</span>
</div>

개인적으로 3D 그래픽 분야에 조금 관심이 있어서 한 번 엮어 봤는데, 이걸 웹 프론트엔드 개발자가 알아야 할 이유가 있을까? 물론 있지. 웹 개발을 할 때에도 렌더링이란 단어를 자주 접할 수 있다.

- Three.js 라이브러리의 `WebGLRenderer`  
  물론 이건 예시로 들었던 3D 컴퓨터 그래픽과 비슷한 물건이다. 관심 없으면 굳이 신경 쓸 필요까진...
- **Client Side Rendering(CSR)**과 **Server Side Rendering(SSR)**  
  각각 클라이언트 측과 서버 측에서, 무엇을 렌더링한다는 의미일까?
- 웹 브라우저의 **렌더링 과정**  

우린 **웹 브라우저(Web browser)**라는 존재에 대해 더 자세히 알 필요가 있다. 현대의 PC에서 웹 브라우저는 단순한 어플리케이션을 넘어, 컴퓨터 안에 존재하는 또다른 가상 컴퓨터의 위치에 있다고 말할 수 있을 것 같다. 웹 개발자의 결과물은 그 가상 환경 위에서 동작해야 한다. 다시말해 웹 개발자가 만든 웹 페이지는 웹 브라우저에서 잘 그려저야한다.

![프레임 차이](https://i.postimg.cc/tCNfMSTz/20170711024433-819334.gif){:loading="lazy"}  
15fps vs 60fps
{: .center .w-3-quarter .rounded-edge-16}

렌더링 성능을 측정하는 대표적인 지표로는 [FPS(Frames Per Seconds, 초당 프레임)](https://developer.mozilla.org/ko/docs/Glossary/FPS)가 있다. 컴퓨터가 1초 동안 그림을 몇 장이나 그릴 수 있는지를 나타내는 단위다. 그 숫자가 높을수록 화면의 움직임이 부드럽게 보인다. 그렇다고 마냥 높기만 하다고 좋은건 아니고, 그 숫자를 얼마나 잘 유지하느냐가 관건이다. 위 움짤에서도 왼쪽(15fps)은 귀엽고, 오른쪽(60fps)는 우아하다. 그런데 60fps로 움직여야 하는 화면이 갑자기 렌더링 과정의 오류로 인해 1~2초 정도 15fps로 떨어진다면 움직임이 어색하게 느껴질 것이다. 웹 브라우저는 기본적으로 웹 페이지를 60fps로 화면에 그려야 한다. 만약 우리가 만든 웹 페이지가 너무 복잡한 구조를 가진 탓에 스크롤을 한 번 했더니 화면 출력이 10fps까지 떨어진다면, 그 순간부터 렌더링은 웹 개발자가 신경 써야 하는 문제가 되는 것이다.

## 주소창에 URL을 입력하면 무슨 일이 일어나나요?

![주소창에 URL을 입력하면](https://i.postimg.cc/qvLWKn2P/whenurl.jpg){:loading="lazy"}  
[이미지 출처](https://www.buymeacoffee.com/wassimchegham/hey-102339)  
{: .center}

CS 단골 질문 중 하나다. 구글에 검색해보면 여러 블로그에서 DNS, HTTP, TCP 등등 네트워크 관련 용어에 집중해 해설한 내용들이 나온다. 물론 네트워크와 관련된 내용이 핵심이 맞다, 다만 그 과정의 마지막 부분도 중요한데 조금 짧게들 끝내더라고. 그 마지막 부분이 바로 웹 브라우저의 렌더링이다. [질문의 정답에 가까울 이 문서](https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work)를 보면 렌더(Render) 단락의 내용이 결코 적지 않을 것을 볼 수 있다. 지금부터 웹 브라우저가 네트워크 통신을 통해 얻어온 웹 페이지의 원재료들을 어떻게 완성하는지 알아보자.

### 브라우저 엔진(Browser Engine)

![엔진](https://i.postimg.cc/SKL0V5yD/IC-engine.jpg){:loading="lazy"}  
{: .center .rounded-edge-16 .w-half}

앞서 웹 브라우저를 컴퓨터 안에 존재하는 또다른 가상 컴퓨터라고 표현했다. 이 가상의 기계를 움직이게 만드는 가장 중요한 부품을 **브라우저 엔진(Browser Engine)**이라고 부른다. 웹 브라우저의 컴포넌트 중 브라우저 엔진이란 용어가 지칭하는 특정한 대상이 있지만, 상황에 따라 그것이 혼용되거나 오용되는 경우가 있어서 조금 헷갈릴 수 있다. 한 번 정리해보자.

[![자바스크립트 엔진과는 다르다](https://i.postimg.cc/FR47Y2Rv/image.png){:loading="lazy"}](https://en.wikipedia.org/wiki/Browser_engine){:target="_blank"}  
{: .center .rounded-edge-16 .w-half}

일단 "웹 브라우저에 존재하는 엔진"이라는 의미에서 **자바스크립트 엔진(JavaScript Engine)**과 묶어 부르는 방식으로 오용될 수 있다. 위키피디아에서도 그러지 말라고 이렇게 손수 알려주고 있다. **브라우저 엔진은 화면을 그리고 UI를 제어하는 역할을 수행한다.** 반면 자바스크립트 엔진은 웹 페이지에 달려있는 자바스크립트 소스코드를 실행하는 인터프리터다. 둘은 소프트웨어 공학의 기본 설계 원칙인 관심사의 분리 원칙에 따라 서로 구분되었다. 그리고 사실, 둘이 서로 동등한 수준에서 취급되는 컴포넌트는 아니다. 최근 웹 페이지에서 자바스크립트의 중요도가 너무 높아졌기 때문에 체감하기 어려울지도 모르겠지만, [자바스크립트 엔진을 비활성화 해도 사용자는 웹 페이지에 접속할 수 있다](https://www.google.com/search?q=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8+%EB%B9%84%ED%99%9C%EC%84%B1%ED%99%94){:target="_blank"}{: .a-not-colored}. 하지만 브라우저 엔진이 꺼진다면 웹 브라우저는 조금도 움직이지 않을 것이다.

![](https://i.postimg.cc/d1DbVNKB/layers.png){:loading="lazy"}  
웹 브라우저의 컴포넌트들
{: .center}  

브라우저 엔진에 대해 더 엄밀히 따졌을 때, "화면을 그리는" 컴포넌트와 "UI를 제어하는" 컴포넌트도 서로 분리된다. 여기서 화면을 직접 그리는 부분을 **렌더링 엔진(Rendering Engine)** 혹은 **레이아웃 엔진(Layout Engine)**이라고 부른다. UI와 렌더링 엔진 사이에서 교통 정리를 하는 부분을 브라우저 엔진이라고 부른다. 하지만 두 컴포넌트는 서로 강하게 결합되어 있기 때문에 함께 묶어 "브라우저 엔진"이라고 부르는게 일반적이다.

![대표 브라우저 엔진](https://i.postimg.cc/jj0K9XHk/0-I-8-CPu-SMOLx-Xm-CTB.png){:loading="lazy"}  
대표적인 브라우저 엔진들  
{: .center .rounded-edge-16 .w-3-quarter}

그리고 이런 브라우저 엔진은 각 웹 브라우저 개발 업체들이 직접 구현해뒀고, 실제로 우리가 사용하는 상용 웹 브라우저에 들어간다. 파이어폭스에선 **Gecko**, 사파리에선 **Webkit**, 그리고 크롬에선 그 Webkit을 기반으로 만든 **Blink** 엔진을 사용 중이다. 각 엔진들은 내부적으로 사용하는 구체적인 컴포넌트와 동작 흐름에 차이는 있지만, 웹 브라우저를 사용자 입력에 맞게 동작시키고 웹 페이지의 원재료를 사용해 화면을 그려낸다는 목적은 모두 동일하다.

### 브라우저의 렌더링 과정

![Gecko](https://i.postimg.cc/rmGRt468/gecko.jpg){:loading="lazy"}  
Gecko 엔진의 렌더링 과정  
{: .center}

![Webkit](https://i.postimg.cc/RhDS3C0S/webkit.jpg){:loading="lazy"}  
Webkit 엔진의 렌더링 과정  
{: .center}

그럼 브라우저 엔진이 어떻게 화면을 그려내는지 그 과정을 한 번 살펴보자. 설명하기 앞서, 위 사진처럼 브라우저 엔진들 사이에도 렌더링 과정에 차이가 조금씩 있다. 다만 전반적인 흐름은 비슷하기 때문에(사실상 동일한 단계인데 용어만 조금 다른 경우도 있고) 그 부분은 감안하고 보도록 하자.

#### 중요 렌더링 경로(Critical Rendering Path)

웹 브라우저가 소스 코드 형태의 웹 페이지를 화면에 픽셀로 렌더링하는 과정을 **[중요 렌더링 경로(Critical Rendering Path, CRP)](https://developer.mozilla.org/ko/docs/Web/Performance/Critical_rendering_path){:target="_blank"}**라고 부른다. CRP는 다음과 같은 공정으로 이루어져 결과물을 만들어낸다.

**파싱(Parse) -> 부착(Attachment) -> 레이아웃(Layout) -> 페인트(Paint) -> 합성(Composite)**  
{: .center .bold-middle}

**파싱(Parse)**  

![parse](https://i.postimg.cc/XJjtb4Dt/1parse.png){:loading="lazy"}  
{: .center}

CRP의 첫 번째 단계는 **파싱(Parse)**이다. 첫 번째 단계인 만큼 공정에 쓰일 원재료를 입력받는 위치이기도 한데, 여기서 원재료는 URL을 통해 요청한 웹 페이지의 **HTML 소스 코드**가 된다. 파싱 단게에서 브라우저 엔진은 HTML을 읽어 웹 페이지의 논리적인 구조, **문서 객체 모델(Document Object Model, DOM)**을 생성한다.  
HTML의 계층 구조를 나타낼 수 있도록 DOM은 트리 구조를 가진다. 파싱 과정에서 DOM 트리는 HTML 코드 가장 위에서 시작해 아래로, 다시말해 점진적으로 구축된다. 이 과정에서 `<link>`나 `<script>` 등 추가 외부 자원을 필요로 하는 태그를 찾을 때 마다 브라우저는 HTML의 파싱을 멈추고(이를 **렌더링 차단, Render blocking**이라고 한다) 자원 요청을 한 뒤 해당 자원에 대한 처리를 진행한다. 그 중 특히 스타일 시트, CSS에 대해서는 브라우저 엔진이 또 다른 파싱을 진행한다. 그 결과물은 웹 페이지의 스타일에 대한 논리적인 구조, **CSS 객체 모델(CSS Object Model, CSSOM)**이 된다. CSSOM 또한 역시 트리 구조를 가진다.

**부착(Attachment)**  

![attachment](https://i.postimg.cc/Gh3G6QnM/2attatchmant.png){:loading="lazy"}  
{: .center}

두 번째 단계는 여러 이름으로 불리는데, 자료에 따라 프레임 구축(Frame Construction), 스타일링(Style) 등의 이름을 가진다. 여기선 **부착(Attachment)**이라고 하자. 아무튼 중요한 것은 이 단계에서 무슨 일을 하느냐이다. 부착 단계에서 브라우저 엔진은 앞서 결과로 얻어낸 DOM에 CSSOM을 붙여 **렌더링 트리(Render Tree)**를 만든다. 렌더링 트리는 웹 페이지의 계층 구조와 스타일에 대한 정보를 한 데 담아두고 있기 때문에 이름대로 브라우저 엔진이 화면에 그림을 그리기 위한 핵심 재료가 된다. 따라서 화면에 그릴 필요가 없는 DOM 트리 노드들은 렌더링 트리 생성 과정에서 제외된다. 메타 정보나 외부 자원 정보가 담긴 `<head>` 태그, CSSOM에서 `display: none;` 속성이 확인된 노드들이 그 대상이 된다.

**레이아웃(Layout)**  

![layout](https://i.postimg.cc/K8yDFrHH/3layout.png){:loading="lazy"}  
{: .center}

앞선 단계에서 렌더링 트리를 만들면서 각 노드들에 스타일을 부여했다. 세 번째 단계인 **레이아웃(Layout)**에서는 부여된 스타일들의 상대적인 값을 절대적인 값으로 계산한다. CSS에서는 크기와 위치를 나타내는 다양한 단위들이 있는데, 대부분의 단위들은 웹 페이지의 여러 요소들에 대해 상대적인 값을 가진다. 예를 들어, `%`나 `vw`, `vh` 등의 단위는 상위 노드나 웹 브라우저의 현재 화면 영역(**뷰포트, Viewport**) 크기에 비례한 값을 가진다. `em`이나 `rem`은 상위 혹은 루트 노드의 폰트 크기에 비례한 값을 가진다. 레이아웃 단계에서 브라우저 엔진은 이런 상대값들의 절대적인 `px` 값을 계산해 화면에서 구체적으로 어떤 위치에 어떤 크기로 웹 페이지의 엘리먼트들이 배치되어야 하는지를 결정한다.

**페인트(Paint)**  

![paint](https://i.postimg.cc/hP9ZZJH8/4paint.png){:loading="lazy"}  
{: .center}

앞선 단계들을 거쳐 이제 렌더링의 대상이 자세히 정의되었다. 이 다음 단계는 **페인트(Paint)** 또는 **래스터화(Rasterization)**라고 부른다. 페인트는 우리가 흔히 사용하는 그 단어 그대로의 의미다. 래스터화는 컴퓨터 그래픽 렌더링에서 화면의 객체를 **픽셀(Pixel)**이라는 격자에 매핑하는 것을 의미한다. 이 단계에서는 레이아웃 단계에서 계산된 `px` 값을 이용해 브라우저 엔진이 렌더링 트리의 각 노드를 화면상의 실제 픽셀에 매핑하게 된다.

**합성(Composite)**  

![Composite](https://i.postimg.cc/sDV95SBb/5composite.png){:loading="lazy"}  
{: .center}

CRP의 마지막 단계는 자료마다 다르게 설명한다. 페인트가 마지막 단계인 자료도 있고, 한 단계를 더 설명하는 자료도 있다. 그 마지막 단계는 **합성(Composite)**단계이다. 합성 단계에서 브라우저 엔진은 페인트의 결과로 그려진 각 요소를 화면에서 합치는 연산을 수행한다. 이때 합쳐질 각 요소를 **레이어(Layer)**라고 부른다. 레이어는 무턱대고 많이 생성되는 것이 아니라 필요한 상황에만 생성된다. 레이어는 레이아웃 단계 이후에 **레이어 트리 업데이트(Update Layer Tree)**라는 추가 과정을 거친 다음 **레이어 트리(Layer Tree)**라는 자료 구조로 저장된다. 레이어를 만드는 기준에는 `z-index`로 대표되는 [쌓임 맥락(Stacking Context)](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)이나 `<canvas>`와 `<video>` 등 멀티미디어 자원을 나타내는 태그 등이 있다.  

마지막 단계에 대한 설명이 자료마다 다른 이유는 웹 페이지가 발전함에 따라 점점 더 복잡해졌고 브라우저가 거기에 대응하며 발전해왔기 때문이다. 엘리먼트간 겹침, 전체 웹 페이지 중 일부 엘리먼트만 이동 등 페이지를 구획화 해서 처리하는 것이 유리한 경우가 많아졌다. 그래서 현대 브라우저 엔진은 기존 CRP 과정에 "레이어 트리 업데이트"와 "합성" 단계를 새롭게 추가하게 되었고, 자료마다 내용이 조금씩 다른 이유도 이 때문인 것으로 추측된다.

#### 살아있는 웹 페이지

CRP는 웹 페이지의 소스 코드를 화면에 그리는 일련의 과정이다. 하지만 브라우저의 렌더링은 그것으로 끝이 아니다. 사용자 입장에서 웹 페이지는 계속 살아 움직여야 한다. 따라서 그림이 완전히 그려진 이후 이제 웹 브라우저는 초당 60장의 속도로 그림을 계속 화면에 그려야 한다. 내용이 변하지 않는 화면이라면 그렸던 그림을 계속 보여주고 있기만 해도 되겠지만, 웹 페이지는 사용자의 입력에 따라 언제든 변할 수 있다.  

이 블로그 글을 읽는 당신 처럼 화면에 스크롤을 입력하면 웹 페이지는 위 아래로 움직여야 한다. 블로그 상단에 나오는 프로그레스 바의 모양도 변해야 한다. 웹 브라우저의 윈도우 크기를 사용자가 조절해 뷰포트의 크기가 변할 수도 있다. 버튼을 누르면 없었던 엘리먼트가 화면에 새로 등장하기도 한다. 렌더링 트리는 웹 페이지가 동작하는 중 언제든지 변할 수 있다. 화면 변경에 대응해 화면을 다시 렌더링하는 두 과정을 **리플로우(Reflow)**와 **리페인트(Repaint)**라고 부른다. 이 두 과정은 CRP의 레이아웃과 페인트 과정과 같다.  

![update](https://i.postimg.cc/V6ThQwDt/6update.png){:loading="lazy"}  
{: .center}

**리플로우(Reflow)**  
리플로우는 레이아웃 단계부터 다시 진행하는 것을 의미한다. 뷰포트의 크기가 변경되면 `<body>` 태그 노드부터 그 크기에 영향을 받는 자식들까지 다시 그려야한다. 꼭 뷰포트가 아니라 렌더링 트리의 일부 노드가 변경되어도 그 자식들의 크기를 다시 계산해야한다.

**리페인트(Repaint)**  
리페인트는 이름처럼 페인트 단계부터 다시 진행하는 것을 의미한다. 리플로우 다음에는 항상 리페인트가 따라온다. 하지만 리플로우는 없이 리페인트만 발생할 수도 있다. 예를 들어 레이아웃에 영향을 주지 않는 배경 색상(`background-color`), 테두리(`outline`) 등의 CSS 속성 변화는 리페인트만 발생시킨다. 따라서 개발자는 필요에 따라 리플로우를 발생시키지 않고 리페인트만 발생시키는 속성을 선택할 수도 있다.

**합성만 발생시키기**  
앞서 말했듯이 현대 브라우저는 화면을 레이어로 나누어 처리하고 그 레이어를 합성(Composite)해 화면을 그린다고 했다. CSS 속성 중에는 레이어를 직접 조작해 리플로우와 리페인트 둘 다 발생시키지 않는 부류도 있다. 대표적으로 엘리먼트의 트랜지션을 구현하는데 사용하는 `transform` 속성이 있다. 쉽게 생각해 만약 엘리먼트의 위치 변경 때문에 리페인트가 발생할 경우, 기존 레이어 그림을 지우고 새 위치에 레이어 그림을 새로 다시 그리는 것이라고 생각하면 된다. 굳이 그럴 필요 없이 기존 레이어 그림의 위치를 변경하기만 하면 되는 방식이 `transform` 속성을 조작해 합성(Composite)만을 다시 발생시키는 방법인 것이다.

#### CSS 알고쓰자  

![CSS 알고쓰자](https://i.postimg.cc/QCJYrkRL/7css.png){:loading="lazy"}  
{: .center}

리플로우와 리페인트에 대한 설명을 보면 알 수 있듯이 CSS의 속성만 잘 써줘도 어느정도 렌더링 과정의 최적화가 가능해진다. 기능 구현에 어떤 속성을 선택할지 고려할 때 그 속성이 렌더링 과정에서 어떻게 관여하는지를 이해하는 것이 중요하다. 앞서 언급했던 **[쌓임 맥락(Stacking Context)](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context){:target="_blank"}**에 따라 레이어를 생성하는 CSS 속성들을 숙지해두면 도움이 될 것이다. 단순히 특정 속성을 쓰면 레이어가 생성되고 리플로우를 발생시키지 않을 수 있는 것이 아니라, 그럴 수 있는 조건이 만족되어야 하기 때문에 한 번 문서를 읽어 보는 것을 추천한다.

CSS에 대한 최적화는 이 뿐만이 아니다. 다음과 같은 최적화 작업이 추가로 가능하다.

- 선택자(Selector) 최적화  
  CSS는 한 번에 다양한 선택자를 조합해서 사용할 수 있다. 이 때 한 번에 사용된 선택자의 개수가 너무 많거나 트리 탐색에 불리한 구조일 경우 브라우저 엔진이 렌더링 트리를 생성하는데 시간이 더 소요된다. 다만 이에 대해 그것이 정말 큰 차이를 결정지을 정도인지를 묻는 의문의 목소리도 있기 때문에 지금 상황에 정말 필요한지 충분히 고려한 다음 시도하자.

- 렌더링 차단(Render Blocking) 회피  
  파싱 단계에서 HTML에 포함된 외부 자원 태그가 발견되면 렌더링은 차단되고 리소스를 처리하게 된다. CSS 파일 또한 렌더링을 차단하는 외부 자원에 해당된다. 만약 우리 웹 페이지가 반응형 디자인을 지원하고, 각 환경별 스타일이 서로 다른 CSS 파일에 작성되어 있다고 생각해보자. 노트북에서 웹 페이지를 접속했다고 하더라도 최초 페이지 렌더링 시 `<head>` 태그에서 발견된 `pc.css`, `mobile.css`를 모두 불러와 처리해야 렌더링이 진행된다. 이런 상황을 피하기 위해 CSS를 연결하는 `<link>` 태그에 `media` 속성을 사용해 최초 렌더링에서 필요한 CSS만 처리하도록 만들 수 있다.

#### 자바스크립트는 언제 실행될까?

웹 페이지의 3대 요소 중 하나인 자바스크립트는 렌더링 과정에서 어떤 영향을 끼칠까? 앞선 과정을 통해 알 수 있듯이 자바스크립트가 렌더링의 직접적인 대상이 되진 않는다. 대신 자바스크립트는 개발자가 렌더링 과정에 관여할 수 있도록 하는 수단이 된다. 개발자는 자바스크립트를 사용해 DOM과 CSSOM을 직접 조작할 수 있다.  

자바스크립트는 CSS 처럼 HTML 소스 코드 입장에서 외부 자원에 속한다. 파싱 단게에서 자바스크립트를 발견 시 렌더링 차단이 발생한다는 의미이다. 따라서 렌더링 과정에서 자바스크립트의 개입이 언제 일어나는지, 자바스크립트의 렌더링 차단을 회피하는 방법이 있는지에 대해 알아야 할 필요가 있다.

![자바스크립트는 언제 실행될까](https://i.postimg.cc/3JdhHPxG/8js.png){:loading="lazy"}  
{: .center}

**`<script>`**  
일반적인 경우 파싱 중 스크립트는 발견된 즉시 렌더링 차단을 발생시킨다. 간단한 샘플 HTML 페이지를 만들어 `<head>` 태그 안의 `<script>`에서 `<body>`의 엘리먼트를 가져오도록 코드를 작성하면 알 수 있을 것이다. 해당 스크립트에서는 `<body>`의 엘리먼트들에게 접근할 수 없다. 앞서 DOM 트리는 HTML을 위에서 아래로 읽어 점진적으로 생성된다고 말했다. 자바스크립트가 실행된 순간 렌더링의 파싱 단계가 중지되고, 아직 아래쪽에 있는 엘리먼트에 해당되는 노드가 DOM 트리에 생성되지 않았기 때문에 스크립트에서 접근할 수 없는 것이다.

**`<script defer>`**  
하지만 자바스크립트를 굳이 발견되는 순간에 실행하는 것이 아니라 실행 순서를 뒤로 미룰 수도 있다. `<script>` 태그에 `defer` 속성을 추가할 경우, 해당 스크립트는 파싱 완료 후 DOM이 완성되었을 때 실행된다. `defer` 태그가 적용된 외부 스크립트가 HTML 파싱 과정에서 발견될 경우 렌더링은 차단되지 않고 브라우저는 백그라운드에서 네트워크 통신을 통해 해당 리소스를 가져오게 된다. `defer` 스크립트들은 다운로드만 백그라운드에서 병렬적으로 진행되고 실행은 동기적으로 진행되기 때문에 발견된 순서대로 실행된다.

**`<script async>`**  
`<script>` 태그에 `async` 속성을 추가할 경우 `defer` 속성처럼 스크립트 발견 즉시 백그라운드에서 병렬적으로 스크립트를 다운로드 받게 된다. 하지만 `async`의 경우 이 다운로드가 완료되는 즉시 스크립트를 실행한다. 이름처럼 `async` 스크립트들은 비동기적으로 실행된다. `async` 스크립트들은 모두 독립적으로 실행되기 때문에 여러 `async` 스크립트들을 사용할 경우 그 흐름을 제어하는 것이 중요하다.

다만 두 속성 모두 공통적으로 주의해야 할 점이 있다. 자바스크립트가 실행되는 순간 HTML 파싱은 멈춘다. 자바스크립트가 DOM을 조작할 수 있도록 하려면 그 DOM이 해당 모듈의 실행 중 변해선 안되기 때문이다. `defer`와 `async` 모두 자바스크립트 실행을 뒤로 미루는 것이지 실행 자체가 파싱과 병렬적으로 이루어지도록 만드는 속성은 아니다. 또한 그렇기 때문에 두 속성 모두 `src` 속성이 정의된 외부 스크립트에서만 유의미한 결과를 만든다.

## CSR? SSR?

[![엔지니어들이란](https://i.postimg.cc/Ss0gzJB6/ohman.png){:loading="lazy"}  
정말 엔지니어들은 용어를 맥락따라 다르게 쓰는걸 좋아한단 말이야.😒](https://stackoverflow.com/questions/46169376/whats-the-difference-between-a-browser-engine-and-rendering-engine){:target="_blank"}
{: .center .rounded-edge-16 .w-3-quarter}

지금까지 웹 브라우저의 렌더링 과정에 대해서 장황하게 설명을 해봤다. 여기서부턴 사족 혹은 여담에 가깝다. 위 내용들이 사실 이 글의 핵심이기도 하고. 아무튼, 웹 개발 분야에서 렌더링이란 단어가 다른 맥락에서 발견될 때가 있다. 

- **Client Side Rendering(CSR)**과 **Server Side Rendering(SSR)**  

웹 프론트엔드를 개발 할 때 접할 수 있는 두 용어 CSR과 SSR이다. 여기서 말하는 렌더링은 앞서 말한 브라우저의 렌더링과는 다른 입력과 출력을 가진다. 각각 클라이언트 측과 서버 측에서, 무엇을 렌더링한다는 의미일까? 일단 그 질문에 대한 대답을 잠시 접어두고 두 개념에 대해 정리해보자.

### CSR

**클라이언트 측 렌더링(Client Side Rendering, CSR)**은 클라이언트 측에서 HTML을 생성하는 방식을 의미한다. 초기에 웹 서버로부터 빈 HTML 파일과 웹 어플리케이션에 대한 정보가 담긴 자바스크립트 파일을 받아온 후, 클라이언트가 그 자바스크립트를 실행해 HTML을 동적으로 생성하고 렌더링하는 방식이다. 이 방식은 초기 화면 로딩 속도가 느릴 수 있지만, 한 번 페이지가 로드된 후에는 새로운 페이지 요청 없이 클라이언트 측에서 빠르게 화면을 전환할 수 있다. 하지만 동적으로 웹 페이지가 만들어지고 검색 엔진의 크롤러들은 그에 대응하기 어렵기 때문에 **검색 엔진 최적화에 불리**하단 단점이 있다.

### SSR

**서버 측 렌더링(Server Side Rendering, SSR)**은 웹 서버 측에서 클라이언트의 요청이 있을 때 마다 해당 페이지를 완전히 생성해 전달하는 방식이다. 이 방식은 초기 로딩 속도가 빠르고 검색 엔진에게도 웹 페이지 내용에 부합하는 `<meta>` 태그를 제공할 수 있기 때문에 **검색 엔진 최적화에 유리**한 장점이 있다. 하지만 사용자 요청에 따라 매번 서버가 새 페이지를 렌더링해야 하므로 서버 부하가 커질 수 있다.

### 웹 어플리케이션 렌더링

![CSR vs SSR](https://i.postimg.cc/vBrSkcHY/9warender.png){:loading="lazy"}  
{: .center}

이 맥락에서 렌더링은 웹 어플리케이션의 소스 코드가 HTML/CSS/JS로 이루어진 웹 페이지로 변환되는 과정을 의미한다. 렌더링이라고 하지만 빌드라고 표현하는게 더 적합하지 않을까 생각하고는 있는데, 왜 굳이 그렇게 이름을 붙였는지에 대해서는 GPT와 열심히 토론 중이지만 마땅한 답이 나오진 않는다. 이에 대해 명쾌한 설명이 가능한 분께선 그 고견을 아래쪽 댓글창에 달아주십사...

아무튼 단순히 그 단어를 뜯어보는 것을 넘어 그 단어가 사용된 맥락을 파악하는 것이 더 중요할 때도 있다는 것을 알아두자.

## 마무리

[![뽀모도로](https://i.postimg.cc/VLFLykgd/pomodoro.png){:loading="lazy"}](https://domado.vercel.app/){:target="_blank"}  
틈새 끼워팔기
{: .center .w-3-quarter .rounded-edge-16}

이건 최근에 내가 만들어 본 뽀모도로 타이머 웹앱이다. 아직 모바일 페이지는 지원하지 않는다. 아무튼 중요한건 그게 아니라, 이 타이머를 내 노트북에서 사용하는 중 발견한 증상이 있다. 왼쪽은 윈도우에서 제공하는 화면 캡쳐 기능으로 찍은 스크린샷이다. 오른쪽은 내 휴대폰의 카메라를 이용해 노트북 화면을 찍은 사진이다. 화면 중앙의 타이머 영역이 천천히 왼쪽으로 이동하는데, 그 영역의 색상이 실제 화면에서는 오른쪽 처럼 미묘하게 깨져서 나타나는 것이다.

이 증상은 노트북에 전원을 연결하지 않았을 때 나타난다. 즉, 렌더링을 수행하는 연산 장치의 파워 절약이 웹 페이지에 직접적으로 영향을 주고 있다는 것이다. 타이머를 움직이는 것이 브라우저 엔진 입장에서 꽤 무거운 연산이었기 때문에. 이 증상이 이 글에 대한 아이디어를 던져줬던 것 같다. 웹 페이지는 날이 갈수록 화려해지고 있지만, 그 화려함을 만드는 비용은 생각보다 비싸다. 요구사항을 구현해야 하는 엔지니어의 입장으로써 그 트레이드 오프를 더 잘 다룰 수 있도록 열심히 공부하자.

그리고 이번 글은 정말 오래 걸렸다. 연말연초에 몸과 마음 상할 일이 너무 많긴 했다. 1월 중에 이 글을 포스팅하는게 목표였는데 어느덧 2월이구나. 글을 작성하는 기간이 길어지니까 자연스럽게 참고한 자료도 많아졌는데, 일단 아래에 이렇게 첨부해 놓겠다. 사실 전부 다 정독하진 않았고, 몇개는 그냥 뺄까 싶었는데 그냥 다 놔두기로 했다. 심심하면 뽑기 하듯이 몇개만 골라서 읽어보자. 예상치도 못한 좋은 정보를 얻을지도 모른다.

- [웹페이지를 표시한다는 것](https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work)
- [웹 브라우저의 렌더링 프로세스](https://cresumerjang.github.io/2019/06/24/critical-rendering-path/)
- [ToastUI(NHN Cloud FE) 블로그, 성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
- [CSS Engine, Quantum CSS, 그림이 마음에 듬](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/)
- [Navigation Timing API, 더 정확한 웹 사이트 성능 측정 API](https://developer.mozilla.org/ko/docs/Web/API/Performance_API/Navigation_timing)
- [Understanding the critical path, web.dev](https://web.dev/learn/performance/understanding-the-critical-path?hl=en)
- [웹에서 렌더링](https://web.dev/articles/rendering-on-the-web?hl=ko)
- [최신 브라우저 내부 살펴보기 1 - CPU, GPU, 메모리 그리고 다중 프로세스 아키텍처](https://d2.naver.com/helloworld/2922312)
- [RenderingNG](https://meetup.nhncloud.com/posts/293)
- [CSS Transform vs Position](https://stackoverflow.com/questions/7108941/css-transform-vs-position)
- [How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm#The_rendering_engine)
- [oh man, engineers like using terms differently for different contexts](https://stackoverflow.com/questions/46169376/whats-the-difference-between-a-browser-engine-and-rendering-engine)
- [크롬 브라우저는 어떻게 웹사이트를 화면에 그리나요?](https://blog.areumsheep.vercel.app/contents/how-browser-works/)
- [웹 브라우저의 작동 원리.md](https://github.com/im-d-team/Dev-Docs/blob/master/Browser/%EC%9B%B9%20%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98%20%EC%9E%91%EB%8F%99%20%EC%9B%90%EB%A6%AC.md), [Layer_Model.md](https://github.com/im-d-team/Dev-Docs/blob/master/Browser/Layer_Model.md)
- [How does browser work step by step [latest] — rendering phase (part 3)](https://cabulous.medium.com/how-does-browser-work-in-2019-part-iii-rendering-phase-i-850c8935958f)
- [Understanding Reflow and Repaint in the browser](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg)
- [[CSS] opacity는 reflow가 발생 안 한다구요...? 정말??](https://blinders.tistory.com/93)
- [Gecko:Overview](https://wiki.mozilla.org/Gecko:Overview)
- [defer, async](https://ko.javascript.info/script-async-defer)
- [이쪽 주제의 바이블 같은 존재](https://d2.naver.com/helloworld/59361)

그리고 요즘 글 쓸때 GPT의 도움을 상당히 많이 받는다. 특히 [뤼튼](https://wrtn.ai/)이란 서비스를 통해 GPT를 사용하고 있다. 몇 달 전에 온라인 스터디 들어갔다가 우연히 알게 된 서비스인데, 좋은건 널리 알려야지.

![소마 제15기](https://i.postimg.cc/J0gM31xN/image.png){:loading="lazy"}
{: .center}  

진짜 마지막으로, 잊을만하면 한 번씩 메일을 보내 내 메일함에서 그 존재감을 뽐내는 소프트웨어 마에스트로가 어느덧 벌써 15기 연수생을 모집하고 있다. 그래도 나름 이거 해서 작년도 먹고 살 수 있었다. 혹시라도 이 글을 본 사람 중에 지원자격이 되는 사람이 있다면 아주 좋은 기회니까 너무 부담가지지 말고 도전해보자.
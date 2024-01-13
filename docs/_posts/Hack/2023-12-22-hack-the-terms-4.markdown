---
layout: post
title: "Hack🪓 the #4 Rendering"
description: 
date: 2023-12-22 10:49:00 +0900
categories: [Hack]
---

## 솜씨좋은 일꾼, 컴퓨터

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

렌더링이란 단어가 가장 많이 사용되는 3D 컴퓨터 그래픽을 예시로 들어보자. 두 토끼 그림엔 같은 재료(동일한 토끼 모델링, 동일한 조명)가 사용되었다. 하지만 두 결과는 확연히 다르다. 왼쪽은 그림자 묘사가 더 자세하지만, 그 자세함이 허접한 토끼 모델링을 더 부각한다. 오른쪽은 자세한 묘사가 줄어들면서 그림이 좀 더 만화적으로 보인다. 서로 다른 렌더링 설정, 즉 그림을 그리는 컴퓨터의 서로 다른 해석이 가미되었기 때문에 같은 재료를 사용했지만 다른 결과물이 나온 것이다. 하지만 엄밀히 따지면 이게 컴퓨터가 알아서 해석을 한다는 이야기는 아니다. 해석의 진짜 책임은 컴퓨터 그래픽을 담당하는 엔지니어에게 달려있다. 그것이 바로 우리가 렌더링에 대해서 공부할 필요가 있는 이유.

### 근데 그걸 왜 웹 개발자가

<div class="center">
<iframe class="youtube-iframe" width="560" height="315" src="https://www.youtube.com/embed/shW9i6k8cB0?si=dD3NPvy1E2bkHK1R&amp;start=5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<br/>
<span>그래서 이런거 만들거냐구</span>
</div>

개인적으로 3D 그래픽 분야에 조금 관심이 있어서 한 번 엮어 봤는데, 이걸 웹 프론트엔드 개발자가 알아야 할 이유가 있을까? 물론 있지. 웹 개발을 할 때에도 렌더링이란 단어를 자주 접할 수 있다.

- Three.js 라이브러리의 `WebGLRenderer`  
  물론 이건 예시로 들었던 3D 컴퓨터 그래픽과 똑같은 물건이다. 관심 없으면 굳이 신경 쓸 필요까진...
- **Client Side Rendering(CSR)**과 **Server Side Rendering(SSR)**  
  각각 클라이언트 측과 서버 측에서, 무엇을 렌더링한다는 의미일까?
- 웹 브라우저의 **렌더링 엔진**  

우린 **웹 브라우저(Web browser)**라는 존재에 대해 더 자세히 알 필요가 있다. 현대의 PC에서 웹 브라우저는 단순한 어플리케이션을 넘어, 컴퓨터 안에 존재하는 또다른 가상 컴퓨터의 위치에 있다고 말할 수 있을 것 같다. 웹 개발자의 결과물은 그 가상 환경 위에서 동작해야 한다. 웹 개발자가 만든 웹 페이지는 웹 브라우저에서 더 잘 그려저야한다.

![프레임 차이](https://i.postimg.cc/tCNfMSTz/20170711024433-819334.gif){:loading="lazy"}  
15fps vs 60fps
{: .center .w-3-quarter .rounded-edge-16}

렌더링 성능을 측정하는 대표적인 지표로는 **FPS(Frames Per Seconds, 초당 프레임)**가 있다. 컴퓨터가 1초동안 그림을 몇 장이나 그릴 수 있는지를 나타내는 단위다. 그 숫자가 높을수록 화면의 움직임이 부드럽게 보인다. 그렇다고 마냥 높기만 하다고 좋은건 아니고, 그 숫자를 얼마나 잘 유지하느냐가 관건이다. 위 움짤에서도 왼쪽(15fps)은 귀엽고, 오른쪽(60fps)는 우아하다. 그런데 60fps로 움직여야 하는 화면이 갑자기 렌더링 과정의 오류로 인해 1~2초 정도 15fps로 떨어진다면 움직임이 어색하게 느껴질 것이다. 웹 브라우저는 기본적으로 웹 페이지를 60fps로 화면에 그려야 한다. 만약 우리가 만든 웹 페이지가 너무 복잡한 구조를 가진 탓에 스크롤을 한 번 했더니 화면 출력이 10fps까지 떨어진다면, 그건 웹 개발자가 신경을 써야 하는 문제가 되는 것이다.

[![뽀모도로](https://i.postimg.cc/VLFLykgd/pomodoro.png){:loading="lazy"}](https://domado.vercel.app/){:target="_blank"}  
{: .center .w-3-quarter .rounded-edge-16}

뽀모도로 타이머의 그래픽 깨짐 효과. css를 사용한 트렌지션 구현 시 CPU가 관여하는 속성이 있고 GPU가 관여하는 속성이 있음.

이하 GPT의 요약.

>웹 페이지의 렌더링 과정을 이해하는 것은 프론트엔드 개발자에게 매우 중요한 부분입니다. 이에는 여러 가지 이유가 있습니다:
1. 성능 최적화: 렌더링 과정을 이해하면, 웹 페이지의 로딩 속도를 향상시키고, 사용자 경험을 개선하는 데 도움이 됩니다. 예를 들어, 불필요한 리플로우나 리페인트를 방지하거나, CSS와 JavaScript를 효과적으로 활용하여 렌더링 성능을 최적화할 수 있습니다.
2. 복잡한 UI 구현: 렌더링 과정을 이해하면, 복잡한 사용자 인터페이스를 구현하는 데 필요한 기술을 더 잘 이해하고 활용할 수 있습니다. 예를 들어, 애니메이션, 스크롤 이벤트, 레이아웃 변경 등의 기능을 구현할 때 이해력이 필요합니다.
3. 크로스 브라우징 이슈 해결: 브라우저마다 렌더링 엔진이 다르기 때문에, 동일한 웹 페이지가 브라우저마다 다르게 보일 수 있습니다. 렌더링 과정을 이해하면 이러한 크로스 브라우징 이슈를 더 잘 해결할 수 있습니다.
4. 프로그래시브 웹 앱 (PWA) 개발: 최근에는 웹 앱이 네이티브 앱과 같은 사용자 경험을 제공하려는 추세입니다. 이를 위해서는 웹 페이지의 렌더링 과정을 이해하고 최적화하는 것이 중요합니다.  
결과적으로, 프론트엔드 개발자가 웹 페이지의 렌더링 과정을 깊게 이해하고 있으면, 더 나은 사용자 경험을 제공하고, 더 효과적인 코드를 작성할 수 있습니다.


## 웹 브라우저의 웹 페이지 렌더링
주소창에 URL을 입력했을 때 어떤 일이 일어나나요? 의 뒷부분에 해당되는 이야기

### Rendering Engine

Javascript Engine과 **Rendering Engine**

### 브라우저의 렌더링 과정 살펴보기

CRP

## CSR? SSR?
SSR, CSR의 렌더링.

개인적으로 용어의 혼란을 야기할만한 부분 같은데... 

### CSR

### SSR

----
# 키워드 던져놓기

- **확실하게 정하고 갈 부분**  
- render라는 용어는 여러 분야에서 등장하는데 정확하게 어떤 분야에서의 render에 집중할 것인가.
  - 보편적인 단어 render
  - CG에서의 render
  - Web 개발 환경에서의 render
    - SSR, CSR의 render
    - 웹 브라우저의 render
    - 위 둘의 차이는?

- render
  - **만들다**, 주다, 제시하다.
  - (어떤 상태가 되도록) 만들다
  - to cause (someone or something) to be in a specified condition
  - 원자재를 가지고 결과를 만들어내는 행위
    - source -[Renderer]-> result
- rendering
  - 1. (특정한 해석을 가미한) 연주 2. 번역 3. (벽돌벽·석벽 등에 하는) 회반죽 칠
  - 단순 변화보단 그 과정에 어떠한 특색 or 개성이 가미되는 변화?
    - ex. cartoon rendering, 브라우저마다 다른 기본 UI 형태 등.

- CG에서의 render
  - render라는 단어가 가장 직관적으로 사용되는 분야?
  - render, scene(w/ mesh, 그리고 자연 현상들), camera

- SSR, CSR
  - 소스 코드 -[Renderer]-> 웹 페이지(HTML/CSS/JS)
  - Client side rendering
    - 클라이언트가 최초에 전달받은 Javascript(소스 코드)에 정의된대로 HTML 페이지를 만듬
    - 동적 렌더링
  - Server side rendering
    - 요청에 따라 서버에서 미리 HTML을 만들어서 전달해줌
    - 그 이후 hydration이란 과정을 거쳐 웹 페이지를 동적으로 만듬.

- 위 렌더링의 결과물을 웹 브라우저의 렌더링 엔진이 렌더링
  (헷갈리는 포인트, 렌더링의 결과물을 렌더링, 의미적으로 안될건 없음.)

- Rendering in web browser.
  - Browser의 엔진들: **Rendering Engine**, Javascript Engine.  
  - [CRP](https://developer.mozilla.org/ko/docs/Web/Performance/Critical_rendering_path)  
    - DOM (HTML 해석의 결과물)  
    - CSSOM (Stylesheet 해석의 결과물)  
    - Render Tree (DOM + CSSOM)  
  - 프레임 속도 (Frame rate, FPS)  
  > **프레임 속도(FPS)**는 브라우저가 콘텐츠를 다시 계산하고, 레이아웃을 설정하고 디스플레이에 그릴 수 있는 속도입니다. **초당 프레임 수(frames per second, fps)**는 1초에 다시 칠할 수 있는 프레임 수입니다. 웹사이트 컴퓨터 그래픽의 목표 프레임 속도는 **60fps**입니다.
  - 결과적으로 앞서 말한 CG에서의 render와 비슷한 의미. 웹 페이지라는 그림을 60fps로 화면에 뿌리는 작업  
  - **웹 어플리케이션의 성능과 직결되는 문제**  

# Refs

- [웹 브라우저의 렌더링 프로세스](https://cresumerjang.github.io/2019/06/24/critical-rendering-path/)
- [ToastUI(NHN Cloud FE) 블로그, 성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE#1-%ED%8C%8C%EC%8B%B1)
- [CSS Engine, Quantum CSS, 그림이 마음에 듬](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/)
- [Navigation Timing API, 더 정확한 웹 사이트 성능 측정 API](https://developer.mozilla.org/ko/docs/Web/API/Performance_API/Navigation_timing)
- [Understanding the critical path, web.dev](https://web.dev/learn/performance/understanding-the-critical-path?hl=en)
- [웹에서 렌더링](https://web.dev/articles/rendering-on-the-web?hl=ko)
- [최신 브라우저 내부 살펴보기 1 - CPU, GPU, 메모리 그리고 다중 프로세스 아키텍처](https://d2.naver.com/helloworld/2922312)
  - 이 시리즈 전체를 한 번 읽어볼 필요가 있음. 3번 글도 중요해보임.
- [RenderingNG](https://meetup.nhncloud.com/posts/293)
  - 공부는 세상의 해상도를 높이는 일이라고, 웹 브라우저의 렌더링 과정에 대한 이해가 정말 필수불가결한 그런 지식까진 아니지만 이렇게 멋진 자료를 찾을 수 있는 계기가 될 수도 있다는말.
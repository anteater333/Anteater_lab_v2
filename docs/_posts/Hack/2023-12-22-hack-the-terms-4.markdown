---
layout: post
title: "Hack🪓 the #4 Rendering"
description: 
date: 2023-12-22 10:49:00 +0900
categories: [Hack]
---

## 서론

콤퓨타라는게 인간이 만든 전자 노예.

[디스플레이의 발전을 나타내는 짤방]

디스플레이의 발전과 함께 대두된 그림 노예의 필요성 (GPU, GUI)

Rendering이란 단어에 대해

Rendering이란 단어가 사용되는 예시들

당연히 모든 Rendering에 대해 상소히 다뤄볼 계획은 아니다. 본인은 영문학자도 아니고, CG 엔지니어도 아니고, 웹 개발자. 

## 웹 개발에서 만날 수 있는 렌더링

웹 환경에서의 렌더링

threejs - 이건 CG에서의 렌더링이니까 생략
SSR, CSR의 렌더
웹 브라우저의 렌더

## CSR? SSR?
SSR, CSR의 렌더링.

개인적으로 용어의 혼란을 야기할만한 부분 같은데... 

### CSR

### SSR

## 웹 브라우저의 웹 페이지 렌더링
주소창에 URL을 입력했을 때 어떤 일이 일어나나요? 의 뒷부분에 해당되는 이야기

### Rendering Engine

Javascript Engine과 **Rendering Engine**

### 브라우저의 렌더링 과정 살펴보기

CRP

## 렌더링을 신경써야 하는 이유

FPS 이야기. 브라우저의 개발자 도구를 통해 확인 가능.
 - 크롬에선 실시간 확인
 - 파이어폭스는 기록해서 확인 가능

게임을 할 때 FPS를 유지하기 위해 하드웨어를 업그레이드 하는 경험.  

이 렌더링이 얼마나 빠르게, 얼마나 안정적인 FPS로 렌더링되느냐가 웹 페이지의 성능 지표 중 하나.

이하 GPT의 요약.

>웹 페이지의 렌더링 과정을 이해하는 것은 프론트엔드 개발자에게 매우 중요한 부분입니다. 이에는 여러 가지 이유가 있습니다:
1. 성능 최적화: 렌더링 과정을 이해하면, 웹 페이지의 로딩 속도를 향상시키고, 사용자 경험을 개선하는 데 도움이 됩니다. 예를 들어, 불필요한 리플로우나 리페인트를 방지하거나, CSS와 JavaScript를 효과적으로 활용하여 렌더링 성능을 최적화할 수 있습니다.
2. 복잡한 UI 구현: 렌더링 과정을 이해하면, 복잡한 사용자 인터페이스를 구현하는 데 필요한 기술을 더 잘 이해하고 활용할 수 있습니다. 예를 들어, 애니메이션, 스크롤 이벤트, 레이아웃 변경 등의 기능을 구현할 때 이해력이 필요합니다.
3. 크로스 브라우징 이슈 해결: 브라우저마다 렌더링 엔진이 다르기 때문에, 동일한 웹 페이지가 브라우저마다 다르게 보일 수 있습니다. 렌더링 과정을 이해하면 이러한 크로스 브라우징 이슈를 더 잘 해결할 수 있습니다.
4. 프로그래시브 웹 앱 (PWA) 개발: 최근에는 웹 앱이 네이티브 앱과 같은 사용자 경험을 제공하려는 추세입니다. 이를 위해서는 웹 페이지의 렌더링 과정을 이해하고 최적화하는 것이 중요합니다.  
결과적으로, 프론트엔드 개발자가 웹 페이지의 렌더링 과정을 깊게 이해하고 있으면, 더 나은 사용자 경험을 제공하고, 더 효과적인 코드를 작성할 수 있습니다.

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
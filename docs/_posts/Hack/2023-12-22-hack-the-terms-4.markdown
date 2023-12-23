---
layout: post
title: "Hack🪓 the #4 Render"
subtitle: 
description: 
date: 2023-12-22 10:49:00 +0900
categories: [Hack]
---



----
# 키워드 던져놓기

**확실하게 정하고 갈 부분**  
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
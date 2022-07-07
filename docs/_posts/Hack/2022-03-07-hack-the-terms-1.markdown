---
layout: post
title: "Hack🪓 the #1 의존성 주입"
date: 2022-03-07 18:50:00 +0900
categories: [Hack]
---

## 신제품 출시 !!

![겁질-미리깐-블로그](https://i.postimg.cc/t4mvmJkt/image.jpg)
{: .center}

블로그를 간헐적으로 가지고 놀면서 깨달은 한 가지 사실: 어... 왜 글이 "자잘한 도움말" 밖에 없지..? 그래서 새로운 카테고리를 만들었다.

**Hack🪓 the terms!**
{: .center .middle-big}

이 새로운 카테고리에선 **용어**를 뜯어보자는 목표 아래 한 가지 주제를 정하고 거기에 대해서 심층적인 분석을 수행해보려한다. 하지만 언제나 그렇듯이 글재주는 부족하기 때문에 정보들이 산발적으로 난사되는 형식으로 남겨지지 않을까. 사실 과연 심층적이긴 할지도 모르겠다. 힘 닿는대로 해보자.

## (대)학창 시절에,

본인은 알고리즘엔 알러지가 있는 사람이었다. 사실 아직도 있다. 주변에선 알고리즘 분야에서 저명한 교수님을 따라가 강의도 듣고 그러던데, 나는 그리 내키진 않더라. 그 대신 관심이 있었던 분야가 있었으니, 바로 **소프트웨어 공학**이다.

![야그니](https://i.postimg.cc/CKpQg523/yagni.png)  
그리고 상시 우매봉 상태라 항상 이런다.
{: .center}

헤드 퍼스트 디자인 패턴을 가지고 거기 있는 코드를 싹다 C#으로 구현해가며 공부하기도 했고.. 이번에 잔뜩 얻게 된 책들 중에서 굳이 클린 아키텍처를 첫 번째 읽을 거리로 고르기도 했고.. 만성적인 자존감 부족 때문에 자기 자랑이 서툴긴 하지만, 아무튼 어느 정도는 이쪽에서 수박 겉핥기라도 하고 있다고 생각 중이다. 허나 이 글을 작성하기 시작한 이유, "나는 실증하고 있는가?" 라는 불안이 생겨나고 있다는 것.

첫 번째 주제, **의존성 주입(Dependency Injection, DI)**{: .middle-big}. 사실 이게 뭔지 어느 정도 알고는 있다. 심지어 작년 프로젝트를 진행하는 동안 실제로 사용도 했다. 하지만 내가 겪은 어떠한 문맥들에서, 이 용어는 나를 아주 혼란스럽게 만들었고, 그 이유에 대해 글을 써보려고 한다.

## 의존성 주입, Dependency Injection

![Injection Shot](https://i.postimg.cc/HnTx3q1R/injection.gif)  
간단하게 말해서, 쑤셔 넣겠다는 거다.
{: .center}

> In software engineering, dependency injection is a technique in which an object receives other objects that it depends on, called dependencies. Typically, the receiving object is called a client and the passed-in ('injected') object is called a service. The code that passes the service to the client is called the injector. Instead of the client specifying which service it will use, the injector tells the client what service to use. The 'injection' refers to the passing of a dependency (a service) into the client that uses it.  
> [https://en.wikipedia.org/wiki/Dependency_injection](https://en.wikipedia.org/wiki/Dependency_injection)

소프트웨어 공학에서 의존성 주입이란, 한 객체가 자신이 **의존할 다른 객체**(주: 즉 두 객체 사이엔 개념적으로 **의존성**이 존재한다고 볼 수 있다.)를 전달 받도록 하는 기법이다. 일반적으로 받는 쪽의 객체는 클라이언트, 주입될 객체는 **서비스** 라고 부른다. 서비스를 클라이언트에게 전달하는 코드는 인젝터라고 부른다. 클라이언트가 어떤 서비스를 사용할지 명시하는 대신, 인젝터가 클라이언트에게 어떤 서비스를 쓰면 되는지 말해준다. **"주입"**은 클라이언트가 사용하게 될 의존성을 전달하는 것을 의미한다.

의존할 다른 객체 = 서비스 = 의존성
{: .center .middle-big}

클라이언트에게 쑤셔 넣겠다는 건데, 의존성을 쑤셔 넣겠다는 말이다. 의존성을 서비스라고 지칭하는 것이 좀 더 이해에 도움이 될 것 같은데, 위키피디아에선 다음과 같은 멋진 비유를 사용한다.

- **서비스**, **인터페이스**, **클라이언트**, **인젝터**. 총 네가지 역할이 존재한다.
- 서비스는 자동차다.
  - 전기, 가스, 하이브리드, 디젤 모두 가능하다.
- 인터페이스는 자동 변속기다.
  - 운전자는 자동차가 어떤 방식으로 엔진을 돌리는지 알 필요 없이 주행할 수 있다.
- 클라이언트는 운전자다.
  - 2종 자동. 왼손엔 핸들 오른손엔 레버. 능히 자동차를 몰 수 있다.
- 인젝터는 차를 사준 부모님이다.
  - 주머니 사정, 연비 등을 따져서 가장 적합한 차를 운전자에게 사준다.

## 백문이 불여일견

![으존성](https://i.postimg.cc/4Nq5QqmQ/image.png)  
여기 아주 간단한 **의존성이 있다.**
{: .center}

Client는 Service를 사용한다. 클라이언트는 서비스에 의존한다. 이런 형태의 의존은 둘 사이에서 아주 강한 결합도를 가지게 만든다. 마치 운전자가 전기 자동차의 회로를 직접 건드려가며 변속하는 것과 같다. 이 상태론 아직 의존성이 주입됐다고 볼 순 없다. 의존성이 있을 뿐.

```csharp
public class Client {

  /* Composition, Client 객체 안에서 사용할 private Service 인스턴스 변수 */
  private ConcreteService service;

  /* 생성자 */
  public Client() {
    /* 구체적인 Service의 인스턴스를 생성자에서 할당 */
    service = new ConcreteService();
  }

  /* Service의 사용 */
  public int makeSomething() {
    /* Some logics */
    return this.service.serve();
  }
}
```

우리는 위의 코드에서, `ConcreteService` 클래스가 변경되어도 `Client` 클래스는 아무렇지 않도록 만들어야 하고, 새로운 서비스로 바꾸기도 쉽도록 만들어야 한다. 이때 자주 쓰이는 방법이 바로 인터페이스를 사용하는 것이다.

![편안](https://i.postimg.cc/Znj1HDj4/image.png)  
편ㅡ안
{: .center}

사실 이렇게 인터페이스를 분리하기만 한걸로 의존 관계가 완벽히 해소된건 아니다. 인터페이스는 다만 첫 단계 정도. 결국 `Client` 클래스 안에 아직 변수 `service`가 남아있고, 여전히 이곳에 인스턴스는 담겨야 한다. 만약 새로운 구체적 서비스가 개발되면? 생성자 안에서 어떤 신박한 분기 처리로 인스턴스의 종류를 결정할 수는 있겠지만 바람직한 방법은 아니다. 애초에 클라이언트가 `new`를 사용하는게 불만스럽고, 그것이 의존을 만든다. 그래서 다음과 같이 코드를 바꾼다.

```csharp
public class Client {
  private IService service;

  /* 차이가 느껴지십니까? */
  public Client(IService service) {
    /* 넣어버렸다. */
    this.service = service;
  }
}
```

생성자에서 인수를 받는다. 이제 클라이언트는 어떤 서비스가 들어오는지 몰라도 된다. 앞서 언급했던 인젝터 역할을 하는 객체에서 서비스의 종류를 정해줄 수 있게 되었다. 위 코드는 (내가 가장 자주 본) 생성자를 통한 의존성 주입 방식이다. 세터 메소드를 만들어서 의존성을 주입할 수도 있고, 주입을 위한 인터페이스를 만드는 방법도 있다고 한다. 사실 생성자 방식 밖에 못봄.

![IoC](https://i.postimg.cc/7PSLr0m4/IOC.png)
{: .center}

아무튼 어떤 구현 방식이든, 우린 이제 클라이언트에게 서비스를 넣어줄 외부의 어떤 존재, **인젝터**에 대해 인식할 필요가 있다. 클라이언트가 의존할 인스턴스를 직접 생성하지 않으면서 **제어의 흐름에 변화가 생긴다는 것**도 알아두고 가자. 알아두면 어디가서 아는 체 하기도 좋고, 이 **제어의 역전(IoC)**{: .middle-big}이 바로 DI라는 행위의 기반이기 때문.

## 발단

![아 알지알지](https://i.postimg.cc/mgmZgz2k/image.jpg)  
'아.. DI... 알지알지... 어릴 때 자주 사먹었지...'
{: .center}

[소프트웨어 마에스트로](https://www.swmaestro.org/sw/main/main.do)는 아주 좋은 기회다. 소마에서 나는 처음으로 해커톤이란 것을 경험해봤다. 처음 보는 사람들과 팀을 맺고, 아이디어만 정해간 다음, 하루만에 회의를 하고 서비스를 설계하고 개발을 했다. 그 당시 테이블 맞은 편에 앉아있던, 내가 만나봤던 개발자 중에서도 손에 꼽을 정도로 멋진, 안드로이드 개발자 분들의 대화가 생각난다.

> 😄 : DI는 어떻게 할까요?  
> 🙂 : ㅁㅁ가 좋은데 써보는건 어때요? 아니면 ㅇㅇ도 한 번 해보고 싶어요.  
> 🙄(나) : 'DI가... 그.. 저... 컨스트럭터에 넣어서 머시기 하는거였던거 같은디... 그.. 먼가 더 있나...?'

[클린 아키텍처](http://www.yes24.com/Product/Goods/77283734)는 아주 좋은 책이다. 약 4백여 페이지에 걸쳐 이 분야 레전드 엉클 밥의 잔잔한 잔소리를 들을 수 있다. 아키텍처는 자신이 무엇인지 소리쳐야 됩니다. 미룰 수 있는 결정은 최대한 미뤄야 합니다. 등등. 책의 핵심은 아니지만, 이런 내용이 생각난다.

> 📖 : 데이터베이스, 웹 서버, REST, 의존성 주입 프레임워크는 전부 세부사항이다.  
> 🙄(나) : '의존성 주입이 저렇게.. 엮이는 거였..구나..?'

무엇이 문제였나. 나는 의존성 주입을 그저 **행위**라고 생각했다. 간단히 말하자면, 그냥 내가 하고 있는 거란 인식을 가지고 있었다. 그런 나의 과거 모습을 생각하며 옛날에 했던 프로젝트의 코드를 다시 살펴봤다. 우선, 각각 flask와 express를 사용했던 옛날 프로젝트들은 진행하면서 딱히 DI의 필요성을 스스로 못느꼈던 것 같고, 그게 나를 이 상태 - DI에 대한 인식이 상당히 얕은 상태 - 로 유지하는데 영향을 줬던 것 같다.  

그리고 하나 더. 바로 작년에 했던 프로젝트의 코드,

```python
def analyzerFactory(name: str, labelData: Series, schema: dict) -> LabelAnalyzer:
  """
  analyzer factory method
  """
  from .ArrayLabelAnalyzer import ArrayLabelAnalyzer
  from .StringLabelAnalyzer import StringLabelAnalyzer
  from .ObjectLabelAnalyzer import ObjectLabelAnalyzer
  from .NumericLabelAnalyzer import NumericLabelAnalyzer

  type = schema['type']

  if type == 'string':
    return StringLabelAnalyzer(name, labelData, schema)
  elif type == 'number' or type == 'integer':
    return NumericLabelAnalyzer(name, labelData, schema)
  elif type == 'object':
    return ObjectLabelAnalyzer(name, labelData, schema)
  elif type == 'array':
    return ArrayLabelAnalyzer(name, labelData, schema)
  else:
    eprint(type + ' is an unacceptable type')
    return None
```

먼저 설명을 좀 하자면, 프레임워크라는 것을 적용하기엔 규모가 작은, 부모 프로세스로부터 독립된 에이전트 프로그램을 개발하는 중이었고, 런타임 중에 입력되는 데이터의 타입에 따라 다른 로직을 가지는 클래스의 인스턴스를 생성해줘야 했다. 그냥 '나는 Factory Method 패턴을 쓰고 있다' 라는 생각하며 구현했는데, 어떤 관점에선 런타임에 인스턴스의 종류를 결정하는 메소드라는 점에서 **인젝터**{: .middle-big}라고 볼 수도 있을 것 같다. 그러니까, 이렇게 생각할 수 있다: **나는 작년 프로젝트를 진행하면서, DI를 직접 구현하기 위해 Factory Method 패턴을 사용했다.**{: .middle-big} 다만 그 사실을 인지하지 못했을 뿐.

이러고 있으니까 그냥 DI는 내가 하는 거란 생각을 가지고 있을 수 밖에..

## 일반적으로, DI는 프레임워크가 해준다.

![spring](https://i.postimg.cc/mkk6nDnn/spring.png)  
{: .center}

스프링... Spring... 지금 당장 하고싶은건 없는데 이쪽 길을 가긴 가야겠다 싶은 사람에게 흔히들 '그냥 스프링 배워요' 라는 말을 많이 한다. 왜? 우리나라에서 많이 쓰니까. 취직 보장. 그럼 스프링이 뭔데? 웹 프레임워크라고들 말한다. 얘가 뭘 해주는데? 

![di](https://i.postimg.cc/65vN6jHm/springdi.png)  
스프링은 스스로 DI와 그를 통한 IoC를 핵심 가치로 내세우고 있다.
{: .center}

만약 내가 만들던 프로그램이 작은 에이전트가 아니라 전사(Enterprise)의 자원을 관리하는 거대하고 복잡한 어플리케이션이었다면 저렇게 직접 의존성 주입을 구현하고 있을 수 있었을까? 스프링은 효율적으로 프로그램을 만들 수 있는 도구를 제공하는 프레임워크이다. 그리고 프레임워크라는 개념의 기저에 깔린 원칙이 바로 IoC(외부의 존재가 흐름을 제어한다.)이며, 스프링이 제공하는 대표적인 기능이 바로 의존성 주입이다. 스프링은 의존성 주입을 위한 자체적 구조(IoC Container, Bean)를 가지고 있고, 개발자가 만든 클래스가 편하게 의존성을 주입받을 수 있도록 만드는 틀을 제공한다.(`@Autowired`, `@Qualifier`등 어노테이션들과 XML)

![nestjs](https://i.postimg.cc/8CDrc2Dp/Nestjs.png)  
어흥
{: .center}

내가 자주 사용 중인 node 환경에서도 DI를 제공하는 프레임워크가 존재한다. 본의 아니게 작년 프로젝트를 자꾸 소환하는데, 작년에 사용한 NestJS가 바로 그것. 그러니까 다시 말하자면, 그 프로젝트에서 직접 구현한 DI 뿐만이 아니라 프레임워크가 제공해주는 DI도 사용했다는 말이다.

![injectable](https://i.postimg.cc/HLjY3mws/injectorbl.png)  
떡하니 박혀있는 `@Injectable` = 주입 가능함  
{: .center}

시야가 좁아지면 이런걸 놓치고 '생성자에서 서비스 받도록 만들었으니까 DI 했다' 라고 생각을 하게 된다. NestJS의 구조에 대해서 간단하게 설명하고 넘어가자면, Provider라는 개념을 사용한다. Provider는 클래스를 선언할 때 `@Injectable` 어노테이션을 추가하면 만들 수 있다. 어노테이션 이름에서 직관적으로 알 수 있듯이 **주입 가능**한 객체가 되며, 앞서 말했던 DI의 구성요소중 **서비스**의 설명에 부합하는 것을 알 수 있을 것이다. 정확히는, 기초가 탄탄했다면 이 사실을 바로 알아차렸을텐데...

## DI 프레임워크? DI 라이브러리?
(이하 Android 개발 경력 0일의 뇌피셜)
{: .middle-small}

![쑤신다](https://i.postimg.cc/g0NGvvGf/insert.png)  
오랜만에 실력발휘좀 했다.
{: .center}

DI를 구현하는 방법에 대해 찾아보며 느낀점. DI를 위한 프레임워크라는 개념이 가장 도드러지는 곳은 안드로이드 환경이었다. **Dagger**, **Hilt**, **Koin** 등 이름에서부터 '우리는 넣습니다!' 라고 말하고 있는 프레임워크들을 만나볼 수 있었다. 그리고 여기에서 이어지는 한 가지 현상이 하나 더 있었는데,

![Framary](https://i.postimg.cc/TPFCH3qC/image.png)  
그래서 **_라이브러리_**란거여 **_프레임워크_**란거여  
{: .center}

상당히 모호하다. 블로그에 따라서 *DI 프레임워크*라고 소개하는 곳도 있고, *DI 라이브러리*라고 말하는 곳도 있다. 하지만 이게 문제점이란 말을 하려는건 아니다. 사실 제어의 역전을 제공한다는 점에서 프레임워크이며 특정 기능을 위한 도구들을 제공한다는 점에서 라이브러리라고 말할 수 있으니까.

아무튼 적고싶었던 분석은: 안드로이드는 OS라는 정체성으로 널리 알려저있지만, 그 자체로 프레임워크라고도 볼 수 있는 [개발 생태계](https://developer.android.com/docs?hl=ko)가 형성되어 있으며, 의존성 주입에 대한 개념은 작은 규모에선 개발자가 수동적으로 구현하도록, 필요에 따라서 그것을 위한 추가적이면서 독립된 프레임워크를 제공하도록 구글에서 따로 오픈소스 프로젝트를 진행했으며, 그게 Dagger와 Hilt이고, 서드파티의 느낌으로 진행된 프로젝트로 Koin이 있다. 고 볼 수 있는 것 같다.  

![koin](https://i.postimg.cc/Bn8QCpSW/koin.png)  
{: .center}

Java의 Spring이나 Node의 NestJS 처럼 광범위한 어젠다를 위한 프레임워크와 그것이 제공하는 기능의 일부가 아닌, DI라는 특정 문제에 집중하는 프레임워크가 존재하는 것이다. 그런 특성으로 인해 프레임워크와 라이브러리의 사이에서 많이들 헷갈려하고 있다는 사이드이펙트가 발생하고 있지만, 이게 문제라고 생각하진 않고 그냥 현상이라고 생각한다.

## 어딜 가든 그의 얼굴이 보여요...

![어딜가든](https://i.postimg.cc/2SKtYFNx/ishf.png)  
{: .center}

현재 시점에서 어플리케이션을 만드는 개발자라면 DI는 반드시 마주치게 될 개념이라 생각된다. 프레임워크라는 개념의 기저에 IoC라는 원칙이 존재하는 이상. 그런고로, 요약해보자면:

- 의존성 주입(Dependency Injection)이란, 한 객체가 자신이 의존할 다른 객체를 전달받도록 하는 기법이다.
- 의존성 주입에선 다음 4가지 객체가 상호작용한다.
  - 서비스 : 전달될 객체
  - 클라이언트 : 전달받을 객체
  - 인터페이스 : 전달될 객체를 사용하는 방법에 대한 정보
  - 인젝터 : 클라이언트에게 서비스를 전달하는 객체
- 의존성 주입으로 인해 제어의 흐름이 역전된다(IoC).
- 주로 프레임워크에서 의존성 주입을 위한 도구들을 제공한다.

## 마무리

이렇게 정돈 되지 않은 정보가 어느 정도로 도움이 될지는 모르겠다. 워낙 유명하고 주요한 개념이라 다른 블로그들에서 더 잘 정리해준 글을 쉽게 찾을 수 있을 것이다. 워낙 파편적으로 글을 읽어서 전부 레퍼런스를 걸기는 어렵겠지만, 아무튼 나도 많이들 참고해가며 글을 썼다.

- [https://en.wikipedia.org/wiki/Dependency_injection](https://en.wikipedia.org/wiki/Dependency_injection)
- [https://hue-dev.site/springframework/2021/05/03/Dependency-Injection-%EC%9D%B4-%EB%AD%90%EC%97%90%EC%9A%94.html](https://hue-dev.site/springframework/2021/05/03/Dependency-Injection-%EC%9D%B4-%EB%AD%90%EC%97%90%EC%9A%94.html)

그 외에 추가적으로 Service Locator라는 패턴도 있다고 한다. 엄밀히 따지면 의존성 주입이라고 인정하지 않는 사람도 있고, 안티패턴이라고 보는 것 같은데, 의존성 문제를 해결하는 방법 중 하나라고 한다. Koin 프레임워크가 Service Locator 패턴을 사용한다. 언제나 공부할 거리는 많다, 이 글을 읽은 사람들도 시간 남으면 더 찾아보자.
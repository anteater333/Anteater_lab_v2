/** NOTE
Date: 2023-11-30
keyword: Javascript, async/await, promise, eslint, error handling

eslint의 no-return-await에 관한 고찰.

우연한 기회에 아래 링크에 대한 시니어 개발자님의 코멘트를 접하고 이에 대한 고찰을 하게 됨.
https://github.com/eslint/eslint/issues/12246#issuecomment-535561875

코멘트가 자세히는 기억나지 않는데 이런 맥락:
"await 구문이 성능적 손해를 야기할 수 있는데 에러 처리에서의 스택 추적엔 유리할 수 있으므로 사용시에 이 특성에 대한 고려가 필요."

본인의 생각:
"async/await은 그냥 promise 패턴에 대한 구문적 설탕에 불과한 것으로 알고있는데 어째서 성능 차이가 발생할 수 있는 것일까?"

정확한 주제는 async 함수에서 return 부분에 Promise 객체를 반환하는데, 이 경우 반환하려는 Promise 앞에 await을 붙이는 것에 대한 이야기.
문법적 오류는 아님. 다만 어차피 async 함수는 항상 Promise를 반환하는 형태이기 때문에 불필요한 await을 붙이지 말라는 의미.
eslint의 no-return-await 규칙은 이런 경우에 대해 경고를 하도록 설정하는 오류. 그런데 이것이 기본 설정인 것에 대해 github에서 논쟁이 있었음.

아래 코드는 return 뒤 await을 붙이는 경우와 붙이지 않는 경우를 테스트해본 것.

사실 이걸론 속도 차이를 극명하게 확인하기 어려움.

return await은 그 자체로 연산을 늘려서 속도를 느리게 만든다기보단, 의도하지 않은 awaiting을 발생하지 않도록 하는데에 집중하는 느낌.

일단 테스트 코드는 여기까지이나, 그럼 await이 에러 핸들링엔 어떤 이점을 주는지도 테스트해볼 수 있도록 하자.
지금은 그냥 블로그 포스팅용 아이디어를 던져놓는 용도.
 */

const fs = require("fs").promises;

const file = "./input/target.txt";

async function asyncPromise() {
  const result = await fs.readFile(file);
  return result.toString();
}

/* asyncPromise는 사실 */
function actualAsyncPromise() {
  return fs.readFile(file).then((buffer) => buffer.toString());
}

async function myFunc1() {
  return await asyncPromise();
}

/* myFunc1는 사실 */
function actualMyFunc1() {
  return asyncPromise().then((val) => val);
}

async function myFunc2() {
  return asyncPromise();
}

/* myFunc2는 사실 */
function actualMyFunc2() {
  return asyncPromise().then();
}

const runner = async () => {
  await Promise.all([
    (asyncPromise().then((value) => {
      console.log(value, asyncPromise.name);
    }),
    actualAsyncPromise().then((value) => {
      console.log(value, actualAsyncPromise.name);
    })),
  ]);

  console.log("========");
  console.log("myFunc1");

  console.time("myFunc1");
  console.log(await myFunc1(), myFunc1.name);
  console.timeEnd("myFunc1");

  console.log("========");
  console.log("actualMyFunc1");

  console.time("actualMyFunc1");
  console.log(await actualMyFunc1(), actualMyFunc1.name);
  console.timeEnd("actualMyFunc1");

  console.log("========");
  console.log("myFunc2");

  console.time("myFunc2");
  console.log(await myFunc2(), myFunc2.name);
  console.timeEnd("myFunc2");

  console.log("========");
  console.log("actualMyFunc2");

  console.time("actualMyFunc2");
  console.log(await actualMyFunc2(), actualMyFunc2.name);
  console.timeEnd("actualMyFunc2");
};

runner();

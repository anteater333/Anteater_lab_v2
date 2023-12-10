/**
 * 원본 객체
 */
const myObj = {
  name: "anteater",
  age: "16 (for real)",
  gender: "male",
  likes: ["singing", "games"],
};

/**
 * 간단한 깊은 복사 함수
 */
function easyDeepCopy(obj) {
  const newObj = {};
  for (const key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
}

/** 얕은 복사한 객체 */
const shallowClone = myObj;

/** 깊은 복사한 객체 */
const deepClone = easyDeepCopy(myObj);

// 원본 객체의 값을 변경
myObj.age = 29;

// 얕게 복사한 객체도 값이 변경됨
console.log(shallowClone.age); // 출력 결과 : 29
// 깊게 복사한 객체엔 변경이 반영되지 않음 (완전히 새로운 데이터니까)
console.log(deepClone.age); // 출력 결과 : 16 (for real)

myObj.likes.push("movies");
console.log(deepClone.likes); // 출력 결과 : [ 'singing', 'games', 'movies' ]
// 깊은 복사한 객체도 영향을 받는다!

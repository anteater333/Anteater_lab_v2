/**
 * 원본 객체
 */
const original = {
  name: "anteater",
  age: "16 (for real)",
  gender: "male",
  likes: ["singing", "games"],
  etc: {
    home: "Daegu",
    budget: 0,
  },
  createdAt: new Date("1995-04-07"),
};

/**
 * 깊은 복사 심화편
 */
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj; // 기본형 데이터는 그대로 반환
  }

  if (Array.isArray(obj)) {
    // 배열에 대한 깊은 복사
    const newArray = [];
    for (let data of obj) {
      newArray.push(deepCopy(data)); // 재귀
    }

    return newArray;
  } else {
    // 객체에 대한 깊은 복사
    const newObj = {};

    for (let key in obj) {
      newObj[key] = deepCopy(obj[key]); // 재귀
    }

    return newObj;
  }
}

const copiedObj = deepCopy(original);

const copied2Obj = JSON.parse(JSON.stringify(original));

original.likes.push("movies");
original.etc.budget = 10000;

// 중첩된 구조에 대해서도 깊은 복사
console.log(copiedObj.likes); // 출력 결과 : [ 'singing', 'games' ]
console.log(copiedObj.etc.budget); // 출력 결과 : 0
console.log(copied2Obj.likes);
console.log(copied2Obj.etc.budget);

// 이건 어떠냐
console.log(original.createdAt); // 출력 결과 : 1995-04-07T00:00:00.000Z (Date 객체)
console.log(copiedObj.createdAt); // 출력 결과 : {}
console.log(copied2Obj.createdAt); // 출력 결과 : 1995-04-07T00:00:00.000Z (문자열)

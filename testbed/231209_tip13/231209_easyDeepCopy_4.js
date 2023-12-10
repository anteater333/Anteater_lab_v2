const fs = require("fs");

// 39MB 짜리JSON 폭탄
const input = "./output/deepCopyTest.json";

console.time("read");
const original = JSON.parse(fs.readFileSync(input));
console.timeEnd("read");

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

function getDepth(obj) {
  if (!obj || obj.length === 0 || typeof obj !== "object") return 0;
  const keys = Object.keys(obj);
  let depth = 0;
  keys.forEach((key) => {
    let tmpDepth = getDepth(obj[key]);
    if (tmpDepth > depth) {
      depth = tmpDepth;
    }
  });
  return depth + 1;
}

console.log(`depth ${getDepth(original)}`);

const testSize = 30;
let t1Sum = 0,
  t2Sum = 0,
  t3Sum = 0;
for (let i = 0; i < testSize; i++) {
  if ((i + 1) % 10 === 0) console.log(`${i + 1} tests completed`);

  const t1Start = Date.now();
  const copiedObj = deepCopy(original);
  t1Sum += Date.now() - t1Start;

  const t2Start = Date.now();
  const copied2Obj = JSON.parse(JSON.stringify(original));
  t2Sum += Date.now() - t2Start;

  const t3Start = Date.now();
  const copied3Obj = structuredClone(original);
  t3Sum += Date.now() - t3Start;
}

console.log(`T1: ${t1Sum / testSize}ms`);
console.log(`T2: ${t2Sum / testSize}ms`);
console.log(`T3: ${t3Sum / testSize}ms`);

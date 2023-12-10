const fs = require("fs");

const target = "./output/deepCopyTest.json";

function builder(depth) {
  if (depth > 8) {
    return "leaf";
  }

  const BIGDATA = {};

  for (let i = 0; i < 10; i++) {
    const p = (Math.random() * 100).toFixed(0);
    BIGDATA[`prop${i}`] = p;

    if (parseInt(p) < 50) {
      BIGDATA[`prop${i}sub`] = builder(depth + 1);
    }
  }

  return BIGDATA;
}

fs.writeFileSync(target, JSON.stringify(builder(1), null, 4));

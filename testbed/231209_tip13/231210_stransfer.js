// 16MB = 1024 * 1024 * 16
const uInt8Array = Uint8Array.from({ length: 1024 * 1024 * 16 }, (v, i) => i);

console.log(uInt8Array.byteLength); // 16777216

const transferred = structuredClone(uInt8Array, {
  transfer: [uInt8Array.buffer],
});

console.log(uInt8Array.byteLength); // 0
console.log(transferred.byteLength); // 16777216

const original = {
  a: () => 1,
};

const copied = structuredClone(original);
/*
오류 발생:
DOMException [DataCloneError]: () => 1 could not be cloned.
*/

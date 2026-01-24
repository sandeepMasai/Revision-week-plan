const nested = [1, [2, [3, [4, 5]], 6], [7, 8], 9, [[10]]];

const deepFlatten = (arr) =>
  arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? deepFlatten(curr) : curr);
  }, []);

console.log(deepFlatten(nested));

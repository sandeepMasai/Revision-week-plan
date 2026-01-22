Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result.push(callback.call(thisArg, arr[i], i, arr));
    }
  }

  return result;
};

const nums = [1, 2, 3, 4, 5];
const doubled = nums.myMap((x) => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
];

const names = users.myMap((u) => u.name);
console.log(names); // ['John', 'Jane']

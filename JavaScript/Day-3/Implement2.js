Array.prototype.myFilter = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myFilter called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      if (callback.call(thisArg, arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
  }

  return result;
};

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.myFilter((x) => x % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Phone", price: 699, inStock: false },
  { name: "Tablet", price: 499, inStock: true },
];

const available = products.myFilter((p) => p.inStock && p.price < 800);

console.log(available);
// [{ name: 'Tablet', price: 499, inStock: true }]

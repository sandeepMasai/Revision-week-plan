Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = this;
  let accumulator;
  let startIndex;

  if (arguments.length > 1) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    if (arr.length === 0) {
      throw new TypeError("Reduce of empty array no value");
    }
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
};

const items = [
  { category: "fruit", name: "apple" },
  { category: "vegetable", name: "carrot" },
  { category: "fruit", name: "banana" },
];

const grouped = items.myReduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item.name);
  return acc;
}, {});

console.log(grouped);
// { fruit: ['apple', 'banana'], vegetable: ['carrot'] }

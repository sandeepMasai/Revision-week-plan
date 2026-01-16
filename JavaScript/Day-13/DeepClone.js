function deepClone(value, hash = new WeakMap()) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (hash.has(value)) {
    return hash.get(value);
  }

  const result = Array.isArray(value) ? [] : {};

  hash.set(value, result);

  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key], hash);
    }
  }

  return result;
}

const obj = {
  name: "John",
  address: {
    city: "NYC",
    coords: { lat: 40, lng: -74 },
  },
  hobbies: ["reading", "gaming"],
};

obj.self = obj;

const clonedObj = deepClone(obj);

console.log(clonedObj);
console.log(clonedObj !== obj); // true
console.log(clonedObj.self === clonedObj); // true
console.log(clonedObj.address !== obj.address); // true

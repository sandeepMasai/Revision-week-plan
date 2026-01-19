const products = [
  ["Electronics", "Laptop", 999],
  ["Clothing", "Shirt", 29],
  ["Electronics", "Mouse", 25],
  ["Clothing", "Pants", 49],
  ["Electronics", "Keyboard", 75],
  ["Clothing", "Jacket", 89],
];

const result = products.reduce((acc, [category, name, price]) => {
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push({ name, price });

  return acc;
}, {});

// sort

for (let category in result) {
  result[category].sort((a, b) => a.price - b.price);
}

console.log(result);

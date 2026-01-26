const employees = [
  { name: "John", dept: "Engineering", salary: 80000 },
  { name: "Alice", dept: "Engineering", salary: 95000 },
  { name: "Bob", dept: "Marketing", salary: 95000 },
  { name: "Charlie", dept: "Engineering", salary: 95000 },
  { name: "Diana", dept: "Marketing", salary: 95000 },
  { name: "Eve", dept: "HR", salary: 70000 },
];

const sortedEmployees = employees.sort((a, b) => {
  if (a.dept !== b.dept) {
    return a.dept.localeCompare(b.dept);
  }

  if (a.salary !== b.salary) {
    return b.salary - a.salary;
  }

  return a.name.localeCompare(b.name);
});

console.log(sortedEmployees);

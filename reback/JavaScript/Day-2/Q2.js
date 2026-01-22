//
// ### Q1: Object Array to Nested Structure (12 mins)

// Transform flat employee data into a hierarchical department structure with salary statistics.

const employees = [
  { id: 1, name: "John", dept: "Engineering", salary: 80000 },
  { id: 2, name: "Jane", dept: "Engineering", salary: 95000 },
  { id: 3, name: "Bob", dept: "Marketing", salary: 65000 },
  { id: 4, name: "Alice", dept: "Engineering", salary: 88000 },
  { id: 5, name: "Charlie", dept: "Marketing", salary: 72000 },
  { id: 6, name: "Diana", dept: "HR", salary: 70000 },
];

const result = employees.reduce((acc, emp) => {
  if (!acc[emp.dept]) {
    acc[emp.dept] = {
      employees: [],
      totalSalary: 0,
      totalCount: 0,
    };
  }

  acc[emp.dept].employees.push(emp.name);
  acc[emp.dept].totalSalary += emp.salary;
  acc[emp.dept].totalCount += 1;

  return acc;
}, {});

// calculate average salary
for (const dept in result) {
  result[dept].avgSalary = Number(
    (result[dept].totalSalary / result[dept].totalCount).toFixed(2)
  );
  delete result[dept].totalSalary;
}

console.log(result);

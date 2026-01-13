import { useMemo, useState } from "react";

const EMPLOYEES = [
  { id: 1, name: "Alice Johnson", department: "Engineering", salary: 95000, joinDate: "2020-03-15" },
  { id: 2, name: "Bob Smith", department: "Marketing", salary: 75000, joinDate: "2021-07-22" },
  { id: 3, name: "Carol White", department: "Engineering", salary: 105000, joinDate: "2019-01-10" },
  { id: 4, name: "David Brown", department: "Sales", salary: 68000, joinDate: "2022-05-30" },
  { id: 5, name: "Eve Davis", department: "HR", salary: 72000, joinDate: "2020-11-12" },
  { id: 6, name: "Frank Miller", department: "Engineering", salary: 88000, joinDate: "2021-02-18" },
  { id: 7, name: "Grace Lee", department: "Sales", salary: 79000, joinDate: "2019-09-01" },
  { id: 8, name: "Henry Wilson", department: "Marketing", salary: 82000, joinDate: "2020-06-10" },
  { id: 9, name: "Ivy Clark", department: "HR", salary: 70000, joinDate: "2022-01-25" },
  { id: 10, name: "Jack Turner", department: "Engineering", salary: 110000, joinDate: "2018-12-03" }
];

 function EmployeeTable() {
  const [originalData] = useState(EMPLOYEES);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return originalData;

    const sorted = originalData.slice().sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (sortConfig.key === "joinDate") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [originalData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }

      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }

      return { key: null, direction: null };
    });
  };

  const getIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Name{getIndicator("name")}
          </th>
          <th onClick={() => handleSort("department")}>
            Department{getIndicator("department")}
          </th>
          <th onClick={() => handleSort("salary")}>
            Salary{getIndicator("salary")}
          </th>
          <th onClick={() => handleSort("joinDate")}>
            Join Date{getIndicator("joinDate")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.department}</td>
            <td>${emp.salary.toLocaleString()}</td>
            <td>{emp.joinDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default EmployeeTable
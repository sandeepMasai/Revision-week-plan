const express = require("express");
const QueryOptimizer = require("./optimizer/QueryOptimizer");

const app = express();
app.use(express.json());

const optimizer = new QueryOptimizer(2);

// Analyze queries
app.post("/analyze", (req, res) => {
  optimizer.analyze(req.body);
  res.json({ message: "Query analyzed" });
});

// Execute query (with cache)
app.post("/query", (req, res) => {
  const result = optimizer.execute(req.body);
  res.json(result);
});

// Get index recommendations
app.get("/indexes", (req, res) => {
  res.json(optimizer.recommendIndexes());
});

app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});

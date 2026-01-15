1. What is the aggregation framework in MongoDB?
It is a powerful data processing framework that uses a pipeline approach. Documents enter a multi-stage process where they are filtered, transformed, and grouped to return computed results, similar to SQL's GROUP BY and JOIN clauses. 
2. Explain the stages in the aggregation pipeline:
$match: Filters documents to pass only those matching specified conditions (similar to find()).
$group: Groups input documents by a specified identifier and applies accumulator expressions like $sum, $avg
$project: Reshapes documents by adding, removing, or renaming fields.
$sort: Orders the documents (1 for ascending, -1 for descending).
$limit: Restricts the number of documents passed to the next stage. 
3. What is $lookup? How do you perform joins?
$lookup performs a left outer join to another collection. It takes four main fields: from (target collection), localField, foreignField, and as (output array field). This is the primary way to "join" data in a non-relational database. 
4. What is $unwind? When would you use it?
$unwind deconstructs an array field from the input documents to output a document for each element of the array. You use it when you need to perform operations (like grouping or sorting) on individual items within an array. 
5. What are aggregation expressions and operators?
Operators: Symbols or keywords (e.g., $add, $substr, $cond) used within stages to calculate values.
Accumulators: Used in $group to compute totals (e.g., $push, $max, $min). 
6. How do you handle one-to-many relationships?
Embedding: Use when the "many" is small and frequently accessed with the parent (e.g., a few addresses for a user).
Referencing: Store IDs of the "many" documents in an array or store the parent ID in the "many" documents (better for large datasets). 
7. How do you handle many-to-many relationships?
Typically handled via Two-Way Referencing. Both collections store an array of IDs pointing to each other. For example, a Student document contains an array of Course IDs, and a Course document contains an array of Student IDs. 
8. What is data modeling? Explain the 6 rules of thumb.
Data modeling is the process of defining how data is stored and related. The 6 Rules of Thumb by William Zola are: 
Favor embedding unless there is a compelling reason not to.
Avoid Joins if they can be avoided by embedding.
Arrays should not grow without bound.
Reference data that is accessed frequently but changes rarely.
Embed data that is small and changes frequently.
How you model data depends entirely on your application's access patterns. 
9. What are atomic operations?
Atomic operations ensure that a write operation is "all or nothing." In MongoDB, a write operation is atomic at the document level. If you update five fields in one document, either all five update or none do. 
10. What is a transaction? When should you use it?
A transaction allows for multi-document atomicity across different collections or databases. Use them only when you need ACID compliance for operations that must succeed or fail together (e.g., transferring money between two different bank account documents). For most cases, document-level atomicity is preferred for performance.
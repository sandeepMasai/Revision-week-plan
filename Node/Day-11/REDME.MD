Day 11: MongoDB Queries & Indexing
1. What are the different types of queries in MongoDB?
MongoDB supports several query types: Basic Queries match specific values, Range Queries using comparisons, Regex Queries (pattern matching), Geospatial Queries location-based, and Aggregation Pipelines complex data processing. 
2. Explain projection in MongoDB queries.
Projection is used to specify which fields to return in the result set. In a find() query, passing { field: 1 } includes it, while { field: 0 } excludes it. This reduces network overhead by only sending necessary data. 
3. What are comparison operators?
These filters compare values in documents: 
$eq: Matches values equal to a specified value.
$gt / $gte: Matches values greater than (or equal to).
$lt / $lte: Matches values less than (or equal to).
$in: Matches any of the values specified in an array.
$ne: Matches all values that are not equal to a specified value. 
4. What are logical operators?
Logical operators join multiple query conditions: 
$and: Joins clauses with a logical AND (returns documents that match all).
$or: Joins clauses with a logical OR (returns documents that match at least one).
$not: Inverts the effect of a query expression.
$nor: Joins clauses with a logical NOR (returns documents that fail all). 
5. Explain update operators.
These modify documents without replacing the whole object: 
$set: Replaces the value of a field with a specified value.
$unset: Removes a specified field from a document.
$inc: Increments the field value by a specific amount.
$push: Adds an item to an array.
$pull: Removes all instances of a value from an existing array. 

6. What are indexes in MongoDB? What types of indexes exist?
Indexes are special data structures (B-trees) that store a small portion of the collection's data set in a traversable form to improve search speed. 
Types: Single Field, Compound, Multikey (for arrays), Geospatial, Text, and Hashed. 
7. How do you create a compound index? What is index order?
A compound index is created by specifying multiple fields: db.collection.createIndex({ field1: 1, field2: -1 }). 
Index Order: 1 is ascending and -1 is descending. The order matters for sort operations; a query can use a compound index if the sort direction matches or is the exact inverse of the index pattern. 
8. What is a covered query?
A covered query is a query where all the fields in the query, the projection, and the sort are part of the same index. MongoDB can return results directly from the index without ever looking at the actual documents (the "Fetch" stage is skipped), making it extremely fast. 
9. How do you analyze query performance? What is explain()?
You use the .explain() method on a query (e.g., db.collection.find().explain("executionStats")). It provides a breakdown of how MongoDB executed the query, showing if it used an index IXSCAN, did a full collection scan COLLSCAN, and how many documents were examined versus returned. 
10. What are TTL indexes?
TTL (Time To Live) indexes are special single-field indexes that MongoDB uses to automatically remove documents from a collection after a certain amount of time. This is ideal for expiring data like session information or temporary logs. Check the MongoDB TTL Documentation for implementation details
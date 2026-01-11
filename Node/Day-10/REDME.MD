1. What is MongoDB? What makes it different from relational databases?
MongoDB is a popular open-source, non-relational (NoSQL) database that stores data in flexible, JSON-like BSON documents.
Key Differences:
Data Model: Relational databases use rigid tables with fixed rows and columns; MongoDB uses dynamic collections of documents.
Schema: Relational databases require a predefined schema; MongoDB is schema-less, allowing documents in the same collection to have different fields.
Scaling: Relational databases typically scale vertically (bigger servers); MongoDB scales horizontally using sharding (more servers).
Joins: Relational databases excel at complex joins across multiple tables; MongoDB encourages keeping related data together in a single document to minimize the need for joins. 
2. What are collections and documents in MongoDB?
Collections: Analogous to tables in relational databases, these are groups of related documents stored within a single database. Unlike tables, they do not enforce a fixed structure on the data.
Documents: The basic unit of data in MongoDB, equivalent to a row in a relational database. They consist of key-value pairs and can contain nested structures like arrays and other documents. 
3. What is BSON? How does it differ from JSON?
BSON (Binary JSON): A binary-encoded serialization of JSON-like documents used internally by MongoDB for storage and network transfer.
Differences:
Data Types: BSON supports more data types than JSON, including Date, ObjectId, and raw Binary data.
Speed: BSON is optimized for fast parsing and traversal by machines, whereas JSON is text-based and slower for a database to process.
Readability: JSON is human-readable text; BSON is a machine-readable binary format. 
4. Explain the structure of a MongoDB document. What is _id? 
Document Structure: A set of field-value pairs where values can be any BSON data type, including arrays or other embedded documents.
The _id Field:
Acts as the primary key and must be unique within a collection.
It is immutable once set and is automatically indexed by MongoDB.
If not provided during insertion, the driver automatically generates a 12-byte ObjectId. 
5. What are the data types supported in MongoDB?
MongoDB supports various BSON types, including: 
String, Number, Boolean, Null.
Array and Object (for nested documents).
Date (standardized timestamp).
ObjectId (12-byte unique identifier).
Binary Data (for images or files).
Regular Expression and JavaScript code.
Decimal128 (high-precision decimals for financial data). 
6. What are embedded documents vs references in MongoDB?
Embedded Documents (Denormalization): Storing related data within a single document as a sub-document or array. This keeps related data together for fast retrieval in one query.
References (Normalization): Storing data in separate documents and using a unique identifier (usually _id) to link them, similar to foreign keys in SQL. 
7. When should you embed vs reference data?
Embed when: There is a "one-to-one" or "one-to-few" relationship, or when data is frequently read together. It is ideal for hierarchical data that doesn't change frequently.
Reference when: There is a "one-to-many" or "many-to-many" relationship, when data is very large (exceeding the 16MB document limit), or when the related data is frequently updated independently. 
8. What are the advantages and disadvantages of MongoDB?
Advantages:
Flexibility: Dynamic schema allows rapid development and easy updates.
Scalability: Native sharding supports horizontal scaling across multiple servers.
Performance: High read/write speed for large volumes of unstructured data.
Disadvantages:
Memory Usage: Relies heavily on RAM for high performance.
Joins: Lacks the robust, efficient join capabilities of SQL (uses $lookup instead).
Storage Overhead: BSON metadata and lack of normalization can lead to larger storage requirements. 
9. Explain schema design in MongoDB. Is MongoDB schema-less? 
Schema Design: Focuses on how the application queries data rather than how the data is structured. Developers choose between embedding or referencing based on performance needs.
Is it Schema-less? Yes, by default, MongoDB does not enforce a structure at the database level. However, modern MongoDB (as of 2026) allows you to define Schema Validation rules to enforce specific data types or mandatory fields when needed. 
10. What is the aggregation pipeline in MongoDB?
The aggregation pipeline is a powerful framework for data processing and transformation. It works like an assembly line where documents pass through various stages—such as $match (filtering), $group (summarizing), and $sort—to return a single computed result.
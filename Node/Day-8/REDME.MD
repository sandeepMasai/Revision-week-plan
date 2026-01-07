1. What is a database? What are the types?
A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Think of it as a digital filing cabinet. Relational (SQL): Structured data in tables (e.g., MySQL, PostgreSQL).
Non-Relational (NoSQL): Flexible schemas (e.g., MongoDB, Redis).
Cloud Databases: Databases hosted on cloud platforms like AWS RDS.
Distributed Databases: Data spread across multiple physical locations
2. SQL vs. NoSQL
SQL: Relational, uses predefined schemas, and scales vertically (bigger servers). It’s like a neat spreadsheet.
NoSQL: Non-relational, has dynamic schemas for unstructured data, and scales horizontally (more servers). It’s like a folder of varying documents. 
3. Choosing Your Fighter
Choose SQL when: You need data integrity, complex queries, and ACID compliance (e.g., banking systems).
Choose NoSQL when: You have rapidly changing data structures, need high availability, or are dealing with massive "Big Data" (e.g., social media feeds).
4. ACID Properties
ACID ensures database transactions are processed reliably: 
Atomicity: "All or nothing." If one part of a transaction fails, the whole thing fails.
Consistency: Data must follow all database rules (constraints/triggers) after a transaction.
Isolation: Transactions don't mess with each other while running concurrently.
Durability: Once a transaction is committed, it stays saved, even if the power goes out. 

5. BASE (The NoSQL approach)
Instead of ACID, NoSQL often follows BASE to prioritize availability: 
Basically Available (guarantees availability).
Soft state (state may change over time without input).
Eventual consistency (the data will be consistent... eventually). 

6. Normalization
Normalization organizes data to reduce redundancy: 
1NF (First Normal Form): Each table cell contains a single value; no repeating groups.
2NF (Second Normal Form): Meets 1NF + all non-key columns depend on the entire primary key.
3NF (Third Normal Form): Meets 2NF + non-key columns don’t depend on other non-key columns.

7. Denormalization
This is the process of adding redundant data back in to speed up complex queries. 
When to use: In read-heavy systems where joining multiple normalized tables is too slow (e.g., Data Warehousing)

8. Database Indexes
 An index is a data structure (like the index at the back of a textbook) that allows the database to find rows much faster than scanning the whole table.

9. The Trade-offs of Indexing

Write Speed: Every time you add/update data, the index must also be updated, slowing down writes.
Storage: Indexes take up extra disk space. 

10. Primary vs. Foreign Keys
Primary Key: A unique identifier for a record in a table (e.g., EmployeeID). It cannot be null.
Foreign Key: A field in one table that links to the Primary Key of another table, creating a relationship between them. 
For deeper dives into implementation, check out the PostgreSQL Documentation or MongoDB University. 

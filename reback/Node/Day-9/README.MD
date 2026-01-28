1. Database Scaling
Scaling is the process of increasing a system's capacity to handle more data or traffic. 
Vertical Scaling (Scaling Up): Adding more power (CPU, RAM, SSD) to a single server. It is simple but has a hard physical limit and causes downtime during upgradesHorizontal Scaling (Scaling Out): Adding more servers to your pool. This is more complex but offers theoretically infinite growth and better fault tolerance. 
2. Database Replication
Replication is copying data across multiple servers to improve availability and read performance. 
Master-Slave (Primary-Replica): All writes (INSERT/UPDATE/DELETE) go to the Master. The Master then pushes these changes to one or more Slaves. Reads are distributed across Slaves, reducing the load on the Master. 
3. Database Sharding
Sharding is a horizontal scaling technique that breaks a large dataset into smaller, manageable pieces called shards, which are distributed across different server nodes. A Shard Key (e.g., user_id) is used to determine which shard a specific row belongs to. For example, user_id % 3 could determine which of three servers stores that user's data. 
4. Challenges of Sharding
Complexity: Application logic must become "shard-aware."
Resharding: Moving data when a shard becomes too large is difficult.
Join Operations: Performing JOINs across different shards is extremely slow or unsupported.
Hotspots: If one shard key (like a celebrity user) is too popular, that specific shard will be overloaded. 
5. Partitioning vs. Sharding
Partitioning: Dividing a large table into smaller parts within the same database instance (e.g., splitting a table by year).
Sharding: Dividing data across multiple independent server instances. Sharding is essentially "Horizontal Partitioning" across different machines. 
6. Connection Pooling
A connection pool is a cache of database connections maintained so that connections can be reused. 
Importance: Opening and closing a database connection is "expensive" (slow and resource-heavy). Reusing existing connections improves performance and prevents the database from being overwhelmed by too many simultaneous login requests. 
7. N+1 Queries
This occurs when an application makes one query to fetch a list of items, and then N additional queries to fetch related data for each item.
Example: Fetching 10 posts, then making 10 separate queries to get the author's name for each post.
Solution: Use Eager Loading (e.g., JOIN or IN clauses) to fetch all required data in a single query.
8. Caching Strategies
Caching stores frequently accessed data in high-speed memory (like Redis). 
Cache-Aside: The application checks the cache; if it's a "miss," it loads data from the DB and adds it to the cache.
Write-Through: Data is written to the cache and the DB simultaneously. High consistency, but slower writes.
Write-Back: Data is written to the cache only; the DB is updated later in batches. Fast writes, but risks data loss if the cache crashes. 
9. CAP Theorem
The CAP theorem states that a distributed system can only provide two of the following three guarantees at the same time:
Consistency: Every read receives the most recent write.
Availability: Every request receives a response (even if it's old data).
Partition Tolerance: The system continues to operate despite network failures between nodes. 
10. Transactions and MVCC
Transactions: A sequence of operations treated as a single unit of work (ACID properties).
MVCC: A method used to handle simultaneous access to data without locking the database. It creates multiple versions of a record; readers see a "snapshot" of the data as it existed when their transaction started, allowing writes to happen without blocking reads. 
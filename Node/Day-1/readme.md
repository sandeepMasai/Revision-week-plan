1. HTTP and the Request-Response Cycle
HTTP (Hypertext Transfer Protocol) is the foundational protocol of the World Wide Web, used to transmit data between a client (browser) and a server. It follows a Request-Response Cycle: 
Request: The client sends an HTTP request containing a method, URL, headers, and sometimes a body.
Processing: The server receives the request, processes the logic, and interacts with a database if necessary.
Response: The server sends back an HTTP response containing a status code, headers, and the requested resource HTML, JSON,  
2. HTTP Methods
GET: Retrieves data from a server. It should not modify any data.
POST: Submits data to be processed, typically resulting in the creation of a new resource.
PUT: Replaces an existing resource entirely with new data.
PATCH: Partially updates an existing resource (only modifies specific fields).
DELETE: Removes a specific resource from the server. 
3. HTTP Status Codes
2xx (Success): The request was successfully received and accepted (e.g., 200 OK, 201 Created).
3xx (Redirection): Further action is needed to complete the request (e.g., 301 Moved Permanently).
4xx (Client Error): The request contains bad syntax or cannot be fulfilled (e.g., 400 Bad Request, 404 Not Found).
5xx (Server Error): The server failed to fulfill an apparently valid request (e.g., 500 Internal Server Error). 
4. HTTP Headers
Headers provide metadata about the request or response. 
Request Headers: Authorization (credentials), Content-Type (format of body), User-Agent (browser info).
Response Headers: Set-Cookie (session info), Content-Type (format of returned data), Cache-Control (caching instructions). 
5. Stateless vs. Stateful
Stateful: The server remembers previous interactions (e.g., FTP).
Stateless: Each request is independent; the server does not store any context from previous requests.
HTTP is Stateless. To "remember" users, developers use external mechanisms like Cookies or JWTs. 
6. Idempotency
An operation is idempotent if performing it multiple times produces the same result as performing it once. 
Idempotent Methods: GET, PUT, DELETE, HEAD, OPTIONS.
Non-Idempotent: POST (multiple calls create multiple resources) and PATCH (depending on implementation). 
7. REST (Representational State Transfer)
REST is an architectural style for designing networked applications. Key principles include: 
Client-Server: Separation of concerns.
Stateless: No client context stored on the server.
Cacheable: Responses must define themselves as cacheable or not.
Uniform Interface: Consistent resources, identified by URIs.
Layered System: Clients cannot tell if they are connected directly to the server or an intermediary. 
8. API Versioning
Versioning prevents breaking changes for existing users. Common approaches include: 
URI Versioning: https://api.example.com/v1/users
Query Parameter: https://api.example.com/users?version=1
Header Versioning: Custom header like X-API-Version: 1
Content Negotiation: Using the Accept header (e.g., application/vnd.example.v1+json). 
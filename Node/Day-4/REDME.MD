1. What is CORS? Why does it exist?
Cross-Origin Resource Sharing CORS is an HTTP-header based mechanism that allows a server to indicate any origins domain, scheme, or port other than its own from which a browser should permit loading resources. It exists to provide a controlled way for web applications to bypass the Same-Origin Policy while maintaining security. 
2. Explain the Same-Origin Policy
The Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin. Two URLs have the same origin if the protocol, port, and host are exactly the same. This prevents malicious sites from reading sensitive data from another site (e.g., your bank) in the same browser. 
3. What are preflight requests?
A preflight request is an automatic "check" sent by the browser using the OPTIONS method before the actual request. It asks the server if the cross-origin request is safe to send. 
When they occur: They are triggered if the request uses methods other than GET, HEAD, or POST, or if it contains custom headers (like Authorization) or specific Content-Types (like application/json). 
4. How do you configure CORS in Express?
The easiest way is to use the CORS middleware. 
javascript
const express = require('express');
const cors = require('cors');
const app = express();


5. What is CSRF? How do you prevent it?
Cross-Site Request Forgery (CSRF) is an attack that tricks a logged-in user into submitting a malicious request to a web application they are authenticated with (e.g., an attacker lures you to a site that triggers a hidden "transfer money" button on your bank's site). 
Prevention: Use Anti-CSRF tokens (unique, unpredictable tokens for each session), set SameSite: Strict or Lax on cookies, and require custom request headers for sensitive actions. 
6. What is XSS? How do you prevent it?
Cross-Site Scripting (XSS) occurs when an attacker injects malicious scripts (usually JavaScript) into content that is then delivered to other users. 
Prevention: Sanitize and validate all user input, escape data before rendering it in HTML, and implement a strong Content Security Policy (CSP). 
7. What is SQL Injection? How do you prevent it?
SQL Injection is a vulnerability where an attacker interferes with the queries an application makes to its database by inserting malicious SQL code into input fields. 
Prevention: Never concatenate strings to build queries. Use Parameterized Queries (Prepared Statements) or Object-Relational Mapping (ORM) libraries like Sequelize or Prisma. 
8. What are Rate Limiting and Throttling?
Rate Limiting: Restricts the number of requests a user can make within a specific timeframe ex: 100 requests per hour.
Throttling: Slows down the response rate once a certain threshold is reached.
Importance: They prevent Denial of Service (DoS) attacks, stop brute-force login attempts, and ensure fair resource usage. 
9. What is the Principle of Least Privilege (PoLP)?
The Principle of Least Privilege is the security concept that a user, program, or process should have only the minimum essential privileges necessary to perform its specific task and nothing more. This limits the potential "blast radius" if a specific account or service is compromised. 
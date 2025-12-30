1. What is JWT JSON Web Token
Ans
A JSON Web Token (JWT) is an open standard (RFC 7519) used for securely transmitting information between parties as a compact, self-contained JSON object. It is widely used for authentication and authorization in modern web applications and microservices. 
Structure of three part Header.Payload.Signature
Header: Contains metadata about the token, typically including the type (JWT) and the signing algorithm used (e.g., HS256 or RS256).
Payload: Contains "claims," which are statements about an entity (usually the user) and additional data like expiration time (exp) and issuer (iss). Claims are categorized as registered, public, or private.
Signature: Created by taking the encoded header, encoded payload, a secret key, and the algorithm specified in the header to hash them together. This ensures the token has not been tampered with
 2. How does JWT Authentication work?
 Ans
The typical flow involves these steps:
User Login: The client sends credentials (e.g., username/password) to the server.
Token Issuance: The server verifies credentials and, if valid, creates a signed JWT and returns it to the client.
Token Storage: The client stores the JWT (e.g., in a cookie or memory) for future use.
Authenticated Requests: For subsequent requests, the client includes the JWT in the HTTP Authorization header using the Bearer <token> scheme.
Server Verification: The server receives the request, extracts the JWT, and verifies its signature using a secret or public key. If valid, access is granted to the protected resource. 

3. Advantages and Disadvantages of JWT over Sessions
Feature 	JWT (Stateless)	Sessions (Stateful)
Scalability	High; servers don't store session state, making it ideal for distributed systems and microservices.	Lower; requires server-side storage (e.g., Redis or DB) to manage state across multiple servers.
Performance	Faster; avoids database lookups for every request by containing claims in the token.	Slower; requires a lookup in the session store for every request.
Revocation	Difficult; tokens are valid until they expire unless a blacklist is maintained.	Easy; sessions can be immediately destroyed on the server.
Size	Larger; carries all claims, which can increase header size.	Small; only a session ID is transmitted.

4. Where to store JWTs in the Client?
Memory: Storing tokens in a JavaScript variable is highly secure against XSS because scripts cannot easily access it. However, the token is lost on page refresh.
HttpOnly Cookies: Recommended for maximum security. The HttpOnly flag prevents JavaScript access, mitigating XSS risks. Use the Secure flag for HTTPS and SameSite to mitigate CSRF.
localStorage: Easy to use and persists across refreshes. However, it is highly vulnerable to XSS attacks, as any script running on the page can read it. 
5. Access Tokens vs. Refresh Tokens
Access Token: A short-lived token (e.g., 15 minutes) used to authenticate requests and access protected resources. It contains user permissions and identity.
Refresh Token: A long-lived token used solely to obtain new access tokens without requiring the user to re-log in. It should be stored more securely in an HttpOnly cookie 
6. Handling JWT Expiration and Refresh 
When an access token expires, the client can use a Refresh Token to request a new one from the authentication server. This prevents frequent login prompts while maintaining security through short-lived access tokens. Many implementations use Refresh Token Rotation, where a new refresh token is issued every time a new access token is requested, invalidating the old one to prevent reuse by attackers. 
7. What is Role-Based Access Control (RBAC)?
RBAC is a method of restricting system access to authorized users based on their assigned roles (e.g., "admin," "editor," "user"). In a JWT context, roles are often embedded as claims in the payload. When a request is made, the server decodes the JWT, checks the roles claim, and grants or denies access based on those permissions. 
8. Implementing Authorization in an API
Extract Token: Retrieve the JWT from the Authorization: Bearer token header.
Verify Signature: Use the server's secret or public key to verify that the token hasn't been tampered with.
Check Expiration: Ensure the exp claim is in the future.

Enforce Permissions: Extract user roles or scopes from the payload and check them against the required permissions for the specific API endpoint (RBAC). 

Theoretical Questions
1. What is HTTPS? How does it differ from HTTP?
2. Explain SSL/TLS. What is the SSL handshake process?
3. What is encryption? Explain symmetric vs asymmetric encryption.
4. What are certificates? What is a Certificate Authority (CA)?
5. What is the difference between authentication and authorization?
6. Explain session-based authentication. How do sessions work?
7. What are cookies? What are the security attributes of cookies (HttpOnly, Secure, SameSite)?
8. What is token-based authentication? How does it differ from session-based auth?

Theoretical Questions
1. HTTPS vs. HTTP: HTTPS (Hypertext Transfer Protocol Secure) is an encrypted version of HTTP. While HTTP sends data in plaintext (vulnerable to prying eyes), HTTPS uses SSL/TLS to encrypt requests and responses, ensuring data confidentiality, integrity, and authenticity.
2. SSL/TLS & Handshake: SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are protocols that provide secure internet communication. The TLS handshake process established in 2025 involves:
    * Client/Server Hello: Exchanging supported versions and cipher suites.
    * Authentication: The server sends its digital certificate to prove its identity.
    * Key Exchange: Using asymmetric encryption to securely share a "session key".
    * Encrypted Communication: Both parties switch to faster symmetric encryption for the rest of the session.
3. Symmetric vs. Asymmetric Encryption:
     Symmetric: Uses a single shared key for both encryption and decryption.
      It is fast and efficient for bulk data 
    Asymmetric: Uses a public key for encryption and a private key for decryption. It is slower but more secure for identity verification and initial key exchange
4. Certificates & Certificate Authority CA A digital certificate is an electronic "ID card" that binds a public key to an entity's identity. A CA is a trusted third-party organization (e.g., DigiCert) that validates an applicant's credentials before signing and issuing their certificate.
5. Authentication vs. Authorization:
     Authentication (AuthN): Verifies "Who are you?"  login credentials
     Authorization (AuthZ): Determines "What can you do?" (e.g., permissions to edit vs. view). AuthN always happens before AuthZ.
6. Session-based Authentication: The server creates a unique session ID after login, stores it in memory or a database, and sends it to the client via a cookie. For every subsequent request, the browser sends this cookie, and the server validates it against its stored sessions.
7. Cookies & Security Attributes: Cookies are small pieces of data stored on the client. Key security attributes include:
     HttpOnly: Prevents JavaScript from accessing the cookie 
     Secure: Ensures the cookie is only sent over HTTPS.
     SameSite: Restricts cookies from being sent on cross-site requests
8. Token-based vs. Session-based: Session-based auth is stateful (server must remember sessions), while token-based (e.g., JWT) is stateless. In token-based auth, the server issues a signed token to the client, which includes all necessary user info; the server does not need to store it, making it more scalable for modern distributed systems. 

1. What is Node.js? How does it differ from browser JavaScript?
Node.js: It is a runtime environment that lets you run JavaScript code on your computer or a server, outside of a web browser. It is built on Google Chrome's V8 JavaScript engine.
Differences:
Environment: Browser JS runs on the client-side (frontend); Node.js runs on the server-side (backend).
Capabilities: Node.js can interact with your operating system, like reading/writing files (fs module), which browser JS cannot do for security reasons.
Objects: Browsers have the window and document (DOM) objects; Node.js does not have these but has a global object and process.
2. What is the Event Loop in Node.js?
Definition: The event loop is the "brain" or core mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded.
How it works: It continuously monitors the call stack and the callback queue. When the stack is empty, it picks tasks from the queue and executes them.
Phases: It works in cycles called "ticks," moving through phases like Timers (setTimeout), Poll (I/O events), and Check (setImmediate).
3. What is non-blocking I/O? How does Node.js achieve it?
Non-blocking I/O: This means the program doesn't "pause" and wait for a slow task (like reading a huge file) to finish before moving to the next line of code.
Achievement: Node.js offloads these slow tasks to the system kernel or a background thread pool (via the libuv library). While the task runs in the background, the main thread keeps working on other things.
4. Difference between Synchronous and Asynchronous code
Synchronous: Code is executed line-by-line. If a line is slow, the whole program stops and waits (blocking).
Asynchronous: Slow tasks are started and then "ignored" until they finish. The program continues to the next line immediately (non-blocking).
5. What are Callbacks? What is Callback Hell?
Callbacks: A function passed as an argument to another function, which gets executed once a task is done.
Callback Hell: When you nest multiple callbacks within each other (making a pyramid shape), the code becomes unreadable and very hard to debug.
6. What are Promises? How do they solve Callback Hell?
Promises: An object representing the eventual completion (or failure) of an asynchronous operation.
Solution: Instead of nesting, Promises allow you to use chaining (.then()). This makes the code look "flatter" and more linear, which is much easier to read.
7. What is async/await? How does it work internally?
Definition: It is "syntactic sugar" built on top of Promises that makes asynchronous code look and behave like synchronous code.
Internal Workings: When you await a Promise, the execution of that specific function is paused, and the Promise is added to the microtask queue. The event loop continues running other code until the Promise resolves, then it resumes the function.
8. Difference between process.nextTick() and setImmediate()?
process.nextTick(): Executes immediately after the current operation finishes, before the event loop moves to the next phase. It has the highest priority.
setImmediate(): Executes in the Check phase of the event loop, typically after the I/O (Poll) phase is complete.
9. What are Streams? Name the types.
Streams: They allow you to process data piece-by-piece (chunks) without loading the entire thing into memory, which is great for large files.
Types:
Readable: For reading data (e.g., fs.createReadStream).
Writable: For writing data (e.g., fs.createWriteStream).
Duplex: Can both read and write (e.g., a network socket).
Transform: A type of Duplex stream that modifies data as it is read/written 
10. What is the Buffer class in Node.js? (Student writing way)
Imagine this: You’re watching a YouTube video on slow internet. The video stops to "buffer"—it's downloading small chunks of data into a temporary storage spot so it can play them smoothly.
Definition: The Buffer class is a way to handle binary data (raw data like 0s and 1s) directly in Node.js.
Why we need it: JavaScript originally didn't have a way to handle binary data well (it was made for text). Node.js uses Buffers to deal with things like TCP streams or reading images and files from the disk
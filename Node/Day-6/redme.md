1. Core Modules in Node.js
Core modules are built-in libraries that come with the Node.js installation and can be used without installing external packages via npm. They are accessed using the require() or import syntax. 
10 Core Modules:
fs: File system operations.
path: Utilities for handling file and directory paths.
http: Creating HTTP servers and clients.
https: Handling encrypted HTTP streams.
os: Provides information about the operating system.
events: Implements the EventEmitter class for event-driven programming.
crypto: Handles OpenSSL cryptographic functions (hashing, encryption).
util: Internal utility functions (e.g., promisify).
stream: Handles streaming data.
buffer: Handles binary data. 
2. The 'fs' Module: fs vs. fs/promises
The fs (File System) module allows you to interact with the file system (reading, writing, deleting files). 
fs: The traditional module. It primarily uses callbacks for asynchronous operations (e.g., fs.readFile(path, callback)). It also includes synchronous versions (e.g., fs.readFileSync), which block the event loop.
fs/promises: A modern sub-module that returns Promises for all asynchronous operations. This allows the use of async/await syntax, making code cleaner and easier to manage than nested callbacks. 
3. The 'path' Module
The path module provides utilities for working with file and directory paths. It is essential for ensuring cross-platform compatibility, as Windows uses backslashes (\) while POSIX (Linux/macOS) uses forward slashes (/). Common methods include path.join() to combine segments and path.resolve() to create an absolute path. 
4. EventEmitter Class
The EventEmitter class (from the events module) is the core of Node.js's event-driven architecture. Many built-in objects (like http.Server) inherit from it. 
How to use it:
Import the module: const EventEmitter = require('events');
Initialize an instance: const myEmitter = new EventEmitter();
Define a listener: myEmitter.on('greet', () => console.log('Hello!'));
Emit the event: myEmitter.emit('greet'); 
5. Difference between on() and once()
on(eventName, listener): Adds a listener that will be triggered every time the event is emitted.
once(eventName, listener): Adds a listener that will be triggered only once. After the first time the event is fired, the listener is automatically removed. 
6. Error Handling in EventEmitters
If an EventEmitter instance emits an 'error' event and there are no listeners registered for it, the Node.js process will throw the error to the stack trace and crash. 
Best Practice: Always register a listener for the 'error' event:
myEmitter.on('error', (err) => console.error('Caught error:', err)); 
7. The 'cluster' Module
The cluster module allows you to create child processes (workers) that run simultaneously and share the same server port. 
Why use it? Node.js runs on a single thread. On a multi-core CPU, a single instance of Node.js won't utilize all cores. cluster allows you to spawn one worker per CPU core to handle higher traffic and provide load balancing. 
8. Child Processes
Child processes are separate instances of the OS process spawned by a parent Node.js process. You use them to run CPU-intensive tasks (like image processing or complex calculations) or to execute shell commands without blocking the main event loop. 
9. Difference between spawn, exec, and fork
spawn: Best for large amounts of data. It returns a stream (stdout/stderr). It starts the process and sends data in chunks.
exec: Best for small amounts of data and shell commands. It buffers the entire output and returns it in a callback. It has a default max buffer size (usually 200KB); if exceeded, the process crashes.
fork: A specialized version of spawn specifically for Node.js modules. It creates a new V8 instance and establishes a communication channel (IPC) between the parent and child to send messages back and forth
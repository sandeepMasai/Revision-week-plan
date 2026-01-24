const path = require("path");
const FileWatcher = require("./watcher");

const watchDirectory = path.join(__dirname, "watch-dir");

const watcher = new FileWatcher(watchDirectory);

//  Event Listeners

watcher.on("file-added", (file) => {
  console.log(`[${new Date().toISOString()}] File Added: ${file}`);
});

watcher.on("file-modified", (file) => {
  console.log(`[${new Date().toISOString()}]  File Modified: ${file}`);
});

watcher.on("file-deleted", (file) => {
  console.log(`[${new Date().toISOString()}]  File Deleted: ${file}`);
});

watcher.on("error", (error) => {
  console.error(`[${new Date().toISOString()}]  Error:`, error.message);
});

console.log(" Watching directory:", watchDirectory);

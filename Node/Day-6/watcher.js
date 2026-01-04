const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class FileWatcher extends EventEmitter {
  constructor(directory) {
    super();
    this.directory = directory;
    this.files = new Set();

    this.init();
  }

  init() {
    try {
      // Load initial file snapshot
      const existingFiles = fs.readdirSync(this.directory);
      existingFiles.forEach((file) => this.files.add(file));

      this.watch();
    } catch (err) {
      this.emit("error", err);
    }
  }

  watch() {
    fs.watch(this.directory, (eventType, filename) => {
      if (!filename) return;

      const filePath = path.join(this.directory, filename);

      try {
        const exists = fs.existsSync(filePath);

        // FILE ADDED
        if (exists && !this.files.has(filename)) {
          this.files.add(filename);
          this.emit("file-added", filename);
        }

        // FILE DELETED
        if (!exists && this.files.has(filename)) {
          this.files.delete(filename);
          this.emit("file-deleted", filename);
        }

        // FILE MODIFIED
        if (exists && this.files.has(filename)) {
          this.emit("file-modified", filename);
        }
      } catch (err) {
        this.emit("error", err);
      }
    });
  }
}

module.exports = FileWatcher;

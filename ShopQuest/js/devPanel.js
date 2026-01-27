const logs = getFromLS("api_logs", []);

function logRequest(entry) {
  logs.unshift(entry);
  if (logs.length > 5) logs.pop();
  saveToLS("api_logs", logs);
  renderLogs();
}

function renderLogs() {
  const panel = document.getElementById("devpanel");
  if (!panel) return;
  panel.innerHTML = logs
    .map(
      (l) =>
        `<li>${l.method} ${l.url} → ${l.status} (${l.duration}ms) [${l.source}]</li>`,
    )
    .join("");
}

renderLogs();

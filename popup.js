// Load saved mode on popup open
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["mode"], (data) => {
    const savedMode = data.mode || "normal";
    document.querySelector(`input[value="${savedMode}"]`).checked = true;
  });
});

// Apply selected mode and save it
document.getElementById("apply").addEventListener("click", async () => {
  const mode = document.querySelector('input[name="mode"]:checked').value;

  // Save the preference
  await chrome.storage.sync.set({ mode: mode });

  // Apply the filter
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"]
    }, () => {
      chrome.tabs.sendMessage(tabs[0].id, { mode: mode });
    });
  });
});

interface Settings {
  apiUrl: string
  accessToken: string
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "save") {
    console.log("save-button clicked", request.data)
    chrome.storage.local.set({ settings: request.data }, () => {
      if (chrome.runtime.lastError) {
        console.log("Error saving settings:", chrome.runtime.lastError)
        sendResponse({ success: false, error: chrome.runtime.lastError })
      } else {
        console.log("Settings saved successfully")
        sendResponse({ success: true })
      }
    })
  } else if (request.action === "load") {
    console.log("load-button clicked", request.data)
    chrome.storage.local.get("settings", (data) => {
      sendResponse({ data: data.settings })
    })
  }
  return true
})

chrome.runtime.onInstalled.addListener(() => {
  // Load default settings on installation
  chrome.storage.local.get("settings", (data) => {
    console.log("install", data)
    if (!data.settings) {
      const defaultSettings: Settings = {
        apiUrl: "https://example.com/api",
        accessToken: "your_access_token",
      }
      chrome.storage.local.set({ settings: defaultSettings })
    }
  })
  return true
})

// Background service worker for PumpGBA Extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('PumpGBA Extension installed');
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: 'https://pumpgba.minimaxi.space'
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhanceGaming') {
    // Apply gaming enhancements
    sendResponse({success: true});
  }
});
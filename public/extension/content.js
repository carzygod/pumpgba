// Content script for PumpGBA Extension

// Inject gaming enhancements
function enhanceGaming() {
  // Add performance optimizations
  const style = document.createElement('style');
  style.textContent = `
    canvas {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }
    
    .gba-emulator {
      filter: brightness(1.1) contrast(1.05);
    }
  `;
  document.head.appendChild(style);
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceGaming);
} else {
  enhanceGaming();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhance') {
    enhanceGaming();
    sendResponse({success: true});
  }
});
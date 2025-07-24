function openPumpGBA() {
  chrome.tabs.create({
    url: 'https://pumpgba.minimaxi.space'
  });
}

// Initialize extension
document.addEventListener('DOMContentLoaded', function() {
  console.log('PumpGBA Extension loaded');
});
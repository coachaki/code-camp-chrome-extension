// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

let backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

console.log(backgroundPageConnection);

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    backgroundPageConnection.postMessage({
        name: 'changeColor',
        tabId: chrome.devtools.inspectedWindow.tabId
    });
    console.log('button clicked')
});
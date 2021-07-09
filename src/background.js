let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
    chrome.contextMenus.create({
        "id": "setBackgroundColor",
        "title": "Set Background Color"
    });
    console.log('Adding item to context menu 2.')
});

chrome.contextMenus.onClicked.addListener(async () => {
    console.log('clicked context menu item');
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});


// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}
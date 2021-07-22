let color = '#3aa757';
let connections = {};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
    chrome.contextMenus.create({
        "id": "gettingStarted",
        "title": "Getting Started"
    });

    chrome.contextMenus.create({ title: 'Set Background Color', id: 'setBackgroundColor', parentId: 'gettingStarted' }, function () {
        console.log('context menu added');
    });
    chrome.contextMenus.create({ title: 'Console Log Click Data', id: 'consoleLogClickData', parentId: 'gettingStarted' }, function () {
        console.log('context menu added');
    });

    console.log('Adding item to context menu 2.')
});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId == 'setBackgroundColor') {
        // do action 1
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
        });

    } else if (info.menuItemId == 'consoleLogClickData') {
        console.log(info, tab);
    }
});

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}
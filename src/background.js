let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
    chrome.contextMenus.create({
        "id": "setBackgroundColor",
        "title": "Set Background Color"
    });
    console.log('Adding item to context menu.')
});


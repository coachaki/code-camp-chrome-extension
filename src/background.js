let color = '#3aa757';
let connections = {};

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

chrome.runtime.onConnect.addListener(function (port) {

    let extensionListener = function (message, sender, sendResponse) {

        console.log('message parsing');

        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
          connections[message.tabId] = port;
          console.log(connections);
          return;
        }

        if (message.name == "changeColor") {
          console.log(connections, message);
            chrome.scripting.executeScript({
                target: { tabId: message.tabId },
                function: setPageBackgroundColor,
            });
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });

    console.log("devtools listener added");
});


// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}
// let color = '#3aa757';
const menuItemPrefix = 'publink-';

chrome.runtime.onMessage.addListener((message, sender) => {
    switch (message) {
        case 'publishedInfo set':
            // could do more things here if needed
            break;
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId.startsWith(menuItemPrefix)) {
        const url = info.menuItemId.slice(menuItemPrefix.length);
        chrome.tabs.create({ url: url, active: true, index: tab.index + 1 });
    } else {
        switch (info.menuItemId) {
            default:
                console.log(info, tab);
        }
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.publishedInfo) {
        updateContextMenu(changes.publishedInfo.newValue);
    }
})

function updateContextMenu(values) {
    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
        id: "omniPubURL",
        title: "Omni Published Page",
        contexts: ['link']
    }, function () {
        values.forEach((item, index) => {
            chrome.contextMenus.create({
                parentId: 'omniPubURL',
                id: menuItemPrefix + item.url,
                title: item.name,
                contexts: ['link']
            });
        });
    });
}

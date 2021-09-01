let color = '#3aa757';
let connections = {};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
    chrome.contextMenus.create({
        id: "omniPubURL",
        title: "Omni Published Page",
        contexts: ['link']
    }, function () {
        // add the children items in the callback function since we only want to create these if the parent item creation succeeds.
        chrome.contextMenus.create({ contexts: ['link'], title: 'Published Page', id: 'omniPubURL1', parentId: 'omniPubURL' }, function () {
            console.log('omniPubURL1 item added.');
        });
        chrome.contextMenus.create({ contexts: ['all'], title: 'Console Log Click Data', id: 'consoleLogClickData', parentId: 'omniPubURL' }, function () {
            console.log('consoleLogClickData item added.');
        });
    });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId == 'consoleLogClickData') {
        console.log(info, tab);
    } else if (info.menuItemId === 'omniPubURL1') {
        const linkUrl = info.linkUrl;
        if (linkUrl.match(/\/dispatch/g)) {
            const stagingPath = linkUrl.slice(linkUrl.indexOf('%2F'));
            const site = linkUrl.split(/\/+/)[5];
            chrome.storage.local.set({ stagingPath: stagingPath, site: site }, function () {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: openPublishedFile
                });
            });
        }
    }
});

// The body of this function will be executed as a content script inside the current page
function openPublishedFile() {
    chrome.storage.local.get(['site', 'stagingPath'], function (result) {
        const site = result.site;
        const stagingPath = result.stagingPath;
        fetch(`/files/info?site=${site}&path=${stagingPath}`)
            .then(res => res.json())
            .then(data => {
                window.open(data.info.http_path, '_blank');
            });
    });
}
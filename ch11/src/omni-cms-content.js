window.addEventListener("mouseover", function (e) {
    if (e.target instanceof HTMLAnchorElement && e.target.href && e.target.href.indexOf('//') != -1) {
        const href = e.target.href;
        getPublishedInfo(href);
    }
});

function getStagingPathFromUrl(url) {
    const pattern = /^.*((\/preview)|(\/dispatch)|(\/editimage\/staging))(\/.*)$/;
    const match = window.decodeURIComponent(url).match(pattern)

    if (match) {
        return stagingPath = match[5];
    }
    return null;
}

function getPublishedInfo(href) {
    const stagingPath = getStagingPathFromUrl(href);
    const site = href.split(/\/+/)[5];
    if (stagingPath) {
        fetch(`/files/published?site=${site}&path=${stagingPath}`)
            .then(res => res.json())
            .then(data => {
                chrome.storage.local.set({
                    publishedInfo: data.products.map((item) => { return { is_primary: item.is_primary, name: item.name, url: item.targets[0].url } })
                        .sort((a, b) => { if (a.is_primary && b.is_primary) { return 0 } else if (a.is_primary) { return -1 } else if (b.is_primary) { return 1 } else { 0 } })
                }, () => {
                    chrome.runtime.sendMessage('publishedInfo set');
                });
            });
    }
}
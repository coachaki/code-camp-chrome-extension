import components from './api/components.mjs';

const color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({color});
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


// components.getAll('http://a.cms.omniupdate.com')
//     .then((data) => {
//       console.log(data);
//     });

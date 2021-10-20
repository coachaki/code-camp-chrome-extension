/* eslint-disable require-jsdoc */
// Initialize button with user's preferred color
import components from './api/components.mjs';
const componentsBody = document.getElementById('components');

// chrome.storage.sync.get('color', ({color}) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener('click', async () => {
//   const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

//   components.getAll('http://a.cms.omniupdate.com')
//       .then((data) => {
//         console.log(data);
//       });
// });

components.getAll('https://a.cms.omniupdate.com')
    .then((data) => {
      console.log(data);
    });


function buildComponentsHtml() {
  const html = '';
}

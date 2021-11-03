/* eslint-disable require-jsdoc */
// Initialize button with user's preferred color
import components from './api/components.mjs';
import {core} from './api/core.mjs';

const componentsBody = document.getElementById('components');

document.addEventListener('change', (event) => {
  const name = event.target.closest('tr').dataset.name;
  const value = event.target.value;

  switch (event.target.dataset.key) {
    case 'group':
      console.log(value, name);
      console.log(components.save(name, {group: value}));
      console.log('access group set');
      break;
    case 'wysiwyg_render':
      console.log(value, name);
      console.log(components.save(name, {wysiwyg_render: value == 'true'}));
      console.log('access group set');
      break;
    default:
      console.log(event);
      break;
  }
});

components.getAll({sort: 'name'})
    .then((data) => {
      console.log(data);
      buildComponentsHtml(data);
    });


async function buildComponentsHtml(data) {
  const accessGroups = await core.listGroups();

  let html = `
  <table class="table responsive">
    <thead>
      <tr>
        <th>Name</th>
        <th>Lock Status</th>
        <th>Saved</th>
        <th>Launched</th>
        <th>Access Group</th>
        <th>WYSIWYG Render</th>
      </tr>
    </thead>`;

  html += `<tbody>`;
  data.forEach((item) => {
    html += `
    <tr data-name="${item.title}">
      <td>${item.title}</td>
      <td>${item.lock || 'Unlocked'}</td>
      <td>${item.modified}</td>
      <td>${item.launched || 'Never'}</td>
      <td>${buildGroupDropdown(accessGroups, item.group)}</td>
      <td>${buildWYSIWYGDropdown(item.wysiwyg_render)}</td>
    </tr>`;
  });
  html += `</tbody>`;

  html += `</table>`;

  componentsBody.innerHTML = html;
}

function buildGroupDropdown(groupList, currentGroup) {
  let html = `
  <select data-key="group">
    <option value=""
      ${currentGroup == undefined ? ' selected' : ''}>
      (Administrators Only)
    </option>`;

  groupList.forEach((item) => {
    html += `
      <option value="${item.name}"
        ${item.name == currentGroup ? ' selected' : ''}>
        ${item.name}
      </option>`;
  });
  html += `</select>`;

  return html;
}

function buildWYSIWYGDropdown(currentValue) {
  return `
  <select data-key="wysiwyg_render">
    <option value="true"
      ${currentValue ? ' selected' : ''}>
      Yes
    </option>
    <option value="false"
      ${!currentValue ? ' selected' : ''}>
      Blue Pill
    </option>
  </select>`;
}

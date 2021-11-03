import {config} from './core.mjs';

const components = {
  defaultType: 'generic',
  getAll: async function(options = {}, host = config.host) {
    const path = `/rs/components?${new URLSearchParams(options)}`;
    return fetch(host + path, {...config.fetchOptions})
        .then((response) => response.json())
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:',
              error);
        });
  },
  get: async function(name, host = config.host) {
    if (name == undefined) {
      return;
    }
    const path = `/rs/components/${this.defaultType}/${name}`;
    return fetch(host + path, config.fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:',
              error);
        });
  },
  save: async function(name, changes = {}, host = config.host) {
    if (name == undefined) {
      return;
    }

    const path = `/rs/components/${this.defaultType}/${name}`;
    const data = await this.get(name);
    const newData = {...data, ...changes};
    return fetch(host + path, {...config.fetchOptions,
      method: 'put',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(newData),
    });
  },
  revert: async function(name, host = config.host) {
    if (name == undefined) {
      return;
    }

    const path = `/rs/components/versions/${this.defaultType}/${name}`;
    const data = await this.get(name);
    const currentVersion = data.version;

    if (currentVersion > 1) {
      return fetch(host + path, {...config.fetchOptions,
        method: 'put',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: currentVersion-1,
      })
          // .then((response) => response.json())
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:',
                error);
          });
    }
  },
};

export default components;

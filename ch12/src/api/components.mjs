const components = {
  defaultOptions: {credentials: 'include'},
  getAll: async function(host, options = {}) {
    const path = '/rs/components';
    return fetch(host + path, this.defaultOptions)
        .then((response) => response.json())
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:',
              error);
        });
  },
  get: async function(host, name = '') {
    const type = 'generic';
    const path = `/rs/components/${type}/${name}`;
    return fetch(host + path, this.defaultOptions)
        .then((response) => response.json())
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:',
              error);
        });
  },
};

export default components;

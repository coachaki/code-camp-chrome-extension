const config = {
  host: 'https://a.cms.omniupdate.com',
  fetchOptions: {credentials: 'include'},
};

const core = {
  listGroups: async function(options = {}, host = config.host) {
    const path = '/groups/list';
    return fetch(host + path, {...config.fetchOptions, ...options})
        .then((response) => response.json());
  },
};

export {core, config};

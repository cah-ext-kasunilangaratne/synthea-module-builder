const BACKEND_URL = process.env['REACT_APP_BACKEND'];

const ModuleService = {
  requestConfig: {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ sessionStorage.getItem('token')
    }
  },
  getModules() {
    this.requestConfig.method = 'GET';
    this.requestConfig.body = null;
    return fetch(BACKEND_URL + '/modules', this.requestConfig)
      .then(response => response.json());
  },
  getModuleVersionsList(moduleName) {
    this.requestConfig.method = 'GET';
    this.requestConfig.body = null;
    return fetch(BACKEND_URL + '/modules?name=' + moduleName, this.requestConfig)
      .then(response => response.json());
  },
  getModule(moduleId) {
    this.requestConfig.method = 'GET';
    this.requestConfig.body = null;
    return fetch(BACKEND_URL + `/modules/`+ moduleId, this.requestConfig)
      .then(response => response.json());
  },

  updateModule(moduleId, data) {
    this.requestConfig.method = 'PUT';
    this.requestConfig.body = JSON.stringify(data);
    return fetch(BACKEND_URL + '/modules/' + moduleId, this.requestConfig)
      .then(response => response.json());
  },

  createModule(data){
    this.requestConfig.method = 'POST';
    this.requestConfig.body = JSON.stringify(data);
    return fetch(BACKEND_URL + '/modules', this.requestConfig)
      .then(response => response.json());
  }
};

export default ModuleService;
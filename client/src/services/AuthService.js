const BACKEND_URL = process.env['REACT_APP_BACKEND'];

const AuthService = {
  requestConfig: {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  },

  login(data) {
    this.requestConfig.body = JSON.stringify(data);
    return fetch(BACKEND_URL + '/auth', this.requestConfig)
      .then(response => response.json());
  },
  
  register(data){
    this.requestConfig.body = JSON.stringify(data);
    return fetch(BACKEND_URL + '/users', this.requestConfig)
      .then(response => response.json());
  }
};

export default AuthService;
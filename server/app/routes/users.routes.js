module.exports = (app) => {
    const users_controller = require('../controllers/users.controller.js');

    // Recors a new user
    app.post('/register', users_controller.create);

    // Authenticate user on login
    app.post('/authenticate', users_controller.authenticate);
}
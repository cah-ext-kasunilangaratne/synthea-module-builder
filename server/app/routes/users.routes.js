module.exports = (app) => {
    const users_controller = require('../controllers/users.controller.js');

    // Recors a new user
    app.post('/users', users_controller.create);

    // Authenticate user on login
    app.post('/auth', users_controller.authenticate);

    //List all users
    app.get('/users', users_controller.listall)
};
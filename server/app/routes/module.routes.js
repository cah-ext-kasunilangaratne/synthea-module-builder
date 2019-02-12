var cors = require('cors')


var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = (app) => {
    const module_controller = require('../controllers/module.controller.js');

    // Create a new Disease
    app.post('/module', cors(corsOptions), module_controller.create);

    // Retrieve all Diseases
    app.get('/module', module_controller.findAll);

    // Retrieve a single Disease with diseaseId
    app.get('/module/:moduleId', module_controller.findOne);

    // Update a Disease with diseaseId
    app.put('/module/:moduleId', module_controller.update);

    // Delete a Disease with diseaseId
    app.delete('/module/:moduleId', module_controller.delete);
}
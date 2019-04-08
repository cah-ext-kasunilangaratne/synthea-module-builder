module.exports = (app) => {
    const module_controller = require('../controllers/module.controller.js');
    
    // Create a new Disease
    app.post('/modules', verifyToken, module_controller.create);

    // Retrieve all Diseases
    app.get('/modules', verifyToken, module_controller.findAll);

    // Retrieve a single Disease with diseaseId
    app.get('/modules/:moduleId', verifyToken, module_controller.findOne);

    // Update a Disease with diseaseId
    app.put('/modules/:moduleId', verifyToken, module_controller.update);

    // Delete a Disease with diseaseId
    app.delete('/modules/:moduleId', verifyToken, module_controller.delete);
};

function verifyToken (req, res, next){
    const bearerHeader = req.headers['authorization'];

    if (typeof(bearerHeader !== undefined)){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.status(403).send({
            message: "User Unauthenticated"
        })
    }
}
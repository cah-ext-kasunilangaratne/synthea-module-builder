const jwt = require('jsonwebtoken');

const Module_model = require('../models/module.model.js');

function verify(req,res){
    jwt.verify(req.token, req.app.get('secretKey'), (err, AuthData) => {
        if(err){
            res.status(403).send({
                message: "Unauthorized"
            })
        }
    })
}

// Create and Save a new Module_model
exports.create = (req, res) => {
    // Validate request
    verify(req,res);
    
    if(!req.body.states) {
        console.log("Module states empty")
        return res.status(400).send({
            message: "Module_model states can not be empty"
        });
    }

    // Create a Module
    const syn_module = new Module_model({
        name: req.body.name || "Untitled Module", 
        remarks: req.body.remarks,
        states: req.body.states,
        submodule: req.body.submodule || false,
        relPath:req.body.relPath || req.body.name,
        active:req.body.active || true,
        updatedTimeStamp: req.body.updatedTimeStamp
    });

    // Save Module in the database
    syn_module.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Module_model."
        });
    });
};

// Retrieve and return all modules from the database.
exports.findAll = (req, res) => {
    verify(req,res);

    let name = req.query.name

    if(name){
        records=Module_model.find({name: name})
    }else{
        records=Module_model.find({})
    }

    records.find({})
    .select('name').select('submodule').select('relPath').select('active').select('updatedTimeStamp')
    .sort('name')
    .then(syn_modules => {
        res.status(200).send(syn_modules);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving synthea modules."
        });
    });
};

// Find a single syn_module with a moduleId
exports.findOne = (req, res) => {
    verify(req,res);
    
    Module_model.findById(req.params.moduleId)
    .then(syn_module => {
        if(!syn_module) {
            return res.status(404).send({
                message: "Module_model not found with id " + req.params.moduleId
            });            
        }
        res.send(syn_module);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Module_model not found with id " + req.params.moduleId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving syn_module with id " + req.params.moduleId
        });
    });
};

// Update a syn_module identified by the moduleId in the request
exports.update = (req, res) => {
    // Validate Request
    verify(req,res);

    // console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', '*')
    if(!req.body.states) {
        return res.status(400).send({
            message: "Module states can not be empty"
        });
    }

    // Find syn_module and update it with the request body
    Module_model.findByIdAndUpdate(req.params.moduleId, {
        name: req.body.name || "Untitled Module",
        remarks: req.body.remarks,
        states: req.body.states,
        submodule: req.body.submodule,
        relPath:req.body.relPath,
        active:req.body.active,
        updatedTimeStamp: req.body.updatedTimeStamp
    }, {new: true})
    .then(syn_module => {
        if(!syn_module) {
            return res.status(404).send({
                message: "Module not found with id " + req.params.moduleId
            });
        }
        res.send(syn_module);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Module not found with id " + req.params.moduleId
            });                
        }
        return res.status(500).send({
            message: "Error updating syn_module with id " + req.params.moduleId
        });
    });
};

// Delete a syn_module with the specified moduleId in the request
exports.delete = (req, res) => {
    verify(req,res);

    res.setHeader('Access-Control-Allow-Origin', '*')
    Module_model.findByIdAndRemove(req.params.moduleId)
    .then(syn_module => {
        if(!syn_module) {
            return res.status(404).send({
                message: "Module not found with id " + req.params.moduleId
            });
        }
        res.send({message: "This module was successfully deleted!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Module not found with id " + req.params.moduleId
            });                
        }
        return res.status(500).send({
            message: "Could not delete syn_module with id " + req.params.moduleId
        });
    });
};

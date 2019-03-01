const mongoose = require('mongoose');

const moduleSchema =  mongoose.Schema({
    name: String
    ,remarks: String
    ,states: Object
    ,submodule: Boolean
    ,relPath: String
    ,active: Boolean
    ,updatedTimeStamp: Date    
},{
    versionKey: false
});

module.exports = mongoose.model('synthetics_module_model', moduleSchema, 'module'); 

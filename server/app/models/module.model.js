const mongoose = require('mongoose');

const module_schema =  mongoose.Schema({
    name: String
    ,remarks: String
    ,states: Object
    ,active: Boolean
    ,updatedTimeStamp: Date    
},{
    versionKey: false
});

module.exports = mongoose.model('synthetics_module_model', module_schema, 'module'); 

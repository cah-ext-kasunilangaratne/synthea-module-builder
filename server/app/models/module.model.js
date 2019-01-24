const mongoose = require('mongoose');

const module_schema =  mongoose.Schema({
    name: String
    ,states: Object    
}, {
    timestamps: false
});

module.exports = mongoose.model('synthetics_module_model', module_schema, 'module'); 

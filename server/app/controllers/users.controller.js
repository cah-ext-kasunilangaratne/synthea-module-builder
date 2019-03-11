const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const User_Model = require('../models/users.model.js');



exports.create = (req, res) => {
    if(!req.body.password || !req.body.email || !req.body.name) {
        return res.status(400).send({
            message: "User Data can not be empty"
        });
    }

    User_Model.countDocuments({email: req.body.email})
    .exec( function(err, count){
        if (err){
            console.log(err)
        }

        if(count>0){
            res.status(409).send({
                message:"User already exists"
            });
        }else{
            // Create a Module
            const user_module = new User_Model({
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password
            });

            // Save Module in the database
            user_module.save()
            .then(data => {
                res.status(201).send({
                    message:"User successfully created"
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User"
                });
            });
        }
    })          
}

exports.authenticate = (req,res) => {
    
    User_Model.countDocuments({email: req.body.email})
    .exec( function(err, count){
        if (err){
            console.log(err)
        }

        if(count>0){   
            User_Model.findOne({email: req.body.email})
            .exec(function (err, userInfo){
                if ( err ){
                    console.log(err)
                } else {
                    if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                        res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
                    }else{
                        res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }    
                }
            })
        }
    }) 
    
}

exports.listall = (req, res) => {
    records=User_Model.find({})

    records.find({})
    .select('name').select('email')
    .then(syn_modules => {
        res.status(200).send(syn_modules);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
}
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
    
    User_Model.count({email: req.body.email})
    .exec( function(err, count){
        if (err){
            // next(err)
        }

        console.log(count)
        if(count>0){   
            User_Model.findOne({email: req.body.email})
            .exec(function (err, userInfo){
                var err = doc.validateSync();
                if ( err ){
                    console.log(err)
                } else {
                    if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                        console.log("USER FOUND")
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                        res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
                    }else{
                        res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }    
                }
            })
        }
    })    
    // .catch(err => {
    //     return res.status(500).send({
    //         message: "Error authenticating user: " + req.body.email
    //     });
    // });
    
}

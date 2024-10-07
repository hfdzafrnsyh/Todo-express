'use strict';

const Model = require('../database/models/index');
const Users = Model.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports.register = async (req,res,next) => {
       
    let data = {
        name  : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        confirm_password : req.body.confirm_password     
    }

    try{

     const user = await Users.findOne({where : { email : data.email }});

        if(user){
            res.status(400).json({
                error : 'User has registered',    
            })
        }else{

            let request = {
                name : data.name,
                email : data.email,
                phone : data.phone,
                password : bcrypt.hashSync(data.password,10)
            }

           const userCreate = await Users.create(request);


            const newUser = ({
                id : userCreate.id,
                name : userCreate.name,
                email : userCreate.email,
                phone : userCreate.phone
            })

            res.status(200).json({
                message : 'Create User Successfully',
                data : newUser,    
            })

        }



    }catch(error){
        res.status(500).json({
            error : 'Internal server error',    
        })
    }

}

module.exports.login = async (req,res,next) => {

        let data = {
            email : req.body.email,
            password : req.body.password     
        }


        try{


            const SECRET = process.env.SECRET;

            const user = await Users.findOne({ where : { email : data.email } });

        if(!user){
            res.status(404).json({
                error : 'User not registered',    
            })
        }else if(user && bcrypt.compareSync(data.password,user.password)){
           

                const token = jwt.sign({
                    userId : user.id
                },
                    SECRET,
                {
                    expiresIn : '1d'
                })

                const hasLogin = ({
                    id : user.id,
                    name : user.name,
                    email : user.email
                })

                res.status(200).json({
                        data : hasLogin,
                         token : token
                    })
        }else{
            res.status(400).json({
                error : 'Wrong password',    
            })
        }
        
        }catch(error){
            res.status(500).json({
                error : 'Internal server error',    
            })
        }
    
}
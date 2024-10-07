'use strict'
const  Model  = require('../database/models/index');
const Users = Model.users;

module.exports.getUser = async (req,res) => {


    try{
        const user = await Users.findAll({ attributes : [ 'id','name' , 'email' , 'phone' , 'createdAt']});

        res.status(200).json({
            data : user
        })

    }catch(error){
        res.status(500).json({
            message : 'Internal server error'
        })
    }



}


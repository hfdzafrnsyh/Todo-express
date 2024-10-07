const Model = require('../database/models/index');
const Todo = Model.todo;
const jwt = require('jsonwebtoken');


module.exports.getTodo = async (req,res) => {

        try{
            const todos = await Todo.findAll();
            res.status(200).json({
                data : todos
            })
        }catch(error){
            res.status(500).json({
                'message' : 'Internal server error',
                'error' : error
            })
        }

}


module.exports.createTodo = async (req,res) => {


    let data = {
        title : req.body.title,
        userId : req.user.userId
    }

    try{


        const todo = await Todo.create(data);
        
        res.status(200).json({
            data : todo
        })

    }catch(error){
        res.status(500).json({
            'message' : 'Internal server error',
            'error' : error
        })
    }

}



module.exports.detailTodo = async (req,res) => {

    try{

        const todo = await Todo.findOne({ where : { id : req.params.id} });

        if(!todo){
            res.status(404).json({
                'message' : 'Todo not found'
            })
        }else{

            res.status(200).json({
                data : todo
            })
        }


    }catch(error){
        res.status(500).json({
            'message' : 'Internal server error',
            'error' : error
        })
    }

}


module.exports.updateTodo = async (req,res) => {

    try{

        const todo = await Todo.findOne({ where : { id : req.params.id} });

        if(!todo){
            res.status(404).json({
                'message' : 'Todo not found'
            })
        }else{

            let newTodo = {
                title : req.body.title,
                userId : req.user.userId
            }

             await todo.update( newTodo,{ where : { id : todo.id }});

            res.status(200).json({
                data : todo
            })
           
        }


    }catch(error){
        res.status(500).json({
            'message' : 'Internal server error',
            'error' : error
        })
    }

}




module.exports.deleteTodo = async (req,res) => {

    try{

        const todo = await Todo.findOne({ where : { id : req.params.id} });

        if(!todo){
            res.status(404).json({
                message : 'Todo not found'
            })
        }else{


             await todo.destroy();

            res.status(200).json({
                message : 'Delete todo Succes'
            })
           
        }


    }catch(error){
        res.status(500).json({
            message : 'Internal server error',
            error : error
        })
    }

}
'use strict'
const express = require("express");
var router = express.Router();
const cors = require('cors');
const TodoController = require('../../controller/TodoController');

const {AuthUsersJwt , AuthUser} = require('../../middleware/Auth');
const ErrorValidation = require('../../middleware/ErrorValidation');
const TodoRequest = require('../../request/TodoRequest');

router.use(cors());


router.get('/todo',AuthUsersJwt(), AuthUser, TodoController.getTodo);
router.post('/todo/create' ,AuthUsersJwt(),AuthUser, TodoRequest , ErrorValidation, TodoController.createTodo);
router.get('/todo/:id/detail' ,AuthUsersJwt(), AuthUser, TodoController.detailTodo);
router.put('/todo/:id/update' , AuthUsersJwt(), AuthUser , TodoRequest , ErrorValidation,  TodoController.updateTodo);
router.delete('/todo/:id/delete' , AuthUsersJwt(), AuthUser , TodoController.deleteTodo);



module.exports = router;
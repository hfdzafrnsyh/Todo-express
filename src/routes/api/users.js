const express = require("express");
const cors = require('cors');
const router = express.Router();
const UserController = require('../../controller/UserController');
const {AuthUsersJwt , AuthUser} = require('../../middleware/Auth');


router.use(cors());


router.get('/user', AuthUsersJwt() , AuthUser, UserController.getUser)



module.exports = router;
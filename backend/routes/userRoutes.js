const express = require('express')
const router = express.Router();

const{
    RegisterUser,
    LoginUser
} = require('../controller/userController')

router.route('/user/register').post(RegisterUser)
router.route('/user/login').post(LoginUser)
module.exports = router;
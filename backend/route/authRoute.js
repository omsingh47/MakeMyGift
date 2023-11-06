const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
// const fetchuser = require('../middleware/fetchuser')  
const {createUser, loginUser, changePassword} = require("../controller/authCtrl")


router.post('/createuser', [            
    body('name', 'Name minimum length should be 2').isLength({ min: 2 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should be atleast 8 characters').isLength({ min: 8 }),
], createUser)

//ROUTE2: Authenticate a user using: POST "/api/auth/login", doesn't require login..
router.post('/loginuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should be atleast 8 characters').exists(),
], loginUser)

//ROUTE3: Get loggedin user details using: POST "/api/auth/getuser", Login required..
// router.get('/getuser', fetchuser, getUser)
router.put('/:id', changePassword)

module.exports = router;
const User = require("../models/User");
const asyncHandler = require("express-async-handler")
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Om_is_a_web-developer!!"

const createUser = asyncHandler(async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    console.log("ndnndndn");
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry! A user with this E-Mail Already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        var secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
});



const loginUser = asyncHandler(async (req, res) => {
    var success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Credentials do not Match" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Credentials do not Match" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
});


const getUser = asyncHandler(async (req,res)=>{
    try {
        let userid = req.user.id
        const user = await User.findById(userid).select("-password") //Get user id from Auth Token and getting all details from that user id from DB except password...
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
});

const changePassword = asyncHandler(async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Fetch the user ID from the authenticated user token (using the fetchuser middleware)
        const userId = req.params.id;
        console.log(userId)
        let user = await User.findById(userId);
        const oldPasswordMatches = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!oldPasswordMatches) {
            return res.status(400).json({ success, error: "Current password is incorrect" });
        }
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(req.body.newPassword, salt);
        user.password = newPasswordHash;
        await user.save();
        success = true;
        res.json({ success, message: "Password updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = { createUser, loginUser, getUser, changePassword };
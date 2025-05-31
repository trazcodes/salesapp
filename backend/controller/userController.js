const User = require("../model/user");
const mongoose = require('../db');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("One or more Fields are empty");
    }
    try {
        const userInDb = await User.findOne({ email: email });
        if (userInDb) {
            return res.status(401).json("Email is already Registered");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ result: "Signed up Successfully!" });
    } catch (error) {
        console.error('Error in addUser:', error.message);
        res.status(500).json("Internal Server Error");
    }
};

const logUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("One or more Fields are empty");
    }
    try {
        const userInDb = await User.findOne({ email: email });
        if (!userInDb) {
            console.log("Invalid Credential username");
            return res.status(401).json("Invalid Credentials");
        }
        const matched = await bcryptjs.compare(password, userInDb.password);
        if (matched) {
            const jwtToken = jwt.sign({ _id: userInDb._id }, process.env.JWT_SECRET);
            const userInfo = { email: userInDb.email, name: userInDb.name };
            return res.status(200).json({ result: { token: jwtToken, user: userInfo } });
        } else {
            console.log("Invalid credentials : Password");
            return res.status(401).json("Invalid Credentials");
        }
    } catch (error) {
        console.error('Error in logUser:', error.message);
        res.status(500).json("Internal Server Error");
    }
};

module.exports = { addUser, logUser };

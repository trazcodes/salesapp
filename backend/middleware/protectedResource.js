const jwt = require("jsonwebtoken");
const secretCode= require("../controller/userController");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const UserModel = mongoose.model("User");

const protectedResource = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "User not logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, payload)=>{
        if (error) {
            return res.status(401).json({error: "User not logged in"});

        }
        const {_id}= payload;
        UserModel.findById(_id)
        .then((dbuser)=>{
            req.user= dbuser;
            next();
        })
    });
}

module.exports= protectedResource;
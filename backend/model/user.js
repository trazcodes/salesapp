const { default: mongoose, Schema } = require("mongoose");


// =======================================================
const UserSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
const UserModel = mongoose.model('User',UserSchema);
// =======================================================

module.exports = UserModel;

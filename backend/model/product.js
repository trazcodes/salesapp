
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");



// =======================================================
const ProductSchema= mongoose.Schema({
    Pname:String,
    quantity:Number,
    price:Number,
    createdAt: { type: Date, default: Date.now },
    author: {
        type: ObjectId,
        ref:"User"
    }
})
const Product = mongoose.model('Product',ProductSchema);
// ===========================================================

module.exports= Product

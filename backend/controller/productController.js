const Product = require("../model/product");
const User = require('../model/user');
const mongoose = require('../db');
const express = require('express');
const app = express();
app.use(express.json());
const protectedRoute = require("../middleware/protectedResource");

const addProduct = async (req, res) => {
    
        const {Pname,quantity,price} = req.body;
        if(!Pname||!quantity||!price){
            return res.status(400).json({error: "One or more field empty"});
        }
        req.user.password= undefined;
        const productObj = new Product({Pname: Pname, quantity: quantity, price: price, author: req.user})
        productObj.save()
        .then((newProduct)=>{
            res.status(201).json({post: newProduct});
        })
        .catch((error)=>{
            console.log(error);
        })
};

const topProduct= async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const topSales = await Product.find({ author:req.user._id ,createdAt: { $gte: today } })
        .sort({ price: -1 })
        .limit(5);  
      res.status(200).json(topSales);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const revenue = async (req, res) => {
    try {
        const totalRevenue = await Product.aggregate([
            {
                $match: { author: req.user._id } // Filter documents by the user
            },
            {
                $group: {
                    _id: null, // Group by the author field
                    total: { $sum: "$price" } // Calculate the sum of the price field
                }
            }
        ]);

        // If totalRevenue array is empty, return 0 as total revenue
        const revenueTotal = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

        res.status(200).json(revenueTotal);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
};

    
  

module.exports= {addProduct, topProduct,revenue}

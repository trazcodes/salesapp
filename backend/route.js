



const express = require('express');
const { addUser, logUser } = require('./controller/userController');
const { addProduct, alluserallproduct, topProduct, revenue } = require('./controller/productController');
const protectedResource = require('./middleware/protectedResource');

const route = express.Router();

route.post('/signup', addUser);
route.post('/login', logUser);
route.post('/addproduct', protectedResource, addProduct);
route.get('/topsale', protectedResource,topProduct);
route.get('/revenue',protectedResource, revenue);

module.exports = route;

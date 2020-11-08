const express = require("express");
const router = express.Router();

//Allow only admin to create a new category by applying a middleware
const { requireSignIn,isAdmin,isAuth } = require("../controllers/auth");

//middleware for user id
const { userById } = require("../controllers/user");

//import create to make new category
//middleware for product id
const { create,read,remove,update,productById } = require("../controllers/product");

//product schema from models/product
const product = require("../models/product");

//new category route
//CRUD Operations
router.get("/product/:productId",read);
router.post("/product/create/:userId",requireSignIn,isAuth,isAdmin,create);
router.delete("/product/:productId/:userId",requireSignIn,isAuth,isAdmin,remove);
router.put("/product/:productId/:userId",requireSignIn,isAuth,isAdmin,update);

//route param for user id
router.param("userId",userById);

//route param for product ID
router.param("productId",productById)

module.exports = router;
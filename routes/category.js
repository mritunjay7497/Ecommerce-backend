const express = require("express");
const router = express.Router();

//Allow only admin to create a new category by applying a middleware
const { requireSignIn,isAdmin,isAuth } = require("../controllers/auth");

//middleware for user id
const { userById } = require("../controllers/user");

//import create to make new category
const { create } = require("../controllers/category");

//new category route
router.post("/category/create/:userId",requireSignIn,isAuth,isAdmin,create);

//route param for user id
router.param("userId",userById);

module.exports = router;
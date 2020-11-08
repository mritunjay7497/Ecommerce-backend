const express = require("express");
const router = express.Router();
const { signup,signin,signout,requireSignIn } = require("../controllers/auth");
const {userSignUpValidator, userSignInValidator} = require("../validator/index");

//signUp route
router.post('/signup',userSignUpValidator,signup);

//sign-in route
router.post('/signin',userSignInValidator,signin);

//sign-out route
router.get('/signout',signout);

//protected routes for signed-in user
router.get("/hello", requireSignIn,(req,res) => {
    res.send("hey buddy, how you doing?");
})

module.exports = router;
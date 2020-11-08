/**
 * This file validates the parameters entered by user during sign-up
 * Name,Email and password are vaidated
 */

 //user sign-up validator
exports.userSignUpValidator = (req,res,next) => {
    req.check('name','Name is required').notEmpty()     //check name parameter
    req.check('email','Email is required')              //check email parameter
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid Email address")
        .isLength({
            min: 5,
            max: 50
        });
    req.check('password','Password is required').notEmpty()     //check password parameter
    req.check('password')
    .isLength({
        min:8
    })
    .withMessage('Password must contain at least 8 characters')
    .matches(/\d/)  //has at least one digit regex
    .withMessage("Password must contain a digit");

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        });
    };

    next();
};

//user sign-in validator
exports.userSignInValidator = (req,res,next) =>{
    //check for email
    req.check('email','Email is required to sign-in')
        .matches(/.+\@.+\../)
        .withMessage("Invalid Email address")
        .isLength({
            min: 5,
            max: 50
        });
    //check for password
    req.check('password','Password is required to sign in').notEmpty()
    req.check('password')
    .isLength({
        min: 8
    })
    .withMessage('Password must contain at least 8 characters')
    .matches(/\d/)  //has at least one digit regex
    .withMessage("Password must contain a digit");

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        });
    };

    next();

};
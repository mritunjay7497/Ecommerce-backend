const User = require("../models/user");

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No such user exists"
            })
        }
        req.profile = user;
        next();
    });
};
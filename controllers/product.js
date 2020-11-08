const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err,product) => {
        if(err || !product){
            return res.status(400).json({
                error: "No such product found"
            });
        };
        req.product = product;
        next();
    });
};


//fetch product from product id
exports.read = (req,res) => {
    req.product.image = '';
    return res.json({
        product: req.product
    });
};



//middleware to create new product
exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };

        //check for all required fields
        const {name,description,price,category,quantity,shipping} = fields;
        const {image} = files
        if(!name || !description || !price || !category || !quantity || !shipping || !image){
            return res.status(400).json({
                error: "All fields are mandatory",
            });
        };

        

        let product = new Product(fields)

        if(files.image) {
            // console.log("FILES PHOTO: ", files.image)
            //max upload size  = 1 MB
            if(files.image.size > 1000000){
                return res.status(400).json({
                    error: "Image size too big. Max allowed size is 1 MB"
                });
            };
            product.image.data  = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.type
        }


        product.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            };
            res.json({ result })
        })

    })
};


exports.remove = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Product can't be deleted"
            });
        };
        res.json({
            "message": "following product was removed",
            deletedProduct
        });
    });
};




//Update product
exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };

        //check for all required fields
        const {name,description,price,category,quantity,shipping} = fields;
        const {image} = files
        if(!name || !description || !price || !category || !quantity || !shipping || !image){
            return res.status(400).json({
                error: "All fields are mandatory",
            });
        };

        

        let product = req.product;
        product = _.extend(product,fields);

        if(files.image) {
            // console.log("FILES PHOTO: ", files.image)
            //max upload size  = 1 MB
            if(files.image.size > 1000000){
                return res.status(400).json({
                    error: "Image size too big. Max allowed size is 1 MB"
                });
            };
            product.image.data  = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.type
        }


        product.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            };
            res.json({ result })
        })

    })
};
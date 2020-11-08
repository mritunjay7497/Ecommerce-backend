const express = require("express");        
const mongoose = require("mongoose");   //To connect to mongoDb database
const morgan = require("morgan");       //To log request details
const bodyParser = require("body-parser");      //parses incoming request bodies to hand it over to the middlewares
const cookieParser = require('cookie-parser');  //to  parse cookie from request body
const expressValidator = require("express-validator");      //to validate user input
require('dotenv').config();     //To get values from environment variables of this program (.env file)


//import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")


//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("\n[*] DATABASE CONNECTED\n"))
.catch((err) => console.error("[*] unable to connect to database\n[*] Run mongo_repair bash script in home directory"))


//middlewares
app.use(morgan('dev'));     //morgan middleware
app.use(bodyParser.json());     //body parser middleware in json format
app.use(cookieParser());        //cookie parser middleware
app.use(expressValidator());    //validate user input

//routes middleware
//route for incoming api request
app.use('/api',authRoutes)      //authorization API route
app.use('/api',userRoutes)      //user profile routes
app.use('/api',categoryRoutes)  //crating a new category routes
app.use('/api',productRoutes)   //creating a new product routes

const port = process.env.PORT || 8000;      //port to run server on

//listener
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
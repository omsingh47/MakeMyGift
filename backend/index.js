const express = require("express")
const app = express();
// const dotenv = require("dotenv").config();
const PORT = 5000;
const bodyParser = require("body-parser");
// const authRouter = require("./route/productRoute")
const productRouter = require("./route/productRoute")
const cartRouter = require("./route/cartRoute")
const cookieParser = require("cookie-parser");
const dbConnect = require("../backend/config/dbConnect")
dbConnect();
const morgan = require('morgan');
var cors = require('cors')


app.use(cors({
    origin: `http://localhost:5000`,
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.use(morgan("dev")); //Tells us about the request we make in terminal..
// app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
// app.get('/api/product', function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
//   })
// app.use(notFound);
// app.use(errorHandler);

 
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})
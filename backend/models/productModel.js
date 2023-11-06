const { default: mongoose } = require("mongoose");

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    product_id:{
        type:String,
        lowercase:true
    },
    shop_tag:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    images:{
        type: Array,
    },
    sold: {
        type:Number,
        default:0,
        select:false //To hide it
    },
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);

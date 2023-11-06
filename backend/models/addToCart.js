
const { default: mongoose } = require("mongoose");
var cartSchema = new mongoose.Schema({
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
    price:{
        type:Number,
        required: true,
    },
    images:{
        type: Array,
    },
    cust_text:{
        type:String,
        default:""
    },
    cust_images:{
        type: String
    },
    user:{
        type: String, 
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Cart", cartSchema);

const { default: mongoose } = require("mongoose");

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    slug:{
        type:String,
        unique: true,
        lowercase:true
    },
    shop_tag:{
        type:String,
        unique:true, 
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
    color:{
        type: String,
        enum: ["Black, Brown", "Red"],
    },
    ratings: [{
        star: Number,
        postedby: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    }],
    sold: {
        type:Number,
        default:0,
        select:false //To hide it
    },
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);

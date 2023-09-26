const { default: mongoose } = require("mongoose");

var cartSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    shop:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required: true,
    },
    quantity:{
        type: Number,
        default: 1
    },
    images:{
        type: Array,
    },
    user:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Cart", cartSchema);

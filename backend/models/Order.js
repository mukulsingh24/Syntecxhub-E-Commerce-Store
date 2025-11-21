const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    orderedItems:[{
        name:{
            type:String,
        },
        quantity:{
            type:Number
        },
        Image:{
            type:String
        },
        price:{
            type:Number
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
    }],
    totalPrice:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        required:true,
    },
    paidAt:{
        type:Date,
    }
})
module.exports = mongoose.model('Order',OrderSchema)
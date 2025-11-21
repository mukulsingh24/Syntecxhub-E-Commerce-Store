const Order = require('../models/Order')
const AddOrderItems = async(req,res)=>{
    try{
        const {orderItems , totalPrice,user}  = req.body
        const Add = new Order({
            orderItems,totalPrice,user,
            isPaid:false,
            paidAt:Date.now()
        })
        if(orderItems && orderItems.length === 0){
            return res.status(400).json({message:"No order items"})
        }
        const newOrder = await Add.save()
        res.status(201).json({newOrder,message:"Order Added Successfull"})
    }
    catch(err){
        res.status(500).json({message:"Error Adding Order"})
    }

}

const getAllOrders = async(req,res) =>{
    try{
        const get = await Order.find({}).populate("user","name email");
        res.status(200).json({get,message:"Order Recieved"})
        
    }
    catch(err){
        res.status(500).json({message:"Error Getting Order"})
    }
}
module.exports = {AddOrderItems,getAllOrders}
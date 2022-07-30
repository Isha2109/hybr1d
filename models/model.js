const mongoose=require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    username:{
        type: String
    },
    password:{
        type:String
    },
    userType:{
        type:String
    },
    token:{
        type: String
    },
    seller_id:{
        type:String
    },
    itemId:{
        type: String
    },
    itemName:{
        type:String
        },
    itemCategory:{
        type:String
    },
    itemPrice:{
        type:Number
    },
    orderQuantity:{
        type:Number
    },
    orderId:{
        type:String
    },
    orderDate:{
        type:Date
    },
    totalItemQuantity:{
        type:Number
    }
})

module.exports = mongoose.model('ecommuser', userSchema)
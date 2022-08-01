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
    catalog:{
        type: [ { type: Schema.Types.Mixed }]
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

var userSchema = mongoose.model('ecommuser', userSchema)

module.exports = {
    userSchema
}

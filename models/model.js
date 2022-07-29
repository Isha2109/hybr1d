const mongoose=require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    username:{
        type: String,
        unique: true
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
        type:String,
        unique: true
    },
    itemId:{
        type: String,
        unique: true
    },
    itemName:{
        type:String
        },
    itemCategory:{
        type:String
    },
    itemPrice:{
        type:Number
    }
})

module.exports = mongoose.model('ecommUser', userSchema)
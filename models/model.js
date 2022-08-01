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
    orders:[{ type: Schema.Types.Mixed}]
})

var userSchema = mongoose.model('ecommuser', userSchema)

module.exports = {
    userSchema
}

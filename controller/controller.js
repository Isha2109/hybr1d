const userSchema = require('../models/model')

async function userCheck(regObj){
    try{
        data = await userSchema.findOne({username: regObj.username})
        if (data) return {message:"user exists"}
        else return {message:"user not found"}
    }
    catch(ex){
        return false
    }
}
async function registerUser(regObj){
    request = new userSchema(regObj)
    try{
        if(regObj.userType == "seller" || regObj.userType == "buyer")
        {
            await request.save()
            return {message:"user registered"}
        }
        else return {message:"not valid"}
    }
    catch(ex){
        return false
    }
}

module.exports = {registerUser, userCheck}
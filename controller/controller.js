const userSchema = require('../models/model')
const {getSellerId} = require('../general/general')

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
    console.log(request)
    try{
        if(request.userType == "buyer")
        {
            await request.save()
            return {message:"user registered"}
        }
        else if(regObj.userType =="seller")
        {
            //getSellerId
            //ok = await getSellerId()
            await request.save()
            seller_id = await getSellerId()
            data = await userSchema.updateOne({ username : regObj.username},{$set : {seller_id: seller_id}})
            if(data) return {message:"user registered"}
            else return {message:"not valid"}
        }
        else return {message:"not valid"}
    }
    catch(ex){
        console.log(ex)
        return false
    }
}

async function tokenDeleteFunction(username){
    try{
        tokenExpire = await userSchema.updateOne({ username : username},{$set : {token: null}})
        if(tokenExpire.modifiedCount) return true
        else return false
    }
    catch(ex){
        console.log(ex)
        return false
    }
}

async function userExistsCheck(loginObj){
    try {
        data = await userSchema.findOne({username: loginObj.username})
        if(data) return true
        else return false
    }
    catch(e){
        return false
    }
}

async function tokenCheck(loginObj){
        try{
            loginCheck = await userSchema.findOne({username: loginObj.username})
            if(!loginCheck.token) return false
            else return true
        }
        catch(e){
            console.log(e)
            return false
        }
}

async function tokenAddFunction(loginObj){
    try{
        ok = await userSchema.updateOne({ username : loginObj.username},{$set : {token: loginObj.token}})
        if(ok) return true
        else return false
    }catch(ex){
        console.log(ex)
        return false
    }
}

async function passCheck(loginObj){
    try{
            passFlag = await userSchema.findOne({username: loginObj.username}, {password: loginObj.password})
            if(passFlag) return true
            else return false

        }
    catch(ex){
        return false
    }
}

async function userLogoutCheck(logoutObj){
    try{
        logoutCheck = await userSchema.findOne({username : logoutObj.username })
        if(logoutCheck){
            if(logoutCheck.token) return {data:{message:"success"}}
            else return {data:{message:"failure"}}
        }
        else return {data:{message:"user not found"}}
    }
    catch(ex){
        return {data:{message:"failure"}}
    }
}
async function userLogout(logoutObj){
    try{
        logoutStatus = await userSchema.updateOne({ username : logoutObj.username},{$set : {token: null}})
        if(logoutStatus.modifiedCount) return true
        else return false
    }
    catch(ex){
        return {data:{message:"failure"}}
    }
}

module.exports = {registerUser, userCheck, tokenDeleteFunction, userExistsCheck, tokenCheck, passCheck, tokenAddFunction, userLogoutCheck, userLogout}
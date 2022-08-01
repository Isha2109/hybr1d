const { userSchema } = require('../models/model')

async function listOfSellers(username) 
{

    userInfo = await userSchema.findOne({
        username : username, 
        userType : {
            $eq: "buyer"
        }
    })
    if(!userInfo){
        return { statusMessage:"not a buyer", data:[] }
    }
    try{
        
        var sellerData = await userSchema.find({ seller_id : { $ne:null }},{_id:0, catalog : 1, username:1 });
        return { statusMessage:null , data: sellerData }
    }
    catch(e){{
        console.log(e)
    }}
}

async function viewCatalogFunction(seller_id, username)
{
    //seller valid, sellerid itemname?, itemname details
    userInfo = await userSchema.findOne({
        username : username, 
        userType : {
            $eq: "buyer"
        }
    })
    if(!userInfo){
        return { statusMessage:"not a buyer", data:{} }
    }
    var sellerData = await userSchema.findOne(
        { seller_id : seller_id},
        { _id: 0, catalog:1 })
    return { statusMessage:null , data: sellerData }
}

async function createOrder(orderReqObj){
    try{
        ok = await userSchema.findOne({ seller_id:orderReqObj.seller_id })
        if(ok){
            orderObj = { 
                username: orderReqObj.username,
                orderedItems : orderReqObj.items,
                orderDate : new Date()
            }
            ok = await userSchema.findOne( { 
                seller_id:orderObj.seller_id 
            },{
                $push: {
                    orders:{
                        orderObj
                    }}
            })

            if (ok) {
                return {message: "order created"}
            }
            else {
                return {message: "order creation failed"}
            }
        }
        else{
           return { message:"not a seller" }
        }
    }
    catch(e){
        console.log(e)
    }
}



module.exports = {listOfSellers, viewCatalogFunction, createOrder}
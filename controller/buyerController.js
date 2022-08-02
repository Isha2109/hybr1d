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
        userInfo = await userSchema.findOne({
            username : orderReqObj.username, 
            userType : {
                $eq: "seller"
            }},{
                catalog:1, _id:0
            }
        )
        if(!userInfo){
            return { message:"not a buyer", data:{} }
        }
        else{
            orderObj = { 
                username: orderReqObj.username,
                orderedItems : orderReqObj.items,
                orderDate : new Date()
            }
            for (let i in orderReqObj.items){
                for (let j in userInfo.catalog){
                    if(orderReqObj.items[i].itemName != userInfo.catalog[j].itemName && orderReqObj.items[i].itemCategory != userInfo.catalog[j].itemCategory){
                        return { message: "item not in catalog" }
                    }
                }
            }
            ok = await userSchema.findOneAndUpdate( { 
                seller_id:orderReqObj.seller_id 
            }
            ,{
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
    }
    catch(e){
        console.log(e)
    }
}



module.exports = {listOfSellers, viewCatalogFunction, createOrder}
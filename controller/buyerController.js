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
        
        var sellerData = await userSchema.find({ seller_id : { $ne:null }});
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

//orderid, order quantity, order
//apis- place order, view orders, check qauntity(stock), update if can place order or not, update total quantity in db, set default itemquantity to 100




module.exports = {listOfSellers, viewCatalogFunction}
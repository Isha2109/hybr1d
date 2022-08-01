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

async function viewCatalogFunction(seller_id)
{
    //seller valid, sellerid itemname?, itemname details
    ok = await userSchema.find({seller_id:seller_id})
    if(ok)
    {
        if(ok[0].itemName)
        {
                try{
                    itemName = ok[0].itemName
                    result = await userSchema.find({itemName:itemName},{itemCategory:1, _id:0, itemPrice:1, itemName:1})
                    return {"sellerName": ok[0].username, "sellerId": ok[0].seller_id, "itemDetails": result[1]}
                }
                catch(ex){
                    console.log(ex)
                }
        }
        else{
            return {message:"no items found for seller"}
        }
    }
    else{
        return {message:"seller not found"}
    }
}

//orderid, order quantity, order
//apis- place order, view orders, check qauntity(stock), update if can place order or not, update total quantity in db, set default itemquantity to 100




module.exports = {listOfSellers, viewCatalogFunction}
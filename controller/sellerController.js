const userSchema = require('../models/model')
const {getItemId} = require('../general/general')


async function addItemsToDatabase(prodObj) 
{
    request = new userSchema(prodObj)
        try{
            data = await request.save()
            if(data) return {message:"item added"}
            else return {message:"not added"}
        }
        catch(e){{
            console.log(e)
        }}
}

async function getAllItemsFunction(){
    try{
    data = await userSchema.find({},{_id:0, itemId:1, itemName:1, itemCategory:1, itemPrice:1})
    if(data) return data
    else return false
    }
    catch(ex){
        console.log(ex)
    }
}

async function createCatalogFunction(catObj){
    ok = await userSchema.findOne({seller_id:catObj.seller_id})
    if(ok)
    {
        if(!ok.itemName)
            {
                ok = await userSchema.findOne({itemName:catObj.itemName})
                if(ok)
                {
                    ok = await userSchema.findOne({seller_id:catObj.seller_id}, {itemName:1})
                        if(!ok.itemName){
                                try{
                                    data = await userSchema.updateOne({seller_id: catObj.seller_id},{$set : {itemName: catObj.itemName}})
                                if(data) return {message:"success"}
                                else return {message:"failure"}
                                }
                                catch(ex){
                                    console.log(ex)
                                }
                            }
                        else{
                            return {message:"item already exists for seller"}
                        }
                }
                else{
                    return {message:"failure"}
                }
            }
            else{
                return {message:"seller already selling an item"}
            }
    }
    else{
        return false
    }

}





module.exports = {addItemsToDatabase, getAllItemsFunction, createCatalogFunction }
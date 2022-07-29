const userSchema = require('../models/model')
const {getItemId} = require('../general/general')


async function addItemsToDatabase(prodObj) 
{
    request = new userSchema(prodObj)
        try{
            await request.save()
            itemId = await getItemId()
            data = await userSchema.updateOne({ itemName : prodObj.itemName},{$set : {itemId: itemId}})
            console.log(data)
            if(data) return {message:"item added"}
            else return {message:"not added"}
        }
        catch(e){{
            console.log(e)
        }}
}

async function getAllItemsFunction(){
    try{
    data = await userSchema.find({},{_id:0, itemId:1, itemName:1, itemCategory:1})
    if(data) return data
    else return false
    }
    catch(ex){
        console.log(ex)
    }
}





module.exports = {addItemsToDatabase, getAllItemsFunction }
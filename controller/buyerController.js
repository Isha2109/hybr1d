const userSchema = require('../models/model')

async function listOfSellers() 
{
        try{
            var result = await userSchema.find({},{ _id:0 ,  username:1, seller_id:1 });
            console.log(result)
            return result
        }
        catch(e){{
            console.log(e)
        }}
}





module.exports = {listOfSellers }
var cuid = require('cuid')
const crypto = require("crypto");

async function getSellerId(){
   var sellerId = cuid.slug()
   return sellerId
}
async function getItemId(){
    var itemId = crypto.randomBytes(6).toString("hex");
    return itemId
 }

module.exports= {
    getSellerId, getItemId
}

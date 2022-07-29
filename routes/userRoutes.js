const express= require('express');
const router = express.Router();
const {userLogoutCheck, userLogout} = require('../controller/controller')
const {listOfSellers} = require('../controller/buyerController')
const {addItemsToDatabase, getAllItemsFunction} = require('../controller/sellerController')


router.put('/logout', async function(req, res){
    let logoutObj ={
        username: req.query.username
    }
    console.log(logoutObj)
    //user exists, already logged out? 
    ok = await userLogoutCheck(logoutObj)
    if(ok.data.message == "user not found" ){
        res.status(404).send({status:"ok", data:{ message:"User not found"}})
    }
    else if(ok.data.message == "success"){
        ok = await userLogout(logoutObj)
        if(ok){
            res.status(200).send({status:"ok", data:{ message:"User Logged Out"}})
        }
        else{
            res.status(404).send({status:"ok", data:{ message:"Logout Unsuccessful"}})
        }
    }
    else{
        res.status(422).send({status:"ok", data:{message:"User already logged out, please login again"}})
    }
})

router.get('/list-of-sellers', async function(req, res){
    ok = await listOfSellers()
   // console.log(ok[0])
    if(ok) res.status(200).send({status:"ok", message:"list of sellers", data: ok})
    else res.status(200).send({status:"ok", message:"no seller found"})

})
//add items to my db
//get api to show items to seller to create catalogue
router.post('/products', async function(req,res){
    let prodObj={
        itemName: req.body.itemName,
        itemCategory: req.body.itemCategory
        }
    ok = await addItemsToDatabase(prodObj)
    if(ok.message=="item added"){
        res.status(200).send({status:"ok", message:"item added successfully"})
    }
    
    else if(ok.message=="not added"){
        res.status(200).send({status:"ok", message:"product not added"})
    }
    else res.status(404).send({status:"ok", message:"an unknown error occured"})
})
router.get('/getAllItems', async function(req,res){
    ok = await getAllItemsFunction()
    if(ok) res.status(200).send({status:"ok", message:"list of items", data: ok})
    else res.status(404).send({status:"ok", message:"no items found"})
})


module.exports=router;

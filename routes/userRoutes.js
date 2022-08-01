const express= require('express');
const router = express.Router();
const {userLogoutCheck, userLogout} = require('../controller/controller')
const {listOfSellers, viewCatalogFunction, createOrder} = require('../controller/buyerController')
const {addItemsToDatabase,} = require('../controller/sellerController');
const { getItemId } = require('../general/general');


router.put('/logout', async function(req, res){
    let logoutObj ={
        username: req.query.username
    }
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
    username = req.username.username
    result = await listOfSellers(username)
    if(result.data) res.status(200).send({status:"ok", message:"list of sellers", data: result})
    else if(result.statusMessage == "not a buyer"){
        res.status(400).send({status:"ok", message:"not a buyer"})
    }
    else res.status(400).send({status:"ok", message:"no seller found"})

})
//add items to my db
//get api to show items to seller to create catalogue
router.post('/addProducts', async function(req,res){
    let catalog = req.body.catalog
    let username = req.username.username

    ok = await addItemsToDatabase(catalog, username)
    if(ok.message == "not a seller"){
        res.status(400).send({status:"ok", message:"not a seller"})
    }
    else if(ok.message=="item added"){
        res.status(200).send({status:"ok", message:"catalog added successfully"})
    }
    
    else if(ok.message=="not added"){
        res.status(400).send({status:"ok", message:"catalog addition failed"})
    }
    else res.status(404).send({status:"ok", message:"an unknown error occured"})
})

//show catalogue

router.get('/seller-catalog/:seller_id', async function(req, res){
    let seller_id = req.params.seller_id
    username = req.username.username
    result = await viewCatalogFunction(seller_id, username)
    if(result.data) res.status(200).send({status:"ok", message:"catalog of seller", data: result})
    else if(result.statusMessage == "not a buyer"){
        res.status(400).send({status:"ok", message:"not a buyer"})
    }
    else res.status(400).send({status:"ok", message:"no seller found"})

})

router.post('/create-order/:seller_id', async function(req, res){
    let orderObj={
        items : req.body.items,
        seller_id: req.params.seller_id,
        username: req.username.username
    }

    ok = await createOrder(orderObj)

    if(ok.message == "not a seller"){
        res.status(400).send({status:"ok", message:"not a seller"})
    }
    else if(ok.message=="order created"){
        res.status(200).send({status:"ok", message:"order added successfully"})
    }
    else if(ok.message=="order creation failed"){
        res.status(400).send({status:"ok", message:"order creation failed"})
    }
    else res.status(404).send({status:"ok", message:"an unknown error occured"})

})


module.exports=router;

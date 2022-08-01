const express= require('express');
const router = express.Router();
const {userLogoutCheck, userLogout} = require('../controller/controller')
const {listOfSellers, viewCatalogFunction} = require('../controller/buyerController')
const {addItemsToDatabase, getAllItemsFunction, createCatalogFunction} = require('../controller/sellerController');
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
router.get('/getAllItems', async function(req,res){
    ok = await getAllItemsFunction()
    if(ok) res.status(200).send({status:"ok", message:"list of items", data: ok})
    else res.status(404).send({status:"ok", message:"no items found"})
})

router.post('/create-catalog', async function(req,res){
    //catObj frontend is sending, as per user choice of products
    let catObj = {
        itemName: req.body.itemName,
        seller_id: req.body.seller_id
    }
    ok = await createCatalogFunction(catObj)
    if(ok.message=="success") res.status(200).send({status:"ok", message:"seller catalogue created"})
    else if(ok.message=="seller already selling an item") res.status(200).send({status:"ok", message:"seller already selling an item"})
    else if(ok.message=="item already exists for seller") res.status(200).send({status:"ok", message:"item already exists for seller"})
    else res.status(404).send({status:"ok", message:"no catalogue available"})

})


//show catalogue

router.get('/seller-catalog/:seller_id', async function(req, res){
    let seller_id = req.params.seller_id
    ok = await viewCatalogFunction(seller_id)
    if(ok.message=="no items found for seller") res.status(200).send({status:"ok", message:"no items found for seller"})
    else if(ok.message=="seller not found") res.status(404).send({status:"ok", message:"seller not found"})
    else res.status(200).send({status:"ok", message:ok})

})

router.post('/create-order/:seller_id', async function(req, res){
    let orderObj={
        seller_id : req.params.seller_id,
        itemName: req.body.itemName
    }

})


module.exports=router;

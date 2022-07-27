const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { createDBConn } = require('./config/db')
const { registerUser, userCheck} = require('./controller/controller')
const jwt = require('jsonwebtoken')
require(`dotenv`).config()


app.use(bodyParser.json({}))

createDBConn();

app.get('/', function(req, res) {
    res.status(200).send({status:true, message:"wrong path"})
})

app.post('/register', async function(req, res){
    let regObj = {
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType
    };
    ok = await userCheck(regObj);
    if(ok.message =="user exists"){
        res.status(200).send({status:"ok", message:"user already exists"})
    }
    else if(ok.message =="user not found"){
        ok = await registerUser(regObj);
        if(ok.message=="user registered")
        {
            res.status(200).send({status:"ok", message:"user registration successful, please login to continue"})
        }
        else if(ok.message=="not valid"){
            res.status(200).send({status:"ok", message:"user type entered is invalid"})
        }
        else{
            res.status(404).send({status:"error", message:"user registration failed due to an unknown error"})
        }
    }
    else res.status(404).send({status:"error", message:"user registration failed"})
})




app.listen(3000, ()=>{
    console.log("connection open on 3000")
})




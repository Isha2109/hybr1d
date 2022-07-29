const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { createDBConn } = require('./config/db')
const { registerUser, userCheck, userExistsCheck, tokenDeleteFunction, tokenCheck, passCheck, tokenAddFunction} = require('./controller/controller')
const jwt = require('jsonwebtoken')
require(`dotenv`).config()
const userRouter = require('./routes/userRoutes');



app.use(bodyParser.json({}))

createDBConn();

app.use('/api/buyer',async function(req,res,next){
    authHeader = req.headers["Authorization"]
    if (typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
      } 
      var token = req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).send({status:"ok", message:"Please Send JWT Token"})
    try{
        let username = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.username = username
        next()
    }catch(e){
        if(e.message =="jwt expired")
        {
            let data = await tokenDeleteFunction(req.query.username)
            if(data) res.status(401).send({status:"ok", data:{message:"Token expired"}})
            else res.status(404).send({status:"ok", data:{message:"User not found"}})
        }
        else{
        console.log(e.message)
        res.status(401).send({status:"ok", data:{message:"Unauthorized"}})
        }
    }
})

app.use('/api/seller',async function(req,res,next){
    authHeader = req.headers["Authorization"]
    if (typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
      } 
      var token = req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).send({status:"ok", message:"Please Send JWT Token"})
    try{
        let username = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.username = username
        next()
    }catch(e){
        if(e.message =="jwt expired")
        {
            let data = await tokenDeleteFunction(req.query.username)
            if(data) res.status(401).send({status:"ok", data:{message:"Token expired"}})
            else res.status(404).send({status:"ok", data:{message:"User not found"}})
        }
        else{
        console.log(e.message)
        res.status(401).send({status:"ok", data:{message:"Unauthorized"}})
        }
    }
})

app.use('/api/buyer',userRouter)

app.use('/api/seller',userRouter)



app.get('/', function(req, res) {
    res.status(200).send({status:"ok", message:"wrong path"})
})

app.post('/api/auth/register', async function(req, res){
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
        //console.log(ok)
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

app.post('/api/auth/login', async function(req, res){
    let loginObj= {
        username: req.body.username,
        password: req.body.password
        //userType from db
    }
    ok = await userExistsCheck(loginObj)
    if(ok){
        ok = await tokenCheck(loginObj)
        console.log(ok)
        if(!ok){
            ok = await passCheck(loginObj)
            console.log(ok)
            if(ok){
                try{
                    accessToken = jwt.sign( {username: loginObj.username }, process.env.ACCESS_TOKEN_SECRET)
                    }
                catch(ex){
                    console.log(ex)
                    }
                loginObj.token = accessToken
                ok = await tokenAddFunction(loginObj)
                if(ok) res.status(200).send({status:"ok", data:{message: "user logged in successfully", token: accessToken}})
                else res.status(404).send({status:"ok", message:"error occured, login again"})   
            }
            else res.status(200).send({status:"ok", message:"password invalid"})
        }
        else res.status(422).send({status:"ok", data:{message:"user already logged in"}})
    }
    else res.status(404).send({status:"error", message:"user does not exist"})
  //start with checking if user has already logged in or not
  //exists, logged in or not, password corretc, 
})


app.listen(3000, ()=>{
    console.log("connection open on 3000")
})






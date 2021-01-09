const express = require('express');

const app = express();
 
app.get("/",(req,res)=>{
    res.send("Hello World44"); 
})

app.get("/register",(req,res)=>{
    res.send("Registeration page"); 
})

app.get("/login",(req,res)=>{
    res.send("Login page"); 
})
app.listen(4000, ()=> {
    console.log("Application started")
});
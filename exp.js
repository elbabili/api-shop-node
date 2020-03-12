var express = require("express");
var app = express();

app.get("/",(req,resp)=>{
    resp.setHeader("content-type","text/html");
    resp.send("<h3> Hello express </h3>");
});

app.get("/test",(req,resp)=>{
    resp.setHeader("content-type","text/plain");
    resp.send("le test fonctionne");
});


app.get("/books/:code",(req,resp)=>{
    resp.setHeader("Content-Type","application/json");
    var infos={
        name:"mo",
        email:"elbab@gmail.com",
        code:req.params.code
    };
    resp.send(JSON.stringify(infos));
});

app.listen(7000,()=> {
    console.log("Server Started")
});
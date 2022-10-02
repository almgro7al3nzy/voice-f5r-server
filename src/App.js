'use strict'
const config = require("./config.json");
const attr = require("./signature.js");
const validateToken = require("./validate_token.js");
var app = require("express")();
var axios = require("axios");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const auth_api = config.auth_user;
const paths = ["/auth"];

// white lists domain origin
const whiteList = ["https://example.com"];
app.set("trust proxy",1);
app.use(cookieParser());
app.use(cors({
    origin:(origin,callback)=>{
       if(whiteList.indexOf(origin) === -1){
          return callback(null,false);
       }
       return callback(null,true);
    },
    methods:["POST","WSS"],
    credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
   if (!paths.includes(req.url)){
       res.sendStatus(403);
       res.end();
   }
   if (req.method.toLowerCase() != "get" && req.headers.authorization && req.headers.access && req.headers.access == "manager"){
       next();
   }
   else {
       res.status(203).json({"status":0,"msg":"auth_failed"});
       res.end();
   }
});
app.post("/auth",(req,res)=>{
   if (req.headers.authorization){
       if (validateToken(req.headers.authorization) == 0){
           res.status(203).json({"status":0,"msg":"invalid_token"});
           res.end();
       }
       else {
       axios.get(auth_api,{headers:{"authorization": decodeURIComponent(req.headers.authorization)}}).catch((error)=>{
           res.status(423).json({"status":0,"msg":"auth_failed"});
           res.end();
       })
       .then((response)=>{
           if (!Object.keys(response).includes("data")){
              res.status(423).json({"status":0,"msg":"auth_failed"});
              res.end();
           } else {
           response = response.data;
           if (response.status == 0){
                res.status(203).json({"status":0,"msg":"auth_failed"});
                res.end();
           }
           else if (response.status == 1){
                var user = response.user;
                attr.imports(attr.create(user.id),{level:user.level,type:user.type}).then((response)=>{
                     if (response == 1){
                          var arr = {id:attr.create(user.id),time:Math.ceil(new Date().getTime()/1000)};
                          var token = jwt.sign(arr,String(config.secret),{algorithm:"HS256"});
                          var sign = jwt.sign(user,String(attr.create(user.id)),{algorithm:"HS256"});
                          res.status(202).json({"status":1,"msg":"auth_successful","token":token,"sign":sign}).end();
                     } else {
                          res.status(423).json({"status":0,"msg":"auth_failed"}).end();
                     }
                });
           }}
       });
       }
   }
   else {
       res.status(423).json({"status":0,"msg":"auth_failed"});
   }
});
app.listen("4054")

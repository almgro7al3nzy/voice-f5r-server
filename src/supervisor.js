'use strict'
const axios = require("axios");
const redis = require("redis");
const config = require("./config.json");
var storage = redis.createClient();
storage.connect();
storage.on("error",(error)=>{
    process.exit();
});
storage.on("close",()=>{
    (async ()=>{
       await storage.connect();
    })();
});
module.exports = (user,id="")=>{
   return new Promise((resolve,reject)=>{
      const instance = axios.create({method:"get",baseURL:config.supervisor_api});
      var path = config.path[user];
      var path = user < 3 ? path+id : path;
      var path = user == 5 ? path+id : path;
      instance.get(path,{headers:{"admin_token":config.admin_token}}).catch((error)=>{
         reject({"status":0,"data":"server_failture"});
      }).then((response)=>{
         resolve({"status":response.data.status != 200 ? 0 : 1,"data":response.data.data});
      });
    });
}

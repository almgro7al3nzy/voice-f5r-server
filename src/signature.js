'use strict'
const config = require("./config.json");
const attr_sign = config["attr_sign"];
const { verify } = require("jsonwebtoken");
const invalid_connection = require("./invalid_connection.json");
const redis = require("redis");
const fs = require("fs");
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
var formats = (num)=>{
   var formatters = Intl.NumberFormat("fa-IR");
   return formatters.format(num);
}
module.exports = {
   get_room(user_id){
      if (Object.keys(invalid_connection.admin_room).includes(String(user_id))){
         return invalid_connection.admin_room[user_id];
      }
      return [];
   },
   add_room(user_id,connection){
      var valid = 1;
      if (Object.keys(invalid_connection.admin_room).includes(String(user_id))){
         invalid_connection.admin_room[user_id].forEach((exists)=>{
            if (String(exists[0]) == String(connection[0])){
               valid = 0;
            }
         });
         if (valid){
            invalid_connection.admin_room[user_id].push(connection);
         }
      } else {
         invalid_connection.admin_room[user_id] = [connection];
      }
      fs.writeFileSync("invalid_connection.json",JSON.stringify(invalid_connection));
      return 1;
   },
   ban_room(id){
      if (Object.values(invalid_connection.rooms).includes(id)){
         return 0;
      } else {
         invalid_connection.rooms.push(id);
         fs.writeFileSync("invalid_connection.json",JSON.stringify(invalid_connection));
         return 1;
      }
      return 0;
   },
   is_room_banned(id){
      if (Object.values(invalid_connection.rooms).includes(id)){
         return 0;
      }
      return 1;
   },
   check_size(msg){
      try {
         if (Buffer.from(msg.substring(msg.indexOf(',') + 1)).length / 1e+3 <= Number(config.allow_size)){
            return 1
         }
      } catch(e){
         return 0;
      }
   },
   is_admin_connected(room_id,admin_ids){
      try{
         Object.keys(admin_ids).forEach((key)=>{
            if (String(room_id.split("r")[0]) == String(key)){
               return 1;
            }
         });
         return 0;
      }catch(err){return 0;}
   },
   validate_chat_id(room_id,chat_id,level){
      if (level == 3 || level == 4){
         return 1;
      }
      else if (String(room_id).split("r")[1] == chat_id || String(room_id).split("r")[0] == chat_id){
         return 1;
      }
      return 0;
   },
   current_time(){
      var current_time = new Date();
      var str_clock = new Date().toLocaleDateString("fa-IR")+" "+formats(current_time.getHours())+":"+formats(current_time.getMinutes());
      return current_time.getTime(),str_clock;
   },
   verifys(num,secret){
      return new Promise((resolve,reject)=>{
         verify(num,secret,(err,response)=>{
            if (err){reject(0); }
            else if (response){resolve(response)}
            else {reject(0);}
         });
      });
   },
   exports(num){
      return new Promise((resolve,reject)=>{
         storage.get(String(num)).catch((err)=>{
            reject(1);
         }).then((result)=>{
            if (result == null){
               reject(0);
            }
            resolve(JSON.parse(result));
         });
      });
   },
   imports(num,object){
      return new Promise((resolve,reject)=>{
         storage.set(String(num),JSON.stringify(object)).catch((err)=>{
            reject(2);
         }).then((result)=>{
            resolve(1);
         });
      });
   },
   create(num){
      if (num % 1 == 0){
         return Math.pow(num,attr_sign);
      } else {
         return 0;
      }
   },
   decode(num){
      if (num % 1 == 0){
         return Math.ceil(Math.pow(num,1/attr_sign));
      } else {
         return 0;
      }
   }
}

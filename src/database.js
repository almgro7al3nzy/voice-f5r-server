'use strict'
const redis = require("redis");
const mysql = require("mysql");
var uuid = require("uuid");
var redis_client = redis.createClient();
// CREATE TABLE `messages` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`msg` VARCHAR(255),`type` enum('text','audio','file'),`from` varchar(255) NOT NULL,`read` INT(1) DEFAULT 0 ,`room_id` varchar(255) NULL,`timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
// CREATE TABLE `notification` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`title` VARCHAR(255),`body` VARCHAR(255),`user_id` varchar(255) NULL,`timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);   
function notification(recieve,user_id,title = "" ,body = "",to_all = 0 ,queris = 0){
   return new Promise((resolve,reject)=>{
      var connection = mysql.createConnection({
         host:"",
         user:"",
         password:"",
         database:"chat"
      });
      connection.connect((err)=>{
         if (err){
            connection.destroy();
            reject(err);
            return;
         }
         if (recieve){
            connection.query("SELECT title,body,timestamp FROM notification WHERE user_id = '"+user_id+"'",(err,result,fields)=>{
               if (err){
                  connection.destroy();
                  reject(err);
                  return;
               }
               connection.destroy();
               resolve(result);
            });
         } else {
            if (to_all == 0){
               connection.query("INSERT INTO `notification` (`title`,`body`,`user_id`) VALUES ('"+title+"','"+body+"','"+user_id+"')",(err,result,fields)=>{
                  if (err){
                     reject(err);
                     connection.destroy();
                     return;
                  }
                  connection.destroy();
                  resolve(1);
               });
            } else {
               connection.query(queris,(err,result,fields)=>{
                  if (err){
                     connection.destroy();
                     reject(err);
                     return;
                  }
                  connection.destroy();
                  resolve(1);
               });
            }
         }
      });
   });
}
function retrieve_redis(id){
   return new Promise((resolve,reject)=>{
      redis_client.connect().then(()=>{}).catch((err)=>{}).finally(()=>{
         redis_client.GET(id).then((audio_result)=>{
            resolve(audio_result);
         }).catch((err)=>{
            reject(err);
            return;
         });
      })
   });
}
function read(room_id,chat_id){
   return new Promise((resolve,reject)=>{
      var connection = mysql.createConnection({
         host:"",
         user:"",
         password:"",
         database:"chat"
      });
      connection.connect((err)=>{
         if (err){
            connection.destroy();
            reject(err);
            return;
         }
         connection.query("UPDATE messages set `read` = 1 WHERE `from` = '"+chat_id+"' and `read` = 0 and room_id='"+room_id+"'",(err,result,fields)=>{
            if (err){
               connection.destroy();
               reject(err);
               return;
            }
            connection.destroy();
            resolve(result);
         });
      });
   })
}
function delete_message(room_id,message_id){
   return new Promise((resolve,reject)=>{
      var connection = mysql.createConnection({
         host:"",
         user:"",
         password:"",
         database:"chat"
      });
      connection.connect((err)=>{
         if (err){
            connection.destroy();
            reject(err);
            return;
         }
         connection.query("delete from messages where id = '"+message_id+"' and room_id = '"+room_id+"';",(err,result,fields)=>{
            if (err){
               connection.destroy();
               reject(err);
               return;
            }
            query(1,room_id).then((result)=>{
               connection.destroy();
               resolve(result);
            }).catch((err)=>{
               connection.destroy();
               reject(err);
               return;
            });
         });
      });
   });
}
function query(recieve,room_id,msg="",type="",from="",read=""){
   return new Promise((resolve,reject)=>{
      var connection = mysql.createConnection({
         host:"",
         user:"",
         password:"",
         database:"chat"
      });
      connection.connect((err)=>{
         if (err){
            connection.destroy();
            reject(err);
            return;
         }
         if (recieve){
            connection.query("SELECT * FROM messages WHERE room_id = '"+room_id+"'",(err,result,fields)=>{
               if (err){
                  connection.destroy();
                  reject(err);
                  return;
               }
               connection.destroy();
               resolve(result);
            });
         } else {
            if (type == "audio" || type == "file"){
               try {
                  (async ()=>{
                     redis_client.connect().then(()=>{}).catch(()=>{}).finally(()=>{
                        var auid_id = uuid.v4();
                        redis_client.SET(auid_id+"rid"+room_id,msg).then(()=>{
                           msg = auid_id;
                           redis_client.quit();
                           connection.query("INSERT INTO `messages` (`msg`,`type`,`from`,`read`,`room_id`) VALUES ('"+msg+"','"+type+"','"+from+"','"+read+"','"+room_id+"')",(err,result,fields)=>{
                              if (err){
                                 connection.destroy();
                                 reject(err);
                                 return;
                              }
                              connection.query("SELECT * FROM messages WHERE id = "+result.insertId,(err,result,fileds)=>{
                                 if (err){ reject(err); return;}
                                    connection.destroy();
                                    resolve(result);
                              });
                           });
                        });
                     });
                  })();
               } catch(err){
                  connection.destroy();
                  reject(err);
                  return;
               }
            }
            else {
               connection.query("INSERT INTO `messages` (`msg`,`type`,`from`,`read`,`room_id`) VALUES ('"+msg+"','"+type+"','"+from+"','"+read+"','"+room_id+"')",(err,result,fields)=>{
                  if (err){
                     connection.destroy();
                     reject(err);
                     return;
                  }
                  connection.query("SELECT * FROM messages WHERE id = "+result.insertId,(err,result,fileds)=>{
                     if (err){ connection.destroy();reject(err); return;}
                     connection.destroy();
                     resolve(result);
                  });
               });
            }
         }
      });
   });
}
module.exports = {
   query,read,retrieve_redis,delete_message,notification
}

'use strict'
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { Server } = require("socket.io");
const config = require("./config.json");
const attr = require("./signature.js");
const database = require("./database.js")
const connections = require("./supervisor.js");
const express = require("express");
const bodyParse = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParse.urlencoded({extended:true}));
app.post("/notification",(req,res)=>{
   req.variables = Object.keys(req.body);
   if (req.variables.includes("to") && req.variables.includes("title") && req.variables.includes("body")){
      if (req.body["to"] != null && req.body["title"] != null && req.body["body"] != null){
      if (req.body["to"].length != 0 && req.body["title"].length != 0 && req.body["body"].length != 0){
         if (req.body["to"] == "all"){
            req.queris_mysql = "INSERT INTO `notification` (`title`,`body`,`user_id`) VALUES ";
            req.notif_title = req.body["title"];
            req.notif_body = req.body["body"];
            connections(7).then((availableConnections)=>{
               availableConnections.data.forEach((value)=>{
                  req.queris_mysql += " ('"+req.notif_title+"','"+req.notif_body+"','"+value+"'),";
                  io.sockets.sockets.forEach((val)=>{
                     if (attr.create(value) == val.chatid){
                        io.to(val.id).emit("new_notification",{"title":req.body["title"],"body":req.body["body"],"timestamp":new Date().getTime()});
                     }
                  });
               });
               req.queris_mysql = req.queris_mysql.substring(0,req.queris_mysql.length-1) + ";";
               database.notification(0,0,0,0,1,req.queris_mysql).then((result)=>{
                  res.status(200).json({"status":1,"message":"successful"});
               }).catch((err)=>{
                  res.status(503).json({"status":0,"message":"server_side_failture"});
               });
            }).catch((err)=>{
               res.status(503).json({"status":0,"message":"server_side_failture"});
            });
         } else {
            req.notif_title = req.body["title"];
            req.notif_body = req.body["body"];
            database.notification(0,req.body["to"],req.body["title"],req.body["body"]).then((result)=>{
               io.sockets.sockets.forEach((val)=>{
                  if (attr.create(req.body["to"]) == val.chatid){
                     io.to(val.id).emit("new_notification",{"title":req.body["title"],"body":req.body["body"],"timestamp":new Date().getTime()});
                  }
               });
               res.status(200).json({"status":1,"message":"successful"});
            }).catch((err)=>{
               res.status(503).json({"status":0,"message":"server_side_failture"});
            });
         }
      } else {
         res.status(503).json({"status":0,"message":"invalid data"});
      }
      } else {
         res.status(503).json({"status":0,"message":"invalid data"});
      }
   } else {
      res.status(503).json({"status":0,"message":"invalid data"});
   }
});
app.all("*",(req,res)=>{});
const httpServer = createServer(app);
const options = {
   path:"/socket",
   cors:{
      origin:"https://chat.applygermany.net/chat",
      method:["GET","POST"],
      credentials:true,
   }
}
const return_error = (io,data="")=>{
   io.on("connection",(socket)=>{
      if (data == ""){
         data = "Forbiden";
      }
      socket.emit("data",data);
      socket.disconnect();
   });
}
const io = new Server(httpServer,options);
io.use((socket,next)=>{
   io.connected_admin = {};
   const header = socket.handshake;
   var token = header.auth?.token ? header.auth.token : "null";
   var sign = header.auth?.sign ? header.auth.sign : "null";
   try {
      attr.verifys(token,String(config.secret)).catch((err)=>{return_error(io);}).then((response)=>{
         if (response != undefined){
         token = response.id;
         attr.exports(token).catch((err)=>{
            return_error(io);
         }).then((result)=>{
            attr.verifys(sign,String(token)).catch((err)=>{
               return_error(io);
            }).then((response)=>{
               if (response == undefined || !response.level || !response.type){
                  return_error(io);
               } else {
               if (result.level != response.level || result.type != response.type){
                  return_error(io);
               } else {
                  socket.connections_id = [];
                  socket.variables = [];
                  socket.variables.token = response;
                  socket.chatid = token;
                  socket.uniqid = attr.decode(token);
                  if (Number(response.type) == 1 && Number(response.level) == 1){
                     return_error(io);
                  } else {
                     socket.level_type = response.level;
                     if (socket.level_type == 2 || socket.level_type == 3){
                        connections(5,socket.level_type == 3 ? 2 : 3).then((availableConnections)=>{
                           try {
                              delete availableConnections.data[socket.uniqid];
                           } catch(err){}
                           socket.availableConnections = availableConnections.data;
                           connections(2,attr.decode(token)).then((connection_id)=>{
                              socket.connections_id = connection_id.data == "not_found" ? [] : connection_id.data;
                              next();
                           }).catch((err)=>{
                              socket.connections_id = [];
                              next();
                           });
                        }).catch((err)=>{
                           socket.availableConnections = [];
                        });
                     } else if (socket.level_type == 4){
                        connections(4).then((availableConnections)=>{
                           socket.connections_id = availableConnections.data;
                           connections(6).then((availableConnections)=>{
                              socket.availableConnections = availableConnections.data;
                              next();
                           }).catch((err)=>{
                              socket.connections_id = {};
                              socket.availableConnections = {};
                              next();
                           });
                        }).catch((err)=>{
                           socket.connections_id = {};
                           socket.availableConnections = {};
                           next();
                        });
                        io.connected_admin[socket.chatid] = {"socket_def":socket,"socket_id":socket.id};
                     } else if (socket.level_type == 1){
                        connections(1,attr.decode(token)).then((connection_id)=>{
                           socket.connections_id = connection_id.data == "not_found" ? [] : connection_id.data;
                           if (attr.get_room(socket.chatid).length > 0){
                              socket.connections_id.push(attr.get_room(socket.chatid));
                           }
                           next();
                        }).catch((err)=>{
                           socket.connections_id = [];
                           next();
                        });
                    }
                  }
               }}
            });
         });
         }
      });
   } catch(err){
      return_error(io);
   }
});
io.on("connection",(socket)=>{
   if (socket.connections_id.length > 0 || (socket.level_type == 4 && socket.availableConnections)){
      socket.emit("user_chat_id",socket.chatid);
      socket.connections_id.forEach((value)=>{
         socket.room_parse = socket.chatid > attr.create(value[2]) ? socket.chatid+"r"+attr.create(value[2]) : attr.create(value[2])+"r"+socket.chatid;
         socket.join(socket.room_parse);
         if (attr.is_admin_connected(socket.room_parse,io.connected_admin)){
            Object.keys(io.connected_admin).forEach((socket_arr)=>{
               try{
                  io.connected_admin[socket_arr]["socket_def"].join(socket.room_parse);
                  io.to(io.connected_admin[socket_arr]["socket_id"]).emit("new_rooms",socket.room_parse,value[0],value[1],[socket.variables.token.firstname,socket.variables.token.lastname],attr.is_room_banned(socket.room_parse));
               } catch(err){}
            });
         }
         io.to(socket.id).emit("chat_room_id",socket.room_parse,value[0],value[1],[],attr.is_room_banned(socket.room_parse),value[2]);
      });
      if (socket.level_type == 2 || socket.level_type == 3){
         Object.keys(socket.availableConnections).forEach((key)=>{
            socket.room_parse_admin = socket.chatid > attr.create(key) ? socket.chatid+"r"+attr.create(key) : attr.create(key)+"r"+socket.chatid;
            if (!attr.is_admin_connected(socket.room_parse_admin,io.connected_admin)){
               socket.join(socket.room_parse_admin);
               io.to(socket.id).emit("chat_room_id",socket.room_parse_admin,socket.availableConnections[key].firstname,socket.availableConnections[key].lastname,[],attr.is_room_banned(socket.room_parse_admin),key);
            }
         });
      }
      else if (socket.level_type == 4){
          Object.keys(socket.availableConnections).forEach((key)=>{
             Object.values(socket.availableConnections[key].connections).forEach((value)=>{
                socket.room_parse_admin = attr.create(key) > attr.create(value.id) ? attr.create(key)+"r"+attr.create(value.id) : attr.create(value.id)+"r"+attr.create(key);
                if (!attr.is_admin_connected(socket.room_parse_admin,io.connected_admin)){
                   socket.join(socket.room_parse_admin);
                   io.to(socket.id).emit("new_rooms",socket.room_parse_admin,value.firstname,value.lastname,[socket.availableConnections[key].firstname,socket.availableConnections[key].lastname],attr.is_room_banned(socket.room_parse_admin));
                }
            });
         });
         socket.adapter.rooms.forEach((key,value)=>{
            if (!key.has(socket.id)){
               if (!attr.is_room_banned(value)){
                  socket.join(value);
               }
            }
         });
      }
      database.notification(1,socket.uniqid).then((result)=>{
         if (result.length > 0){
            io.to(socket.id).emit("last_notification",(result));
         }
      });
      socket.on("last_message",(room_id,chat_id,msg)=>{
         if (attr.validate_chat_id(room_id,chat_id,socket.level_type) && chat_id == socket.chatid){
         database.query(1,room_id).then((response)=>{
            database.read(room_id,room_id.split("r")[0] == socket.chatid ? room_id.split("r")[1] : room_id.split("r")[0]).then((result)=>{
               io.to(socket.id).emit("last_message",(response))
            }).catch((err)=>{});
         }).catch((err)=>{
            io.to(socket.id).emit("last_message",[]);
         });
         }
      });
      socket.on("message_buffer",(id,room_id,chat_id,pass_arguments)=>{
         if (attr.validate_chat_id(room_id,chat_id,socket.level_type) && chat_id == socket.chatid){
         database.retrieve_redis(id+"rid"+room_id).then((result)=>{
            try {
               if (result.split(";")[0] == "data:application/pdf"){
                  io.to(socket.id).emit("message_buffer",result,"pdf",pass_arguments);
               } else if (result.split(";")[0] == "data:audio/ogg"){
                  io.to(socket.id).emit("message_buffer",result,"audio",pass_arguments);
               } else if (result.split(";")[0].split("/")[0] == "data:image"){
                  io.to(socket.id).emit("message_buffer",result,"image",pass_arguments);
               } else {
                  io.to(socket.id).emit("message_buffer",0,0,pass_arguments);
               }
            } catch (err){
               io.to(socket.id).emit("message_buffer",0,0,pass_arguments);
            }
         });
         }
      });
      socket.on(config.event_close,(room_id)=>{
         if (Object.keys(io.connected_admin).includes(String(socket.chatid))){
            if (attr.ban_room(room_id)){
               socket.emit("admin_event","deactive_room",[room_id]);
            }
         }
      });
      socket.on(config.event_delete,(room_id,chat_id,message_id)=>{
         if (Object.keys(io.connected_admin).includes(String(chat_id))){
            database.delete_message(room_id,message_id).then((response)=>{
               io.to(socket.id).emit("last_message",response);
               socket.to(String(room_id)).emit("last_message",response);
               socket.emit("admin_event","delete_message",[room_id,message_id]);
            }).catch((err)=>{
               io.to(socket.id).emit("last_message",[]);
               socket.to(String(room_id)).emit("last_message",[]);
            });
         }
      });
      socket.on("private_message",(room_id,chat_id,msg,type)=>{
         if (chat_id == socket.chatid){
         socket.connections_id.forEach((value)=>{
            if (attr.create(value[2]) == room_id.split("r")[1]){
               attr.add_room(room_id.split("r")[1],[room_id,socket.variables.token.firstname,socket.variables.token.lastname]);
               socket.emit("new_room_"+room_id.split("r")[1],room_id,socket.variables.token.firstname,socket.variables.token.lastname,[],attr.is_room_banned(room_id),value[2]);
            }
         });
         try {
            if (attr.is_room_banned(room_id) && socket.adapter.rooms.has(room_id) && String(msg).length > 0 && (type == "text" || type == "audio" || type == "file") && attr.validate_chat_id(room_id,chat_id,socket.level_type)){
               chat_id  = socket.level_type == 4 ? "admin" : chat_id;
               if (type == "file"){
                  if (attr.check_size(msg)){
                     database.query(0,room_id,msg,type,chat_id,0).catch((err)=>{
                        io.to(socket.id).emit("event_message",0,err);
                     }).then((response)=>{
                        io.to(socket.id).emit("event_message",1,response);
                        socket.to(String(room_id)).emit("send_private_message",response);
                     });
                  } else {
                     io.to(socket.id).emit("event_message",0,"invalid_size");
                  }
               }
               else {
                  database.query(0,room_id,msg,type,chat_id,0).catch((err)=>{
                     io.to(socket.id).emit("event_message",0,err);
                  }).then((response)=>{
                     io.to(socket.id).emit("event_message",1,response);
                     socket.to(String(room_id)).emit("send_private_message",response);
                  });
               }
            }
         } catch(err){
            io.to(socket.id).emit("event_message",0,err);
         }
         }
      });
   }
   else {
      socket.emit("data","not_chat_found");
   }
});
httpServer.listen(3003);

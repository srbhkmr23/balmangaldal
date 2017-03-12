
var express = require('express');
var path = require('path');
var app = express();
var io = require('socket.io');
var http = require('http');
var fs = require('fs');
var server = http.createServer(app);
var io = io.listen(server);

var fileName = './jsons/messages.json';
var messageFile = require(fileName);

var users=0;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', express.static(path.join(__dirname)));


server.listen(process.env.PORT || 3000,function(){
	console.log('Example app listening on port 3000....!')
});


io.on('connection', function (socket) {
      
        socket.on('message', function (from, msg) {
          console.log('recieved message from', from, 'msg', JSON.stringify(msg));
          var messageObject={
            "source":from,
            "message":msg,
            "created_at":new Date(),
            "date":new Date().toLocaleDateString(),
            "time":new Date().toLocaleTimeString('en-US', { hour12: true })
          }

          messageFile.message.push(messageObject);

          fs.writeFile(fileName, JSON.stringify(messageFile), function (err) {
            if (err){
              console.log(err);
            } 
            else{
              io.sockets.emit('broadcast',{"messages": messageFile.message});
              console.log('broadcast complete');
            } 
          });

        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
            if(users>0)
                users--;

            console.log("total users" , users);
            io.sockets.emit('broadcast', {totalUser: users});
        });

        socket.on('newUserAdded', function(msg){
             users++;
             console.log("total users" , users);
             io.sockets.emit('broadcast', {totalUser: users});
        });

        socket.on('getAllMessage', function(msg){
             io.sockets.emit('broadcast',{"messages": messageFile.message});
        });

        socket.on('typing', function(data){

            if(data.name != ""){

             // io.sockets.emit('broadcast',{"typing": data.name});

             socket.broadcast.emit('typing',{"name": data.name});
            }

        });
        

    });


// var server = app.listen(process.env.PORT || 3000,function () {

// 	console.log("process.env.PORT",process.env.PORT)
//   console.log("node server is running");
// })


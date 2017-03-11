
var express = require('express');
var path = require('path');
var app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//app.use(express.static(__dirname ));

app.use('/', express.static(path.join(__dirname)));

// app.get('/', function (req, res) {

// res.end("Hello node server");
// })




var server = app.listen(process.env.PORT || 3000,function () {

	console.log("process.env.PORT",process.env.PORT)
  console.log("node server is running");
})


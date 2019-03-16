const express = require('express');
const app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/iN.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

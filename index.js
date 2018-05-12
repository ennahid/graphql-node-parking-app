var express = require('express');
var app = express();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/parkingdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

var UsersSchema = mongoose.Schema({
  name: String
});
var User = mongoose.model('Kitten', UsersSchema);


app.get('/', function(req, res){
   res.send("hello");
});

app.listen(3000);
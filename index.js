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

var fluffy = new User({ name: 'fluffy' });

User.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

app.get('/', function(req, res){
   res.send("hello");
});

app.listen(3000);
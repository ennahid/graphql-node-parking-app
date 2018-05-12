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

UsersSchema.methods.showUser = () => {
  var greeting = this.name
    ? "my name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var User = mongoose.model('user', UsersSchema);

var user1 = new User({ name: 'ennahid' });
// user1.showUser();

user1.save((err) => {
  if (err) return console.error(err);
  console.log('done');
});

var Users;


User.find((err, users) => {
  if (err) return console.error(err);
  Users = users;
});

app.get('/', function(req, res){
   res.send("home");
});
app.get('/users', function(req, res){

  res.send(Users);
});

app.listen(3000);
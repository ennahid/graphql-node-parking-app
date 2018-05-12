var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.listen(3000);

app.use(bodyParser());

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



app.get('/', function(req, res){
   res.send("home");
});

app.get('/users', function(req, res){

  User.find((err, users) => {
    if (err) return console.error(err);
    res.send(users);
  });

});


app.get('/user/:name', (req, res) => {
  User.find({ 'name': req.params.name }, 'name',(err, user) => {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    res.send(JSON.stringify(user));
  });

});



app.post('/insertUser', function (req, res) {
  //returns the form data
  var NewUser = new User({name : req.body.name});
  NewUser.save((err) => {
    if (err) res.send('error');
    res.send(JSON.stringify(req.body));
  });
});


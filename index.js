var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const User = require('./models/UserSchema');

app.listen(3000);
app.use(bodyParser());
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql : true
}));


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
  // User.find({ 'name': req.params.name }, 'name',(err, user) => {
  //   if (err) return handleError(err);
  //   // Prints "Space Ghost is a talk show host".
  //   res.send(JSON.stringify(user));
  // });

});



app.post('/insertUser', function (req, res) {
  //returns the form data
  var NewUser = new User({name : req.body.name});
  NewUser.save((err) => {
    if (err) res.send('error');
    res.send(JSON.stringify(req.body));
  });
});


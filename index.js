var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const User = require('./models/UserSchema');

app.listen(3000);
app.use(bodyParser());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected')
});

var UsersSchema = mongoose.Schema({
    name: String
});

UsersSchema.methods.showUser = () => {
    var greeting = this.name ?
        "my name is " + this.name :
        "I don't have a name";
    console.log(greeting);
}

/* var User = mongoose.model('user', UsersSchema);

var user1 = new User({ name: 'SIMO' });
// user1.showUser();

user1.save((err) => {
    if (err) return console.error(err);
    console.log('done');
}); */

/* var Users;

app.get('/user/:name', (req, res) => {
  // User.find({ 'name': req.params.name }, 'name',(err, user) => {
  //   if (err) return handleError(err);
  //   // Prints "Space Ghost is a talk show host".
  //   res.send(JSON.stringify(user));
  // });

User.find((err, users) => {
    if (err) return console.error(err);
    Users = users;
}); */
var Users;
app.get('/', function(req, res) {
    res.send("home");
});



app.get('/users', function(req, res) {

    User.find((err, users) => {
        if (err) return console.error(err);
        Users = users;
    });
    res.send(Users);

});
app.listen(3000);
const mongoose = require('../MongooseConnection');


var UsersSchema = mongoose.Schema({
    id: String,
    name: String
});
UsersSchema.methods.showUser = () => {
    var greeting = this.name ?
        "my name is " + this.name :
        "I don't have a name";
    console.log(greeting);
}

var User = mongoose.model('user', UsersSchema);

module.exports = User;
const mongoose = require('../MongooseConnection');


var UsersSchema = mongoose.Schema({
    id : String,
    name: String
  });

var User = mongoose.model('user', UsersSchema);

module.exports = User;
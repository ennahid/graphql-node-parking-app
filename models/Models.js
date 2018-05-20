const mongoose = require('../MongooseConnection');


var UsersSchema = mongoose.Schema({
  FirstName: String,
  LastName : String,
  Email : String,
  Phone : Number,
  Password : String,
  Token : String,
  Created_At : Date,
});

var ParkingSchema = mongoose.Schema({
  Code : String,
  Name : String,
  Description : String,
  City : String,
  Address : String,
  Created_At : Date,
  latitude: Number,
  longitude: Number, 
  latitudeDelta: Number,
  longitudeDelta: Number,
  Images : Object,
  Owner : Object,
});

module.exports = {
  
  User : mongoose.model('user', UsersSchema),
  Parking : mongoose.model('parking', ParkingSchema),
  
}
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');



app.get('/', function(req, res){
   res.send("hello");
});

app.listen(3000);
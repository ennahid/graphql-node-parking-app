const graphql = require('graphql');
const GraphQLDate = require('graphql-date')
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQL,
  } = graphql

const UserType = new GraphQLObjectType({
    name : 'User',
    fields:() => ({
        FirstName: {type : GraphQLString},
        LastName : {type : GraphQLString},
        Email : {type : GraphQLString},
        Phone : {type : GraphQLInt},
        Password : {type : GraphQLString},
        Token : {type : GraphQLString},
    })
});

const ParkingType = new GraphQLObjectType({
    name : 'Parking',
    fields:() => ({
        Code :  {type : GraphQLString},
        Name :  {type : GraphQLString},
        Description :  {type : GraphQLString},
        City :  {type : GraphQLString},
        Address :  {type : GraphQLString},
        Created_At : {type : GraphQLDate},
        latitude: {type : GraphQLFloat},
        longitude: {type : GraphQLFloat}, 
        latitudeDelta: {type : GraphQLFloat},
        longitudeDelta: {type : GraphQLFloat},
        Images : {type : GraphQLObjectType},
        Owner : {type : GraphQLObjectType},
    })
});

module.exports = {
  
    UserType,
    ParkingType
  
}
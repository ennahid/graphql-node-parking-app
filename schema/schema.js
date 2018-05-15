const graphql = require('graphql');
const User = require('../models/UserSchema');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
  } = graphql

  // user1.showUser();
  
const UserType = new GraphQLObjectType({
    name : 'User',
    fields:() => ({
    name : {type : GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields:{
        User:{
            type: UserType,
            args: {
                name: {
                  type: new GraphQLNonNull(GraphQLString),
                },
              },
            resolve: async (parent, { name }, context, info) => {
                const result = await User.findOne({'name' : name});
                return result.toObject();
              }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
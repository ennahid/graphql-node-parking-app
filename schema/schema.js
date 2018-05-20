const graphql = require('graphql');
// const Models = require('../models/Models');
const { User, Parking } = require('../models/Models');
const { UserType,ParkingType } = require('../models/GraphQLModels');
var bcrypt = require('bcrypt');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
  } = graphql

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        User: {
            type: UserType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
              },
            resolve: async (parent, { name }, context, info) => {
                const result = await User.findOne({'FirstName' : name});
                return result.toObject();
              }
        },
        Users:{
            type: GraphQLList(UserType),
            args: {
                name: {
                  type: new GraphQLNonNull(GraphQLString),
                },
              },
            resolve: async (parent, { name }, context, info) => {
                const result = await User.find({'FirstName' : name});
                console.log(result);
                return result;
              }
        }
    } 
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All my Mutations',
    fields: () => ({
        InsertUser: {
        type: UserType,
        description: 'Add new User.',
        args : {
            FirstName : { type : new GraphQLNonNull(GraphQLString)},
            LastName : { type : new GraphQLNonNull(GraphQLString)},
            Email : { type : new GraphQLNonNull(GraphQLString)},
            Phone : { type : new GraphQLNonNull(GraphQLString)},
            Password : { type : new GraphQLNonNull(GraphQLString)},
            Token : { type : new GraphQLNonNull(GraphQLString)},
        },
        resolve: (value,args) => {
            var NewUser = new User({
                FirstName : args.FirstName,
                LastName : args.LastName,
                Email : args.Email,
                Phone : args.Phone,
                Password : bcrypt.hashSync(args.Password, 10),
                Token : args.Token
            });

      return new Promise((resolve, reject) => {
        NewUser.save((err,res) => {
            err ? reject(err): resolve(res);
        });
      });

        }
        }
    }),
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : MutationType,
});

// mutation{
//     InsertUser(
//       FirstName : "Abdelhadi",
//       LastName : "Ennahid",
//       Email : "Abdelhadi@gmail.com",
//       Phone : "0652248008",
//       Password : "123456789",
//       Token : "ghfhdfghe7575"
//     )
//     {
//       FirstName,
//       Phone
//     }
//   }
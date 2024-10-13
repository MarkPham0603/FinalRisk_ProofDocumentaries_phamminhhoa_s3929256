// mygraphql.js
const { createHandler } = require('graphql-http/lib/use/express');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const express = require('express');
const { users, links } = require('./data');

// Helper functions to get following and followers names
const getFollowingNames = (userId) => {
  return links.filter(link => link.from === userId).map(link => users.find(user => user.id === link.to).name);
};

const getFollowersNames = (userId) => {
  return links.filter(link => link.to === userId).map(link => users.find(user => user.id === link.from).name);
};

// Helper function to get friends
const getFriends = (userId) => {
  const following = links.filter(link => link.from === userId).map(link => link.to);
  const followers = links.filter(link => link.to === userId).map(link => link.from);
  const friendsIds = following.filter(id => followers.includes(id));
  return friendsIds.map(id => users.find(user => user.id === id));
};

// GraphQL UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    following_names: {
      type: new GraphQLList(GraphQLString),
      resolve: (user) => getFollowingNames(user.id)
    },
    followers_names: {
      type: new GraphQLList(GraphQLString),
      resolve: (user) => getFollowersNames(user.id)
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user) => getFriends(user.id)
    }
  })
});

// GraphQL RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users
    },
    friends: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => users.find(user => user.id === args.id)
    }
  }
});

// GraphQL Schema
const schema = new GraphQLSchema({
  query: RootQuery
});

// Express server setup
const app = express();
app.use('/graphql', createHandler({ schema }));

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

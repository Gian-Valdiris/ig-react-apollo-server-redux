require('graphql-import-node');
console.clear()
const {makeExecutableSchema} = require('@graphql-tools/schema')
const resolvers   = require('./resolver')
const typeDefs = require('./typeDefs.graphql');


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
module.exports = schema;

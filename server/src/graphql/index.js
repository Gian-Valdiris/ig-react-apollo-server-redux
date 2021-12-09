require('graphql-import-node');

const {makeExecutableSchema} = require('@graphql-tools/schema')
// Importar misdefinciones de los tipos typeDefs y mis resolver, y unirlos para asi crear el schema 
const resolvers   = require('./resolver')
const typeDefs = require('./typeDefs.graphql');

// creacion del schema 
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
module.exports = schema;

// nativas...
require('dotenv').config();
const express = require('express');
const http = require('http'); 
const {ApolloServer} = require('apollo-server-express');
const {success} = require('consola');
// mis funciones de aqui para abajo
const connectDb = require('./db');
const schema = require('./graphql');
const {PORT} = process.env;

async function main(){

  const app = express();
  app.get('/',(req,res)=>res.redirect('http://localhost:3001/graphql'))
  const httpServer = http.createServer(app);
  const server =  new ApolloServer({
    schema,
  })
  await server.start();
  server.applyMiddleware({app:app})
  await connectDb()  
  httpServer.listen(PORT,success(`server running  on port ${PORT} 🔥`))
}
module.exports =main;

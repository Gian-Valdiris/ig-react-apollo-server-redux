// Importaciones nativas de nodejs
require('dotenv').config();
const express = require('express');
const http = require('http'); 
const jwt = require('jsonwebtoken');
const {ApolloServer} = require('apollo-server-express');
const {graphqlUploadExpress} = require('graphql-upload');
const {success} = require('consola');// este es un paquete para que las salidas se vean mas agradables

// mis funciones de aqui para abajo
const connectDb = require('./db');
const schema = require('./graphql');

// Variables de entorno 
const {PORT} = process.env;

// funcion principal, Donde inicializamos casi todo

async function main(){
  const app = express();
  app.use(graphqlUploadExpress());
  // por si entran a una ruta que no sea, lo mandamos al server de graphQl
  app.get('/',(req,res)=>{
    return res.redirect(`http://192.168.0.29:3001/graphql`)
  })
  // empezando a crear el server de Apollo
  const httpServer = http.createServer(app);
  const server =  new ApolloServer({
    schema,
    context:async({req})=>{
      const {authorization} = req.headers;
      if (authorization){
        const token =authorization.replace('Bearer ','');
        try{
          const user = jwt.verify(token,process.env.SECRET_KEY);
          return {user}
        }
        catch({message}){ 
          console.log(message)
          // throw new Error(message)
        }
      }
      else{
        return null
      }
    }
  })
  await server.start();// -> esto es de la version 3.0
  server.applyMiddleware({app:app})// le pasamos el app de express como middleware
  await connectDb()  
  httpServer.listen(PORT,success(`server running  on port ${PORT} 🔥`))
}
// exportamos la funcion principal
module.exports =main;

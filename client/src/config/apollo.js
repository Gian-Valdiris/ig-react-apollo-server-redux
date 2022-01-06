import {ApolloClient,InMemoryCache,split} from '@apollo/client';

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';

// usamos esto para poder enviar  archivos como se debe al servidor 
import {createUploadLink} from 'apollo-upload-client';
// usamos este otro para configurar que siempre se mande el token por defecto
import {setContext} from 'apollo-link-context';

const authLink = setContext((_,{headers},)=>{
  const token = localStorage.getItem('token');

  return {
    headers:{
      ...headers,
      [token?'authorization':'token']:`Bearer ${token}`
    }
  }
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/graphql",
  options: {
    reconnect: true,
  }
});

const splitLink = split(
  ({ query }) => {
      const definition = getMainDefinition(query);
      return (  
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
      );
  },
  wsLink,
  authLink.concat(createUploadLink({uri:'http://localhost:3001/graphql'}))
);

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link:splitLink
  // link:authLink.concat(createUploadLink({uri:'http://192.168.0.29:3001/graphql'}))
})

export default client;

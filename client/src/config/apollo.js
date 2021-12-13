import {ApolloClient,InMemoryCache} from '@apollo/client';

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


const client = new ApolloClient({
  cache:new InMemoryCache(),
  link:authLink.concat(createUploadLink({uri:'http://192.168.0.29:3001/graphql'}))
})

export default client;

import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
const client = new ApolloClient({
  cache:new InMemoryCache(),
  link:createUploadLink({uri:'http://192.168.0.29:3001/graphql'})
})
export {
  client,
  ApolloProvider
}

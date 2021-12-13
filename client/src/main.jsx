// Importaciones con referente a reduc
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

// Importaciones con referente a @apollo/client
import {ApolloProvider} from '@apollo/client';
import client  from './config/apollo';


// MI componente
import App from './App';


export default function MainComponent(){
  
  return (

    <Provider store={store}>

      <PersistGate persistor={persistor}>
    
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>

    </Provider>
  )
  
}
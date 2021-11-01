import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import {ApolloProvider,client} from './config/apollo';
import {Provider}  from 'react-redux';
import App from './App';
import { store ,PersistGate,persistor} from './redux/store';


ReactDOM.render(
  
  <Provider store={store}>
  <PersistGate  persistor={persistor}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </PersistGate>
  </Provider>,
  document.getElementById('app')
);


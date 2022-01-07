import {configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './rootReducer';

// Configuracion del persistor
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
// Crear mi reducerPersistido
const persistedReducer = persistReducer(persistConfig, rootReducer)
// Proceder a crear mi storage
const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store)
export {
  persistor,
  store,
}
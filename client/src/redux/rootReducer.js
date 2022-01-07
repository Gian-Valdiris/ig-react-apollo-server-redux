import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './reducers/userAuth';
import publicationsReducer from './reducers/publications'
export const rootReducer=combineReducers({
  authReducer,
  publicationsReducer
})


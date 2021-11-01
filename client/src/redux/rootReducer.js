import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './reducers/userAuth';

export const rootReducer=combineReducers({
  authReducer
})


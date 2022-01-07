import {createSlice}  from '@reduxjs/toolkit';

const PublicationsReducer  = createSlice({
  name:'Publications_Reducer',
  initialState:{
    publications:[]
  },
  reducers:{
    setPublications(state,action){
      state.publications=action.payload
    }
  }
})


const {actions,reducer} = PublicationsReducer;
export const {setPublications} = actions;
export default reducer
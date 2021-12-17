import {createSlice} from '@reduxjs/toolkit';


const userReducer = createSlice({
  name:'User_reducer',
  initialState:{
    dataUser:null,
    token:null,
  },
  reducers:{
    setUser(state,action){
      state.token=action.payload.token;
      state.dataUser=action.payload.decode
    },
    deleteUser(state,action){
      state.dataUser=null;
      state.token=null;
    } 
  }
})


const {actions,reducer} = userReducer;

export const {setUser,deleteUser}  = actions;
export default reducer;


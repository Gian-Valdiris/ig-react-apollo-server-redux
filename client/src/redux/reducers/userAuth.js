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
    }
  }
})


const {actions,reducer} = userReducer;

export const {setUser}  = actions;
export default reducer;


// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
  profileImage: '',
  path:'',
  fullName:''
  // role:''

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.profileImage=action.payload.profileImage;
      state.path=action.payload.path;
      state.fullName=action.payload.fullName;
      // state.role=action.payload.role;
      console.log('Logged in user email:', action.payload.email);
      console.log('Logged in user id:', action.payload.id);
      console.log('Profile image',action.payload.profileImage)
      console.log('Path',action.payload.path)
      console.log('Fullname',action.payload.fullName)
    },
    // clearUser: (state) => {
    //   state.email = '';
    //   state.id = '';

    // }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

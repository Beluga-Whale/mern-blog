import { createSlice } from "@reduxjs/toolkit";

interface UserCurrentState {
  profilePicture: string;
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserCurrentGoogleState {
  username: string;
  email: string;
  profilePicture: string;
  _id: string;
}
interface UserState {
  currentUser: UserCurrentState | null;
  currentUserGoogle: UserCurrentGoogleState | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  currentUserGoogle: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, actions) => {
      state.currentUser = actions.payload;
      state.currentUserGoogle = null;
      state.loading = false;
      state.error = null;
    },
    signInGoggleSuccess: (state, actions) => {
      state.currentUser = null;
      state.currentUserGoogle = actions.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signInGoggleSuccess,
} = userSlice.actions;

export default userSlice.reducer;
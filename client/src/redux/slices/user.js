import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo:JSON.parse(localStorage.getItem("userInfo")) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setError, setLoading, userLogin, userLogout } =
  userSlice.actions;
export default userSlice.reducer;

export const userSelector = ((state) => state.user);

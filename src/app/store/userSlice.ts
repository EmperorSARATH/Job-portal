import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "./type";

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload; // Set user details on login
    },
    clearUser(state) {
      state.user = null; // Clear user details on logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

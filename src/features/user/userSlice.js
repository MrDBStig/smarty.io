import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  tasks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      return { ...state, currentUser: payload };
    },
    setUserTasks: (state, { payload }) => {
      return { ...state, tasks: payload };
    },
  },
});

export default userSlice.reducer;

export const { setCurrentUser, setUserTasks } = userSlice.actions;

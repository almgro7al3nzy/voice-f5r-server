import { createSlice } from "@reduxjs/toolkit";

export const activateSlice = createSlice({
  name: "activate",
  initialState: {
    name: "",
    avatar: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },

    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setAvatar } = activateSlice.actions;

export default activateSlice.reducer;

import { configureStore, createSlice, uuid } from "@reduxjs/toolkit";

const user = createSlice({
  name: "User",
  initialState: {
    email: null,
    id: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      // state: user의 상태 = 초기값
      // action.payload => setUser(newUser)
    },
  },
});

//dispatch(setUser(user))
export const { setUser } = user.actions;
export default user.reducer;

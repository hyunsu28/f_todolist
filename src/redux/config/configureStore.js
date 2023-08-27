import { configureStore } from "@reduxjs/toolkit";
import List from "../modules/postSlice";
import User from "../modules/userSlice";

const store = configureStore({
  reducer: {
    List,
    User,
  },
});

export default store;

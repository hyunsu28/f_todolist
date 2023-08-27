import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import uuid from "react-uuid";

const lists = createSlice({
  name: "list",
  initialState: [
    {
      id: uuid(),
      title: "코딩하기",
      content: "메인페이지 만들어야지",
      // author: "머시기",
    },
    {
      id: uuid(),
      title: "청소하기",
      content: "옷 정리해야지!",
    },
  ],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },

    updatePost: (state, action) => {
      return state.map((post) =>
        post.id === action.payload ? action.payload : post
      );
    },
  },
});

const { reducer: postsReducer } = lists;

// configureStore에서 {} 넣고, 그 안에 reducer:{}넣고 변수를 만들어서 담는다
const store = configureStore({
  reducer: {
    //이름이고 : 위에서 한 아이템들임.
    list: postsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export const { addPost, deletePost, updatePost } = lists.actions;

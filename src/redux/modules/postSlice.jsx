import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const lists = createSlice({
  name: "List",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },

    updatePost: (state, action) => {
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
  },
});

export const { addPost, deletePost, updatePost } = lists.actions;
// export const { reducer: postsReducer } = lists;
export default lists.reducer;

// const [post, setPost] = useState()

// post => useSelector()
// setPost => useDispatch(reducer)

// post 추가하기 기능 => newPost
// setPost(newPost) =>

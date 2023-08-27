import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const lists = createSlice({
  name: "List",
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

export const { addPost, deletePost, updatePost } = lists.actions;
// export const { reducer: postsReducer } = lists;
export default lists.reducer;

// const [post, setPost] = useState()

// post => useSelector()
// setPost => useDispatch(reducer)

// post 추가하기 기능 => newPost
// setPost(newPost) =>

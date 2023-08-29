import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { addPost } from "../redux/modules/postSlice";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onContentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const onAddButtonHandler = () => {
    const newPost = {
      id: uuid(),
      title: title,
      content: content,
    };
    dispatch(addPost(newPost)); // Redux action을 통해 데이터를 추가합니다.
    navigate("/main"); // 메인 페이지로 이동합니다.
  };

  const user = useSelector((state) => state.User);

  const addTodo = async (event) => {
    event.preventDefault();
    const newTodo = {
      title: title,
      content: content,
      uid: user.id,
      isDone: false,
    };

    // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, "todos");
    // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
    await addDoc(collectionRef, newTodo);
    navigate("/main");
  };

  return (
    <>
      <div>
        <input
          placeholder="제목"
          type="text"
          value={title}
          onChange={onTitleChangeHandler}
        />
      </div>
      <div>
        <input
          placeholder="내용"
          type="text"
          value={content}
          onChange={onContentChangeHandler}
        />
      </div>

      <button onClick={addTodo}>Write</button>
    </>
  );
}

export default Create;

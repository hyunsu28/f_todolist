import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { addPost } from "../redux/modules/postSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../common/Header";
import styled from "styled-components";

const All = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c5dff8;
  font-family: "Rubik", sans-serif;
  min-height: 687px;
`;

const Second = styled.div`
  margin: 40px auto;
  background-color: #ffffff;
  width: 700px;
  height: 580px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h3 {
    margin-left: 70px;
    margin-bottom: 10px;
    font-size: 25px;
    align-self: flex-start;
  }
  & input {
    height: 130px;
    width: 550px;
    border: 5px solid #375c9f;
    border-radius: 7px;
    font-size: 25px;
    margin-bottom: 10px;
  }
`;
const Butset = styled.div`
  margin-top: 20px;
  & button {
    margin-right: 20px;
    width: 100px;
    height: 35px;
    font-size: 20px;
    border: none;
    border-radius: 7px;
    background-color: #6b84b4;
    color: white;
  }
`;

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
    dispatch(addPost(newPost));
    navigate("/main");
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

    const collectionRef = collection(db, "todos");
    await addDoc(collectionRef, newTodo);
    navigate("/main");
  };

  return (
    <>
      <Header />
      <All>
        <Second>
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={onTitleChangeHandler}
            style={{
              textAlign: "center",
            }}
            placeholder="Write the title"
          />
          <br />
          <h3>Content</h3>
          <input
            type="text"
            value={content}
            onChange={onContentChangeHandler}
            style={{
              textAlign: "center",
            }}
            placeholder="Write the content"
          />
          <Butset>
            <button onClick={addTodo}>Write</button>
            <Link to="/main">
              <button>Home</button>
            </Link>{" "}
          </Butset>{" "}
        </Second>
      </All>
    </>
  );
}

export default Create;

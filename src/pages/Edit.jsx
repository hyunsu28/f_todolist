import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../common/Header";

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
  min-height: 772px;
`;
const Second = styled.div`
  margin: 40px auto;
  background-color: #ffffff;
  width: 700px;
  height: 600px;
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

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // todos 데이터 불러오기
  const [, setList] = useState();

  // 초기값 불러오기 (list 값이 설정되면 초기값 설정)
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "todos", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = { id: docSnapshot.id, ...docSnapshot.data() };
          setList(data);
          setEditTitle(data.title);
          setEditContent(data.content);
        } else {
          console.log("There is no data for that ID.");
        }
      } catch (error) {
        console.error("Failed to import data", error);
      }
    };

    fetchData();
  }, [id]);

  const updateTodo = async () => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        title: editTitle,
        content: editContent,
      });

      navigate("/main");
    } catch (error) {
      console.error("Data update failed.", error);
    }
  };

  return (
    <>
      <Header />
      <All>
        <Second>
          <h3>Change to title</h3>
          <input
            style={{
              textAlign: "center",
            }}
            placeholder="Edit title"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
          <h3>Change to content</h3>
          <input
            style={{
              textAlign: "center",
            }}
            placeholder="Edit content"
            value={editContent}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
          />
          <Butset>
            <button onClick={updateTodo}>Edit</button>
            <Link to="/main">
              <button>Home</button>
            </Link>{" "}
          </Butset>
        </Second>
      </All>
    </>
  );
}

export default Edit;

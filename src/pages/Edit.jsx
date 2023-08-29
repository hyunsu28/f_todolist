import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const All = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c8e4b2;
  font-family: "Jost", sans-serif;
  min-height: 769px;
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
          setList(data); // list 변수 초기화
          setEditTitle(data.title); // editTitle 초기화
          setEditContent(data.content); // editContent 초기화
        } else {
          console.log("해당 ID에 대한 데이터가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
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

      navigate("/main"); // 수정 후 메인 페이지로 이동
    } catch (error) {
      console.error("데이터를 업데이트하는 데 실패했습니다.", error);
    }
  };

  return (
    <>
      <All>
        <input
          placeholder="제목"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
        />
        <input
          placeholder="내용"
          value={editContent}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
        />
        <button onClick={updateTodo}>Edit</button>
        <Link to="/main">취소</Link>{" "}
      </All>
    </>
  );
}

export default Edit;

import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { deletePost, updatePost } from "../redux/modules/postSlice";
import styled from "styled-components";
import { collection, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const All = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c8e4b2;
  font-family: "Rubik", sans-serif;
  min-height: 769px;
`;

const List = styled.div`
  text-align: center;
`;

const List1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 280px;
  padding: 25px;
  margin: 20px 20px;
  border: 5px solid #3c6430;
  border-radius: 20px;
  font-size: 20px;
`;

function Main() {
  const user = useSelector((state) => state.User);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleDelete = (id) => {
  //   if (window.confirm("삭제할까?")) {
  //     dispatch(deletePost(id));
  //   }
  // };

  // const toggleComplete = (id) => {
  //   const targetTodo = lists.find((C) => C.id === id);

  //   const updatedTodo = { ...targetTodo, isDone: !targetTodo.isDone };

  //   dispatch(updatePost(updatedTodo));
  //   console.log(updatedTodo);
  // };

  // todos 데이터 불러오기
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        initialTodos.push({ id: doc.id, ...doc.data() });
      });

      console.log(initialTodos);

      // firestore에서 가져온 데이터를 state에 전달
      setLists(initialTodos);
    };

    fetchData();
  }, []);

  console.log(lists);

  // [리스트 상태, set리스트 상태] = useState()
  const [todolist, setTodolist] = useState(true);

  const deleteTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);

    setLists((prev) => {
      return prev.filter((element) => element.id !== id);
    });
  };

  const finishTodo = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      const list = lists.find((C) => C.id === id);
      await updateDoc(todoRef, { isDone: !list.isDone });

      const updatedLists = lists.map((list) =>
        list.id === id ? { ...list, isDone: !list.isDone } : list
      );

      setLists(updatedLists);
    } catch (error) {
      console.error("데이터를 업데이트하는 데 실패했습니다.", error);
    }
  };

  const data = lists.filter((v) => v.uid === user.id);

  return (
    <>
      <Header />
      <All>
        <List>
          <button onClick={() => setTodolist(true)}>할일</button>
          <button onClick={() => setTodolist(false)}>한일</button>
        </List>

        {todolist
          ? data
              .filter((A) => A.isDone == false)
              .map((A) => {
                return (
                  <List1 key={A.id}>
                    <div>
                      <h2>{A.title}</h2>
                      <p>{A.content}</p>
                      <button
                        onClick={() => {
                          deleteTodo(A.id);
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${A.id}`}>
                        <button>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          finishTodo(A.id);
                        }}
                      >
                        Finish
                      </button>
                    </div>
                  </List1>
                );
              })
          : data
              .filter((B) => B.isDone !== false)
              .map((B) => {
                return (
                  <List1 key={B.id}>
                    <div>
                      <h2>{B.title}</h2>
                      <p>{B.content}</p>
                      <button
                        onClick={() => {
                          deleteTodo(B.id);
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${B.id}`}>
                        <button>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          finishTodo(B.id);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </List1>
                );
              })}
        <Link to="/create">
          <button>작성하기</button>
        </Link>
      </All>
    </>
  );
}
export default Main;

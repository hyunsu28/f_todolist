import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { collection, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const All = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #c5dff8;
  font-family: "Rubik", sans-serif;
  min-height: 772px;
`;
const HeaderText = styled.h2`
  color: ${(props) => (props.active ? "black" : "white")};
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  margin-left: 45px;
  align-items: flex-start;

  gap: 70px;
`;
const ListContainer = styled.div`
  margin-left: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: flex-start;
`;
const List1 = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 270px;
  /* height: 150px; */
  padding: 0 0 20px 0;
  margin: 10px 15px;
  border: 3px solid #bdb017;
  background-color: #f5f5c3;
  border-radius: 20px;
`;
const Butset = styled.div`
  & button {
    margin-top: 15px;
    margin-right: 10px;
    width: 60px;
    height: 25px;
    font-size: 15px;
    border: 2px solid #dbc451;
    border-radius: 7px;
    background-color: #dbc451;
    color: white;
  }
`;
const Font1 = styled.div`
  font-size: 20px;
  text-align: center;
`;
const Font2 = styled.div`
  font-size: 15px;
  text-align: center;
`;
const But = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  & button {
    margin-right: 10px;
    width: 100px;
    height: 37px;
    font-size: 20px;
    border: 2px solid #dbc451;
    border-radius: 7px;
    background-color: #dbc451;
    color: white;
  }
`;

function Main() {
  const user = useSelector((state) => state.User);

  // todos 데이터 불러오기
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];
      querySnapshot.forEach((doc) => {
        initialTodos.push({ id: doc.id, ...doc.data() });
      });

      setLists(initialTodos);
    };

    fetchData();
  }, []);

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
      console.error("Data update failed.", error);
    }
  };

  const data = lists.filter((v) => v.uid === user.id);

  return (
    <>
      <Header />
      <All>
        <List>
          <HeaderText active={todolist} onClick={() => setTodolist(true)}>
            Working
          </HeaderText>
          <HeaderText active={!todolist} onClick={() => setTodolist(false)}>
            Done
          </HeaderText>
        </List>
        <ListContainer>
          {todolist
            ? data
                .filter((A) => A.isDone == false)
                .map((A) => {
                  return (
                    <List1 key={A.id}>
                      <div>
                        <Font1>
                          <h4>{A.title}</h4>
                        </Font1>
                        <Font2>
                          <p>{A.content}</p>
                        </Font2>
                        <Butset>
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
                        </Butset>
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
                        <h4>{B.title}</h4>
                        <p>{B.content}</p>
                        <Butset>
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
                        </Butset>
                      </div>
                    </List1>
                  );
                })}
        </ListContainer>

        <But>
          <Link to="/create">
            <button>Write</button>
          </Link>
        </But>
      </All>
    </>
  );
}
export default Main;

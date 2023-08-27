import React from "react";
import Header from "../common/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Main() {
  const lists = useSelector((state) => state.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const clickRemoveButtonHandler = (id) => {
  //   const newTodos = todos.filter((lists) => lists.id !== id);
  //   setTodos();
  // };
  // const handleDelete = (id) => {
  //   if (window.confirm("삭제할까?")) {
  //     dispatch(deletePost(id));
  //   }
  // };
  return (
    <>
      <Header />
      <p>할 일</p>
      {lists.map((A) => (
        <div key={A.id}>
          <h2>{A.title}</h2>
          <p>{A.content}</p>
          {/* <button onClick={() => clickRemoveButtonHandler(item.id)}>
            Delete
          </button> */}
          <Link to="/edit">
            <button>Edit</button>
          </Link>

          <button>Finish</button>
        </div>
      ))}

      <Link to="/create">
        <button>작성하기</button>
      </Link>
    </>
  );
}
export default Main;

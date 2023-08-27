import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.User.email);

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    navigate("/");
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  // 어떤 날짜여도 'YYYY-DD-YY'형식으로 변환!

  return (
    <>
      <div>{dateStr}</div>

      {/* 유저가 있을 때 ? 로그아웃 부분 보여주기 : 로그인 부분 보여주기 */}
      {user ? (
        <>
          <button onClick={logOut}>로그아웃</button>
          <br />
          <Link to="/mypage">마이페이지</Link>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <br />
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </>
  );
}

export default Header;

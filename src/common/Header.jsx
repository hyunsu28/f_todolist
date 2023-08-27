import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  // 어떤 날짜여도 'YYYY-DD-YY'형식으로 변환!

  return (
    <>
      <div>{dateStr}</div>
      <Link to="/login">로그인</Link>
      <div></div>
      <Link to="/signup">회원가입</Link>
    </>
  );
}

export default Header;

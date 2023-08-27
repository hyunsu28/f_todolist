import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";

function Start() {
  const user = useSelector((state) => state.User.email);
  const navigate = useNavigate();

  const handleEnter = () => {
    if (user) {
      navigate("/main");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/");
      // 로그인 페이지로 이동하도록 구현해야 함
    }
  };

  return (
    <>
      <Header />
      <div>로고</div>
      <button onClick={handleEnter}>입장하기</button>
    </>
  );
}

export default Start;

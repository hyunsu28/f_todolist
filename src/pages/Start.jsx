import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import styled from "styled-components";
import ringlogo from "../ringlogo.png";

const All = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e5fdd1;
  font-family: "Rubik", sans-serif;
  min-height: 769px;
`;

const EnterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3c6255;
  color: white;
  border: none;
  cursor: pointer;
`;

const Ringlogo = styled.div`
  img {
    width: 500px;
    height: auto;
  }
`;

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
      <All>
        <Ringlogo>
          <img src={ringlogo} />
        </Ringlogo>
        <EnterButton onClick={handleEnter}>입장하기</EnterButton>
      </All>
    </>
  );
}

export default Start;

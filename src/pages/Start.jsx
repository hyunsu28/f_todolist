import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import styled from "styled-components";
import ringlogo from "../ringlogo.png";

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

const EnterButton = styled.button`
  margin-top: -20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6b84b4;
  color: white;
  border: none;
  border-radius: 7px;
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
      alert("Login is required");
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <All>
        <Ringlogo>
          <img src={ringlogo} />
        </Ringlogo>
        <EnterButton onClick={handleEnter}>Let's start</EnterButton>
      </All>
    </>
  );
}

export default Start;

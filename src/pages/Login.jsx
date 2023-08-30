import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import ringlogo from "../ringlogo.png";
import Header from "../common/Header";
import styled from "styled-components";

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
const Ringlogo = styled.div`
  margin: -60px auto 0; /* 로고를 더 위로 올리기 위해 마진 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 300px;
    height: 200px;
  }
`;

const Second = styled.div`
  margin: 40px auto;
  background-color: #ffffff;
  width: 700px;
  height: 580px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h5 {
    margin-top: 15px;
    margin-left: 70px;
    margin-bottom: 10px;
    font-size: 20px;
    align-self: flex-start;
  }
  & input {
    height: 40px;
    width: 550px;
    border: 4px solid #375c9f;
    border-radius: 7px;
    font-size: 25px;
    margin-bottom: 30px;
  }
`;

const Erm = styled.div`
  font-size: 20px;
  margin-top: -30px;
  margin-bottom: 40px;
`;

const But = styled.div`
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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(""); // 추가: 로그인 에러 메시지 상태

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    //사용자가 입력을 수정할 때마다 에러 메시지 초기화
    setLoginError("");
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoginSuccess(true);
      navigate("/");
    } catch (error) {
      setLoginError("Your id or password is incorrect.");
    }
  };

  return (
    <>
      <Header />
      <All>
        <Second>
          <Ringlogo>
            <img src={ringlogo} />
          </Ringlogo>
          <h5>ID</h5>
          <input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          />

          <h5>PASSWORD</h5>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          />

          <Erm>
            {" "}
            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
          </Erm>
          <But>
            <button onClick={signIn}>Login</button>
          </But>
        </Second>
      </All>
    </>
  );
}

export default Login;

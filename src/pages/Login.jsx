import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
      console.log(userCredential);
      setLoginSuccess(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      // 추가: 로그인 실패 시 에러 메시지 업데이트
      setLoginError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <Link to="/signup">회원가입</Link>
      <div>로고</div>
      <label>이메일 : </label>
      <input
        type="email"
        value={email}
        name="email"
        onChange={onChange}
        required
      />

      <label>비밀번호 : </label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={onChange}
        required
      />

      <button onClick={signIn}>로그인</button>

      {/* 추가: 로그인 에러 메시지 표시 */}
      {loginError && <div style={{ color: "red" }}>{loginError}</div>}
    </>
  );
}

export default Login;

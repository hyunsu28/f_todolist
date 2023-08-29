import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  useEffect(() => {
    if (isSignUpSuccess) {
      alert("가입이 완료되었습니다.");
      setEmail("");
      setPassword("");
      setPasswordCheck("");
    }
  }, [isSignUpSuccess]);

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
    if (name === "passwordCheck") {
      setPasswordCheck(value);
      setPasswordError(password !== value); // 비밀번호 일치 여부 업데이트
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignUpSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Link to="/login">로그인</Link>
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

      <div>
        <label>비밀번호 재확인: </label>
        <input
          type="password"
          value={passwordCheck}
          name="passwordCheck"
          onChange={onChange}
          required
        />
        {passwordError && (
          <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
        )}
        {passwordCheck === password && password !== "" && !passwordError && (
          <div style={{ color: "green" }}>비밀번호가 일치합니다.</div>
        )}
      </div>

      <button onClick={signUp}>회원가입</button>
    </>
  );
}

export default Signup;

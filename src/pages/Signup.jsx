import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
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
  margin: -40px auto;

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
    margin-bottom: 20px;
  }
`;
const Erm = styled.div`
  font-size: 20px;
  margin-top: -18px;
  margin-bottom: 40px;
`;
const But = styled.div`
  margin-top: -20px;
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

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignUpSuccess) {
      alert("Welcome to RingRing! Signup successful");
      navigate("/login");
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
      setPasswordError(password !== value);
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
      <Header />
      <All>
        <Second>
          <Ringlogo>
            <img src={ringlogo} />
          </Ringlogo>
          <h5>ID</h5>
          <input
            style={{
              fontSize: "17px",
              textAlign: "center",
            }}
            placeholder="Please enter your e-mail."
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          />

          <h5>PASSWORD</h5>
          <input
            style={{
              fontSize: "17px",
              textAlign: "center",
            }}
            placeholder="Please enter your password."
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          />

          <h5>Recheck password</h5>
          <input
            style={{
              fontSize: "17px",
              textAlign: "center",
            }}
            placeholder="Please enter the same password."
            type="password"
            value={passwordCheck}
            name="passwordCheck"
            onChange={onChange}
            required
          />
          <Erm>
            {passwordError && (
              <div style={{ color: "red" }}> Password is incorrect.</div>
            )}
            {passwordCheck === password &&
              password !== "" &&
              !passwordError && (
                <div style={{ color: "green" }}>Password is corrrect.</div>
              )}
          </Erm>

          <But>
            <button onClick={signUp}>Signup</button>
          </But>
        </Second>
      </All>
    </>
  );
}

export default Signup;

import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styled from "styled-components";
import homelogo from "../homelogo.png";

// 스타일
const HeaderWrapper = styled.div`
  color: white;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  height: 7vh;
  background-color: #7895cb;
  font-family: "Rubik", sans-serif;
`;
const D = styled.div`
  font-size: 20px;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  a {
    color: white;
    text-decoration: none; /* 링크의 밑줄 제거 */
  }
`;

const Logo = styled.div`
  img {
    width: 80px;
    height: auto;
  }

  margin-top: 5px;
`;

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
  const dateStr = `Today ${year}.${month}.${day}`;
  const handleEnter = () => {
    if (user) {
      navigate("/main ");
    } else {
      alert("Login is required");
      navigate("/login");
    }
  };
  return (
    <>
      <HeaderWrapper>
        <D>
          <p>{dateStr}</p>
        </D>
        <Logo>
          <img src={homelogo} onClick={handleEnter} />
        </Logo>

        <Links>
          {user ? (
            <>
              <p onClick={logOut}>Logout</p>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </Links>
      </HeaderWrapper>
    </>
  );
}

export default Header;

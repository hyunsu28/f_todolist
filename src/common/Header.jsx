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
  padding: 0 20px; /* 좌우 여백 추가 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px 0; /* 상하 여백은 유지하되 좌우 여백 삭제 */

  height: 5vh;
  background-color: #466f48;
  font-family: "Rubik", sans-serif;
`;
const D = styled.div`
  font-size: 20px;
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 15px;
  a {
    color: white;
    text-decoration: none; /* 링크의 밑줄 제거 */
  }
`;

const Logo = styled.div`
  img {
    width: 85px;
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
  const dateStr = `${year}-${month}-${day}`;
  // 어떤 날짜여도 'YYYY-DD-YY'형식으로 변환!

  return (
    <>
      <HeaderWrapper>
        <D>
          <p>{dateStr}</p>
        </D>
        <Logo>
          <img src={homelogo} />{" "}
        </Logo>

        <Links>
          {/* 유저가 있을 때 ? 로그아웃 부분 보여주기 : 로그인 부분 보여주기 */}
          {user ? (
            <>
              <p onClick={logOut}>로그아웃</p>
              <Link to="/mypage">마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </Links>
      </HeaderWrapper>
    </>
  );
}

export default Header;

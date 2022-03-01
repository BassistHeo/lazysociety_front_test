import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import navImage from "../img/lazy.png";

//! Styled Components

const NavBox = styled.header`
  display: flex;
  justify-content: center;
  background-color: #d9d8d3;
  width: 100%;
  height: 90px;
`;

const Header = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  align-items: center;
  div {
    margin-left: 1.3rem;
    margin-right: 1.3rem;
    color: #6d6d6b;
    cursor: pointer;
  }
`;
const Right = styled.div`
  width: 18%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    margin-right: 1.8rem;
    color: #6d6d6b;
    cursor: pointer;
  }
`;

export default function Nav() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (access_token && refresh_token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  //! 마이페이지 핸들러 함수, 토큰 없을시 로그인 페이지로 이동
  const mypageHandler = () => {
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    if (access_token && refresh_token) {
      router.push("/mypage");
    } else {
      alert("로그인 후 이용해주세요.");
      router.push("/login");
    }
  };

  //! 로그아웃 핸들러 함수, 로컬스토리지에 있는 토큰 초기화
  const logoutHandler = () => {
    window.localStorage.setItem("access_token", "");
    window.localStorage.setItem("refresh_token", "");
    router.push("/");
  };

  return (
    <NavBox>
      <Header>
        <Left>
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={navImage} width="120" height="50" />
          </div>
          <div>브랜드 스토리</div>
          <div>맞춤구독</div>
          <div>스토어</div>
          <div>쉼표</div>
        </Left>
        <Right>
          <div
            onClick={() => {
              mypageHandler();
            }}
          >
            마이페이지
          </div>
          {isLogin === true ? (
            <div
              onClick={() => {
                logoutHandler();
              }}
            >
              로그아웃
            </div>
          ) : (
            <div
              onClick={() => {
                router.push("/login");
              }}
            >
              로그인
            </div>
          )}
        </Right>
      </Header>
    </NavBox>
  );
}

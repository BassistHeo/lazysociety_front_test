import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginState } from "./state";

//! Styled Components

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const HometitleBox = styled.div`
  display: flex;
  width: 55%;
  height: 100%;
  border: 1px solid #e9e9e9;
  align-items: center;
  flex-direction: column;
  font-size: 6rem;
  div {
    cursor: pointer;
  }
  span {
    margin-top: 2rem;
    font-size: 1.6rem;
  }
`;
const LoginBox = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e9e9e9;

  div {
    &.inputTitle {
      width: 50%;
      padding-bottom: 0.3rem;
      font-size: 1.2rem;
      display: flex;
      align-items: flex-start;
    }
  }
`;

const Input = styled.input`
  width: 50%;
  height: 3rem;
  margin-bottom: 0.4rem;
  border: 0.5px solid gray;
  border-radius: 0.2rem;
  font-size: 1rem;
  text-indent: 1rem;
  ::-webkit-input-placeholder {
    text-align: center;
  }
`;
const ErrorMessage = styled.div`
  width: 50%;
  height: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  color: red;
  font-size: 0.7rem;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  width: 20%;
  height: 2.6rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #f4de73;
  font-size: 1rem;
  @font-face {
    font-family: "InfinitySans-RegularA1";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "InfinitySans-RegularA1";
  color: #252a3c;
  :hover {
    color: #f4de73;
    box-shadow: #252a3c 0 5rem 0rem 2rem inset;
  }
`;
const Img = styled.img`
  margin-top: 14.5rem;
  width: 30%;
`;

export default function login() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  useEffect(() => {
    if (id.length !== 0 || password.length !== 0) {
      setErrorMsg("");
    }
  }, [id, password]);

  //! 로그인 핸들러 함수, input value에 따른 에러 메세지 처리 및 post 요청

  const loginHandler = () => {
    if (id.length === 0 && password.length === 0) {
      setErrorMsg("아이디와 비밀번호를 입력해 주십시오.");
    } else if (id.length === 0 && password.length !== 0) {
      setErrorMsg("아이디를 입력해 주십시오.");
    } else if (id.length !== 0 && password.length === 0) {
      setErrorMsg("패스워드를 입력해 주십시오.");
    } else {
      const url = "https://login-test.lazysociety.co.kr/auth/sign-in";
      const header = {
        "Content-Type": "application/json",
      };
      const loginBody = { id, password };

      axios
        .post(url, loginBody, header)
        .then((res) => {
          setIsLogin(true);
          window.localStorage.setItem("access_token", res.data.access_token);
          window.localStorage.setItem("refresh_token", res.data.refresh_token);
          router.push("/");
        })
        .catch((err) => {
          const code = err.response.status;
          if (code === 401 || code === 500) {
            setErrorMsg(
              "아이디 또는 비밀번호를 잘못 입력하셨습니다. 입력하신 내용을 확인해주세요."
            );
          }
        });
    }
  };
  const idHandler = (e) => {
    setId(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <HomeContainer>
        <HometitleBox>
          <Img
            src="https://lazysociety.co.kr/comma.png"
            onClick={() => {
              router.push("/");
            }}
          />
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            Lazysociety
          </div>
        </HometitleBox>
        <LoginBox>
          <div className="inputTitle">아이디</div>
          <Input
            placeholder="ID"
            onChange={(e) => {
              idHandler(e);
            }}
          />
          <div className="inputTitle">비밀번호</div>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              passwordHandler(e);
            }}
          />
          {errorMsg === "" ? null : <ErrorMessage>{errorMsg}</ErrorMessage>}
          <Button
            onClick={() => {
              loginHandler();
            }}
          >
            로그인
          </Button>
        </LoginBox>
      </HomeContainer>
    </div>
  );
}

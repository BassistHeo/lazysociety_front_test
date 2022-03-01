import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userInfoState } from "./state";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Nav from "../component/Nav";

//! Styled Components

const MypageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyInfoBox = styled.div`
  display: flex;
  width: 70%;
  height: 30%;
  justify-content: center;
  background-color: #d9d8d3;
`;
const MyInfoTitle = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 70%;
  height: 2rem;
  font-size: 1.5rem;
  color: #222222;
  display: flex;
  @media only screen and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const Category = styled.div`
  width: 7%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    height: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    display: flex;
    text-align: justify;
  }
`;

const Info = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    height: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #222222;
  }
`;
const Right = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;

const Button = styled.button`
  margin-top: 0.5rem;
  width: 50%;
  height: 2.6rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #f4de73;
  font-size: 1rem;
  cursor: pointer;
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

export default function mypage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  //! mypage 접속시 실행, 액세스 토큰 갱신 후 해당 토큰으로 유저 정보 조회
  useEffect(() => {
    const url = "https://login-test.lazysociety.co.kr/auth/access-token";
    const refresh_token = window.localStorage.getItem("refresh_token");
    const body = { refresh_token };
    const headers = { "Content-Type": "application/json" };

    axios
      .post(url, body, headers)
      .then((res) => {
        window.localStorage.setItem("access_token", res.data.access_token);
        window.localStorage.setItem("refresh_token", res.data.refresh_token);

        const url = "https://login-test.lazysociety.co.kr/user";
        const access_token = res.data.access_token;
        const headers = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        axios.get(url, headers).then((res) => {
          setUserInfo(res.data);
          console.log(res.data);
        });
      })
      .catch((err) => {
        const code = err.response.status;
        if (code !== 200) {
          alert(
            "인증되지 않은 방법으로 접근하였습니다. 로그인 후 이용해주시기 바랍니다 :)"
          );
          router.push("/");
        }
      });
  }, []);

  const logoutHandler = () => {
    window.localStorage.setItem("access_token", "");
    window.localStorage.setItem("refresh_token", "");
    router.push("/");
  };

  return (
    <div>
      <Nav />
      <MypageContainer>
        <MyInfoTitle>마이페이지</MyInfoTitle>
        <MyInfoBox>
          <Category>
            <div>이름: </div>
            <div>이메일: </div>
            <div>전화번호: </div>
            <div>주소: </div>
          </Category>
          <Info>
            <div>{userInfo.username}</div>
            <div>{userInfo.email}</div>
            <div>{userInfo.phone}</div>
            <div>{userInfo.address}</div>
          </Info>
          <Right>
            <Button
              onClick={() => {
                logoutHandler();
              }}
            >
              로그아웃
            </Button>
          </Right>
        </MyInfoBox>
      </MypageContainer>
    </div>
  );
}

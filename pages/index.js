import Image from "next/image";
import styled from "styled-components";
import Nav from "../component/Nav";
import left from "../img/left.png";
import right from "../img/right.png";

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;
const ImgBox = styled.div`
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  width: 50%;
  height: 90%;
  justify-content: center;
`;

export default function Home() {
  return (
    <div>
      <Nav />
      <HomeContainer>
        <ImgBox>
          <Image src={left} />
        </ImgBox>
        <ImgBox>
          <Image src={right} />
        </ImgBox>
      </HomeContainer>
    </div>
  );
}

import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { isInfoTabOpenedState } from "../atoms";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const Overlay = styled.section<{ isInfoTabOpened: boolean }>`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0%;
  display: ${(props) => (props.isInfoTabOpened ? "flex" : "none")};
`;
const TabContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background-color: whitesmoke;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  background-color: transparent;
  border: none;
`;

const ContentSwitchBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const ContenetContainer = styled.img`
  height: 90%;
  width: 90%;
  object-fit: contain;
`;

const contentImgSrc = [
  "/img/first-content.png",
  "/img/second-content.png",
  "/img/third-content.png",
  "/img/fourth-content.png",
];

const variatnts = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
function InfoTab() {
  const [isInfoTabOpened, setIsInfoTabOpened] =
    useRecoilState(isInfoTabOpenedState);

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (page === 0 || page === 3) {
      return;
    }
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Overlay isInfoTabOpened={isInfoTabOpened}>
      <TabContainer>
        <ExitBtn onClick={() => setIsInfoTabOpened(false)}>
          <AiOutlineClose size="2em" />
        </ExitBtn>
        <ContentSwitchBtn>
          <IoIosArrowBack size="2em" />
        </ContentSwitchBtn>
        <ContenetContainer src="/img/fourth-content.png"></ContenetContainer>
        <ContentSwitchBtn>
          <IoIosArrowForward size="2em" />
        </ContentSwitchBtn>
      </TabContainer>
    </Overlay>
  );
}

export default InfoTab;

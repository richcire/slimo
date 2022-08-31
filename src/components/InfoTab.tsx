import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { isInfoTabOpenedState } from "../atoms";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  overflow: hidden;
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  background-color: transparent;
  border: none;
  z-index: 1;
`;

const ContentSwitchBtn = styled.button`
  background-color: transparent;
  border: none;
  z-index: 1;
`;

const ContenetContainer = styled(motion.img)`
  height: 90%;
  width: 100%;
  object-fit: contain;
  position: absolute;
  z-index: 0;
`;

const ContentIndicatorContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  gap: 10px;
`;
const ContentIndicator = styled.div<{ isShowing: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isShowing ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.4)"};
`;

const contentImgSrc = [
  "./img/first-content.png",
  "./img/second-content.png",
  "./img/third-content.png",
  "./img/fourth-content.png",
];

const variatnts = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 2000 : -2000,
    };
  },
  center: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 2000 : -2000,
    };
  },
};
function InfoTab() {
  const [isInfoTabOpened, setIsInfoTabOpened] =
    useRecoilState(isInfoTabOpenedState);

  const [[page, direction], setPage] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);

  const paginate = (newDirection: number) => {
    if (leaving) return;
    if (page === 0 && newDirection === -1) {
      return;
    }
    if (page === 3 && newDirection === 1) {
      return;
    }
    setLeaving(true);
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Overlay isInfoTabOpened={isInfoTabOpened}>
      <TabContainer>
        <ExitBtn onClick={() => setIsInfoTabOpened(false)}>
          <AiOutlineClose size="2em" />
        </ExitBtn>
        <ContentSwitchBtn onClick={() => paginate(-1)}>
          <IoIosArrowBack size="3em" />
        </ContentSwitchBtn>
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={() => setLeaving(false)}
        >
          <ContenetContainer
            key={page}
            custom={direction}
            variants={variatnts}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "linear",
              duration: 1,
              // opacity: { duration: 0.2 },
            }}
            src={contentImgSrc[page]}
          ></ContenetContainer>
        </AnimatePresence>
        <ContentSwitchBtn onClick={() => paginate(1)}>
          <IoIosArrowForward size="3em" />
        </ContentSwitchBtn>
        <ContentIndicatorContainer>
          <ContentIndicator isShowing={page == 0} />
          <ContentIndicator isShowing={page == 1} />
          <ContentIndicator isShowing={page == 2} />
          <ContentIndicator isShowing={page == 3} />
        </ContentIndicatorContainer>
      </TabContainer>
    </Overlay>
  );
}

export default InfoTab;

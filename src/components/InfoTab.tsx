import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { isInfoTabOpenedState } from "../atoms";

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
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  background-color: transparent;
  border: none;
`;

function InfoTab() {
  const [isInfoTabOpened, setIsInfoTabOpened] =
    useRecoilState(isInfoTabOpenedState);

  return (
    <Overlay isInfoTabOpened={isInfoTabOpened}>
      <TabContainer>
        <ExitBtn onClick={() => setIsInfoTabOpened(false)}>
          <AiOutlineClose size="2em" />
        </ExitBtn>
      </TabContainer>
    </Overlay>
  );
}

export default InfoTab;

import styled from "styled-components";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { isInfoTabOpenedState } from "../atoms";

const BtnContainer = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  background-color: transparent;
  border: none;
  color: white;
`;

function InfoBtn() {
  const setIsInfoTabOpened = useSetRecoilState(isInfoTabOpenedState);

  return (
    <BtnContainer onClick={() => setIsInfoTabOpened(true)}>
      <AiOutlineQuestionCircle size="4em" />
    </BtnContainer>
  );
}

export default InfoBtn;

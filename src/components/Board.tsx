import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoStorageState } from "../atoms";

const BoardContainer = styled(motion.ul)`
  background-color: aliceblue;
  width: 30%;
`;
const Label = styled.li``;

interface IBoard {
  boardType: "todo" | "finished" | "willdo";
}
function Board({ boardType }: IBoard) {
  const [memoStorage, setMemoStorage] = useRecoilState(memoStorageState);
  return (
    <BoardContainer drag whileDrag={{ scale: 1.2 }}>
      {memoStorage[boardType].map((memo) => (
        <Label>{memo?.text}</Label>
      ))}
    </BoardContainer>
  );
}

export default Board;

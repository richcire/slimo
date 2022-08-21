import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoStorageState } from "../atoms";

const BoardContainer = styled.ul`
  background-color: aliceblue;
  width: 30%;
`;
const Label = styled(motion.li)``;

interface IBoard {
  boardType: "todo" | "finished" | "willdo";
}
function Board({ boardType }: IBoard) {
  const [memoStorage, setMemoStorage] = useRecoilState(memoStorageState);

  const finishedMoveRight = (offsetMoved: number, memoId: string) => {
    console.log(memoStorage.finished.findIndex((memo) => memo?.id === memoId));
  };
  const todoMovedLeft = () => {};
  const todoMovedRight = () => {};
  const willdoMmoveLeft = () => {};
  return (
    <BoardContainer>
      {memoStorage[boardType].map((memo) => (
        <Label
          key={memo?.id}
          drag="x"
          whileDrag={{ scale: 1.2 }}
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(event, info) => finishedMoveRight(info.offset.x, memo?.id!)}
        >
          {memo?.text}
        </Label>
      ))}
    </BoardContainer>
  );
}

export default Board;

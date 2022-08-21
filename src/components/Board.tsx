import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoStorageState } from "../atoms";
import update from "immutability-helper";
const BoardContainer = styled.ul`
  background-color: rgba(44, 62, 80, 0.9);
  width: 30%;
  color: #ecf0f1;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

const Label = styled(motion.li)`
  width: 90%;
  height: 40px;
  background-color: rgba(88, 118, 147, 1);
  list-style-type: none;
  margin-top: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

interface IBoard {
  boardType: "todo" | "finished" | "willdo";
}
function Board({ boardType }: IBoard) {
  const [memoStorage, setMemoStorage] = useRecoilState(memoStorageState);

  const finishedMoved = (offsetMoved: number, memoId: string) => {
    const draggedMemoIndex = memoStorage.finished.findIndex(
      (memo) => memo?.id === memoId
    );
    if (offsetMoved > 200) {
      setMemoStorage(
        update(memoStorage, {
          finished: { $splice: [[draggedMemoIndex, 1]] },
          todo: { $push: [memoStorage.finished[draggedMemoIndex]] },
        })
      );
    }
  };
  const todoMoved = (offsetMoved: number, memoId: string) => {
    const draggedMemoIndex = memoStorage.todo.findIndex(
      (memo) => memo?.id === memoId
    );

    if (draggedMemoIndex < 0) return;

    if (offsetMoved > 200) {
      setMemoStorage(
        update(memoStorage, {
          todo: { $splice: [[draggedMemoIndex, 1]] },
          willdo: { $push: [memoStorage.todo[draggedMemoIndex]] },
        })
      );
    } else if (offsetMoved < -100) {
      console.log(memoStorage);
      setMemoStorage(
        update(memoStorage, {
          todo: { $splice: [[draggedMemoIndex, 1]] },
          finished: { $push: [memoStorage.todo[draggedMemoIndex]] },
        })
      );
    }
  };
  const willdoMoved = (offsetMoved: number, memoId: string) => {
    const draggedMemoIndex = memoStorage.willdo.findIndex(
      (memo) => memo?.id === memoId
    );
    if (draggedMemoIndex < 0) return;
    if (offsetMoved < -100) {
      setMemoStorage(
        update(memoStorage, {
          willdo: { $splice: [[draggedMemoIndex, 1]] },
          todo: { $push: [memoStorage.willdo[draggedMemoIndex]] },
        })
      );
    }
  };

  // console.log(memoStorage);
  return (
    <BoardContainer>
      {memoStorage[boardType].map((memo) => (
        <Label
          key={memo?.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) =>
            boardType === "finished"
              ? finishedMoved(info.offset.x, memo?.id!)
              : boardType === "todo"
              ? todoMoved(info.offset.x, memo?.id!)
              : willdoMoved(info.offset.x, memo?.id!)
          }
        >
          {memo?.text}
        </Label>
      ))}
    </BoardContainer>
  );
}

export default Board;

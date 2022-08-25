import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoStorageState } from "../atoms";
import update from "immutability-helper";
import { FiDelete } from "react-icons/fi";

const BoardContainer = styled.ul`
  background-color: rgba(44, 62, 80, 0.9);
  width: 30%;
  color: #ecf0f1;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  overflow: scroll;
`;

const Label = styled(motion.li)`
  position: relative;
  width: 90%;
  height: 40px;
  background-color: rgba(88, 118, 147, 1);
  list-style-type: none;
  margin-top: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: scroll;
`;

const DeleteBtn = styled(motion.button)`
  background-color: transparent;
  border: none;
  height: 100%;
  position: absolute;
  right: 0;
  color: red;
`;

interface IBoard {
  boardType: "todo" | "finished" | "willdo";
}
function Board({ boardType }: IBoard) {
  const [memoStorage, setMemoStorage] = useRecoilState(memoStorageState);
  const myStorage = window.localStorage;

  const finishedMoved = (offsetMoved: number, memoId: string) => {
    const draggedMemoIndex = memoStorage.finished.findIndex(
      (memo) => memo?.id === memoId
    );
    if (offsetMoved > 200) {
      setMemoStorage(() => {
        const newMemoStorage = update(memoStorage, {
          finished: { $splice: [[draggedMemoIndex, 1]] },
          todo: { $push: [memoStorage.finished[draggedMemoIndex]] },
        });
        myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
        return newMemoStorage;
      });
    }
  };
  const todoMoved = (offsetMoved: number, memoId: string) => {
    const draggedMemoIndex = memoStorage.todo.findIndex(
      (memo) => memo?.id === memoId
    );

    if (draggedMemoIndex < 0) return;

    if (offsetMoved > 200) {
      setMemoStorage(() => {
        const newMemoStorage = update(memoStorage, {
          todo: { $splice: [[draggedMemoIndex, 1]] },
          willdo: { $push: [memoStorage.todo[draggedMemoIndex]] },
        });
        myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
        return newMemoStorage;
      });
    } else if (offsetMoved < -100) {
      console.log(memoStorage);
      setMemoStorage(() => {
        const newMemoStorage = update(memoStorage, {
          todo: { $splice: [[draggedMemoIndex, 1]] },
          finished: { $push: [memoStorage.todo[draggedMemoIndex]] },
        });
        myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
        return newMemoStorage;
      });
    }
  };
  const willdoMoved = (offsetMoved: number, memoId: string) => {
    const draggedMemoIndex = memoStorage.willdo.findIndex(
      (memo) => memo?.id === memoId
    );
    if (draggedMemoIndex < 0) return;
    if (offsetMoved < -100) {
      setMemoStorage(() => {
        const newMemoStorage = update(memoStorage, {
          willdo: { $splice: [[draggedMemoIndex, 1]] },
          todo: { $push: [memoStorage.willdo[draggedMemoIndex]] },
        });
        myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
        return newMemoStorage;
      });
    }
  };

  const onDeleteBtnClicked = (memoId: string, boardType: string) => {
    let draggedMemoIndex = -1;
    if (boardType === "finished") {
      draggedMemoIndex = memoStorage.finished.findIndex(
        (memo) => memo?.id === memoId
      );
      if (draggedMemoIndex >= 0) {
        setMemoStorage(() => {
          const newMemoStorage = update(memoStorage, {
            finished: { $splice: [[draggedMemoIndex, 1]] },
          });
          myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
          return newMemoStorage;
        });
      }
    } else if (boardType === "todo") {
      draggedMemoIndex = memoStorage.todo.findIndex(
        (memo) => memo?.id === memoId
      );
      if (draggedMemoIndex >= 0) {
        setMemoStorage(() => {
          const newMemoStorage = update(memoStorage, {
            todo: { $splice: [[draggedMemoIndex, 1]] },
          });
          myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
          return newMemoStorage;
        });
      }
    } else {
      draggedMemoIndex = memoStorage.willdo.findIndex(
        (memo) => memo?.id === memoId
      );
      if (draggedMemoIndex >= 0) {
        setMemoStorage(() => {
          const newMemoStorage = update(memoStorage, {
            willdo: { $splice: [[draggedMemoIndex, 1]] },
          });
          myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
          return newMemoStorage;
        });
      }
    }
  };
  // console.log(memoStorage);
  return (
    <BoardContainer>
      {memoStorage[boardType].map((memo) => (
        <AnimatePresence>
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
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
          >
            {memo?.text}
            <DeleteBtn
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              onClick={() => onDeleteBtnClicked(memo?.id!, boardType)}
            >
              <FiDelete size="1.3em" />
            </DeleteBtn>
          </Label>
        </AnimatePresence>
      ))}
    </BoardContainer>
  );
}

export default Board;

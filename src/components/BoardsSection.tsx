import styled from "styled-components";
import Board from "./Board";

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  max-height: 100%;
  height: 600px;
  background-color: bisque;
  display: flex;
  justify-content: space-around;
  margin-top: 3%;
`;

function BoardsSection() {
  return (
    <Container>
      <Board boardType="finished" />
      <Board boardType="todo" />
      <Board boardType="willdo" />
    </Container>
  );
}

export default BoardsSection;

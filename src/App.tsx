import React from "react";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import AddBar from "./components/AddBar";
import BoardsSection from "./components/BoardsSection";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AddBar />
      <BoardsSection />
    </RecoilRoot>
  );
}

export default App;

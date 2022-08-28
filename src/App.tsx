import React from "react";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import AddBar from "./components/AddBar";
import BoardsSection from "./components/BoardsSection";
import InfoBtn from "./components/InfoBtn";
import InfoTab from "./components/InfoTab";

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
      <InfoBtn />
      <InfoTab />
    </RecoilRoot>
  );
}

export default App;

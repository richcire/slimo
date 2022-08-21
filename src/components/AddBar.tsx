import React, { useState } from "react";
import styled from "styled-components";
import update from "immutability-helper";
import { useRecoilState } from "recoil";
import { memoStorageState } from "../atoms";
import { v4 as uuidv4 } from "uuid";

const AddBarContainer = styled.form`
  margin: 0 auto;
  background-color: beige;
  width: 100%;
  max-width: 860px;
  height: 80px;
  display: flex;
  margin-top: 5%;
  border-radius: 20px;
`;

const AddBarInput = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

function AddBar() {
  const [inputText, setInputText] = useState<string>("");
  const [memoStorage, setMemoStorage] = useRecoilState(memoStorageState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMemoStorage(
      update(memoStorage, {
        todo: { $push: [{ id: uuidv4(), text: inputText }] },
      })
    );
    setInputText("");
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputText(event.currentTarget.value);
  };

  return (
    <AddBarContainer onSubmit={handleSubmit}>
      <AddBarInput
        type="text"
        value={inputText}
        onChange={handleChange}
        required
      ></AddBarInput>
    </AddBarContainer>
  );
}

export default AddBar;

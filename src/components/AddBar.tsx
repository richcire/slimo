import React, { useEffect, useState } from "react";
import styled from "styled-components";
import update from "immutability-helper";
import { useRecoilState } from "recoil";
import { memoStorageState } from "../atoms";
import { v4 as uuidv4 } from "uuid";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";

const AddBarContainer = styled(motion.form)`
  margin: 0 auto;
  background-color: whitesmoke;
  width: 100%;
  max-width: 860px;
  height: 80px;
  display: flex;
  margin-top: 5%;
  border-radius: 20px;
  align-items: center;
  padding-left: 20px;
  gap: 20px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

const AddBarInput = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 3em;
`;

function AddBar() {
  const [inputText, setInputText] = useState<string>("");
  const [memoStorage, setMemoStorage] = useRecoilState(memoStorageState);
  const myStorage = window.localStorage;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMemoStorage(() => {
      const newMemoStorage = update(memoStorage, {
        todo: { $push: [{ id: uuidv4(), text: inputText }] },
      });
      myStorage.setItem("memoStorage", JSON.stringify(newMemoStorage));
      return newMemoStorage;
    });

    setInputText("");

    // localStorage.setItem("memoStorage", JSON.stringify(memoStorage));
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputText(event.currentTarget.value);
  };

  useEffect(() => {
    const localStorageData = myStorage.getItem("memoStorage");
    if (localStorageData) {
      setMemoStorage(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <AddBarContainer onSubmit={handleSubmit} whileHover={{ scale: 1.1 }}>
      <IoAdd size="3em" />
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

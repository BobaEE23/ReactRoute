import "../App.css";
import { useState } from "react";

export const Input = ({ setToDos }) => {
  const [inputToDo, setInputToDo] = useState("");

  const createToDo = (event) => {
    event.preventDefault();
    fetch("http://localhost:3005/toDoS", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputToDo,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((newToDo) => {
        setToDos((prevTodos) => [...prevTodos, newToDo]);
        setInputToDo("");
      });
  };

  return (
    <div className="inputComponent">
      <form onSubmit={createToDo}>
        <input
          value={inputToDo}
          onChange={({ target }) => setInputToDo(target.value)}
          className="input"
          placeholder="Добавление задачи..."
        />
        <button
          className="buttonCreateToDo"
          type="submit"
          disabled={!inputToDo}
        >
          Добавить задачу
        </button>
      </form>
    </div>
  );
};

import "../App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { TodosList } from "./TodosList";

export const ToDos = ({
  refreshToDos,
  setRefreshToDos,
  isSort,
  setIsSort,
  toDos,
  setToDos,
}) => {
  const [sortedToDos, setSortedToDos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3005/toDoS")
      .then((data) => data.json())
      .then((toDo) => {
        setToDos(toDo);
        setSortedToDos(toDo);
      });
  }, [refreshToDos]);
  const changeToDo = (idOfToDo) => {
    const newToDo = prompt("Введите измененную задачу");
    fetch(`http://localhost:3005/toDoS/${idOfToDo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ title: newToDo }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((updatedToDo) => {
        setToDos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === idOfToDo ? updatedToDo : todo))
        );
        setRefreshToDos(!refreshToDos);
      });
  };

  const deletToDo = (idOfToDo) => {
    fetch(`http://localhost:3005/toDoS/${idOfToDo}`, {
      method: "DELETE",
    }).then(() => {
      setToDos((prevTodos) => prevTodos.filter((todo) => todo.id !== idOfToDo));
      setRefreshToDos(!refreshToDos);
    });
  };

  const sortToDoS = () => {
    setIsSort(!isSort);
    const sortedArray = [...toDos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setSortedToDos(sortedArray);
  };
  const filteredToDos = (isSort ? sortedToDos : toDos).filter((toDo) =>
    toDo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="toDosComponent">
      <p className="ToDosText">Список Задач</p>
      <button onClick={sortToDoS} className="sortBtn">
        Сортировать
      </button>
      <input
        className="toDosSearch"
        placeholder="Поиск задачи..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TodosList
        filteredToDos={filteredToDos}
        deletToDo={deletToDo}
        changeToDo={changeToDo}
      />
    </div>
  );
};

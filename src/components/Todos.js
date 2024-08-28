import "../App.css";
import { useState, useEffect } from "react";

import { TodosList } from "./TodosList";
import { Input } from "./Input";

export const ToDos = ({ refreshToDos, toDos, setToDos }) => {
  const [sortedToDos, setSortedToDos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isSort, setIsSort] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3005/toDoS")
      .then((data) => data.json())
      .then((toDo) => {
        setToDos(toDo);
        setSortedToDos(toDo);
      });
  }, [refreshToDos]);

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
    <>
      <Input setToDos={setToDos} />
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
        <TodosList filteredToDos={filteredToDos} />
      </div>
    </>
  );
};

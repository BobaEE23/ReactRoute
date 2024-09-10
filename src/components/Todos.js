import "../App.css";
import { useState, useEffect } from "react";

import { TodosList } from "./TodosList";
import { InputNewTodo } from "./InputNewTodo";

export const ToDos = () => {
  const [sortedToDos, setSortedToDos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshToDos, setRefreshToDos] = useState(false);
  const [toDos, setToDos] = useState([]);

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
    <div>
      <InputNewTodo setToDos={setToDos} />

      <TodosList
        filteredToDos={filteredToDos}
        sortToDoS={sortToDoS}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

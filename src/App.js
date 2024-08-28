import { ToDos } from "./components/Todos";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound, Todo } from "./components/TodosList";
export const App = () => {
  const [refreshToDos, setRefreshToDos] = useState(false);
  const [toDos, setToDos] = useState([]);

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
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ToDos
              refreshToDos={refreshToDos}
              toDos={toDos}
              setToDos={setToDos}
            />
          }
        />
        <Route
          path="todo/:id"
          element={<Todo changeToDo={changeToDo} deletToDo={deletToDo} />}
        />
        <Route path="/todo" />
        <Route path="/" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

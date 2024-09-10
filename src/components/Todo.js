import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

export const Todo = () => {
  const params = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3005/Todos/${params.id}`)
      .then((data) => data.json())
      .then((toDo) => {
        setTitle(toDo.title);
        console.log(toDo.title);
      });
  }, [params]);

  const changeToDo = (idOfToDo) => {
    const newToDo = prompt("Введите измененную задачу");
    fetch(`http://localhost:3005/toDoS/${idOfToDo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ title: newToDo }),
    });
  };

  const deletToDo = (idOfToDo) => {
    fetch(`http://localhost:3005/toDoS/${idOfToDo}`, {
      method: "DELETE",
    });
  };

  if (title === undefined) {
    return <ErrorPage />;
  }
  return (
    <div className="currentToDo">
      <p className="toDoTitle">{title}</p>
      <Link to="/">
        <button onClick={() => changeToDo(params.id)} className="changeToDoBtn">
          Изменить
        </button>
      </Link>
      <Link to="/">
        <button onClick={() => deletToDo(params.id)} className="deleteToDoBtn">
          Удалить
        </button>
      </Link>
      <Link to="/">
        <button className="backBtn">назад</button>
      </Link>
    </div>
  );
};

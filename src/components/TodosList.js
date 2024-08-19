import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

const NotFound = () => (
  <div className="error404">
    <h1>404 - Страница не найдена</h1>
    <p>Такой страницы не существует.</p>
  </div>
);
const Todo = ({ changeToDo, deletToDo }) => {
  const params = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3005/Todos/${params.id}`)
      .then((data) => data.json())
      .then((toDo) => {
        setTitle(toDo.title);
      });
  }, [params]);
  console.log(title);
  if (title === undefined) {
    return <NotFound />;
  }
  return (
    <div className="currentToDo">
      <p className="toDoTitle">{title}</p>
      <Link to="/todo">
        <button onClick={() => changeToDo(params.id)} className="changeToDoBtn">
          Изменить
        </button>
      </Link>
      <Link to="/todo">
        <button onClick={() => deletToDo(params.id)} className="deleteToDoBtn">
          Удалить
        </button>
      </Link>
      <Link to="/todo">
        <button className="backBtn">назад</button>
      </Link>
    </div>
  );
};

export const TodosList = ({ filteredToDos, deletToDo, changeToDo }) => {
  return (
    <div>
      {filteredToDos.map(({ id, title }) => (
        <Link to={`todo/${id}`} key={id}>
          <div className="toDo">
            <span className="toDoTitle">
              {title.length > 30 ? title.slice(0, 30) + "..." : title}
            </span>
          </div>
        </Link>
      ))}

      <Routes>
        <Route
          path="todo/:id"
          element={<Todo deletToDo={deletToDo} changeToDo={changeToDo} />}
        />
        <Route path="/todo" />
        <Route path="/" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

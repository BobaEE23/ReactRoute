import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const NotFound = () => (
  <div className="error404">
    <h1>404 - Страница не найдена</h1>
    <p>Такой страницы не существует.</p>
  </div>
);
export const Todo = ({ deletToDo, changeToDo }) => {
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

  if (title === undefined) {
    return <NotFound />;
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

export const TodosList = ({ filteredToDos }) => {
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
    </div>
  );
};

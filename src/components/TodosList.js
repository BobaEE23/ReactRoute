import { Link } from "react-router-dom";

export const TodosList = ({
  filteredToDos,
  sortToDoS,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div>
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
    </div>
  );
};

import { ToDos } from "./components/Todos";
import { useState } from "react";
import { Input } from "./components/Input";
export const App = () => {
  const [refreshToDos, setRefreshToDos] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [toDos, setToDos] = useState([]);
  return (
    <div className="App">
      <Input
        refreshToDos={refreshToDos}
        isSort={isSort}
        setIsSort={setIsSort}
        toDos={toDos}
        setToDos={setToDos}
      ></Input>

      <ToDos
        refreshToDos={refreshToDos}
        setRefreshToDos={setRefreshToDos}
        isSort={isSort}
        setIsSort={setIsSort}
        toDos={toDos}
        setToDos={setToDos}
      ></ToDos>
    </div>
  );
};

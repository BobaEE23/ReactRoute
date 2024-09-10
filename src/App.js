import { ToDos } from "./components/Todos";

import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { Todo } from "./components/Todo";
export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToDos />} />
        <Route path="todo/:id" element={<Todo />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

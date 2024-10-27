import React from "react";
import TodoListItem from "./todo-list-item";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { selectFilteredTodos } from "@/lib/features/todos/todosSlice";

const TodoList = () => {
  const filteredTodo = useSelector((state: RootState) =>
    selectFilteredTodos(state),
  );
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {filteredTodo.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;

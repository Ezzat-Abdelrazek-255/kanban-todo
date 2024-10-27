import React from "react";
import TodoListItem from "./todo-list-item";
import { TEST_TODOS } from "@/constants";

const TodoList = () => {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {TEST_TODOS.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;

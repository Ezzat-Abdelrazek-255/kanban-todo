import React from "react";
import TodoCardColumn from "./todo-card-column";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { selectFilteredTodos } from "@/lib/features/todos/todosSlice";
import { TodoState } from "@/types";
import { TODO_STATE } from "@/constants";

const TodoCards = ({
  setIsCreatingTodo,
  setDefaultState,
}: {
  setIsCreatingTodo: (_: boolean) => void;
  setDefaultState: (_: TodoState) => void;
}) => {
  const todos = useSelector((state: RootState) => selectFilteredTodos(state));

  return (
    <div className="flex gap-16">
      {TODO_STATE.map((state) => (
        <TodoCardColumn
          setDefaultState={setDefaultState}
          key={state}
          state={state as TodoState}
          todos={todos.filter((todo) => todo.state === state)}
          setIsCreatingTodo={setIsCreatingTodo}
        />
      ))}
    </div>
  );
};

export default TodoCards;

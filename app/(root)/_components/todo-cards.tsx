import React from "react";
import TodoCardColumn from "./todo-card-column";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  selectFilteredTodos,
  updateTodo,
} from "@/lib/features/todos/todosSlice";
import { TodoState } from "@/types";
import { TODO_STATE } from "@/constants";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

const TodoCards = ({
  setIsCreatingTodo,
  setDefaultState,
}: {
  setIsCreatingTodo: (_: boolean) => void;
  setDefaultState: (_: TodoState) => void;
}) => {
  const todos = useSelector((state: RootState) => selectFilteredTodos(state));
  const dispatch = useDispatch();

  const handleDrop = async (todoId: string, targetState: TodoState) => {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.getUser();
    if (error || !authData?.user) {
      redirect("/login");
    }

    await supabase
      .from("todos")
      .update({ state: targetState })
      .eq("id", todoId);

    dispatch(
      updateTodo({
        id: todoId,
        updates: {
          state: targetState,
        },
      }),
    );
  };

  return (
    <div className="flex gap-16">
      {TODO_STATE.map((state) => (
        <TodoCardColumn
          onDrop={handleDrop}
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

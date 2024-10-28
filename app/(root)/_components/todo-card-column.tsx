import { Plus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { TodoItem, TodoState } from "@/types";
import TodoEdit from "./todo-edit";
import TodoDropdown from "./todo-dropdown";

const TodoCardColumn = ({
  todos,
  state,
  setIsCreatingTodo,
  setDefaultState,
}: {
  todos: TodoItem[];
  state: "todo" | "doing" | "done";
  setIsCreatingTodo: (_: boolean) => void;
  setDefaultState: (_: TodoState) => void;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleCreateTodo = function() {
    setIsCreatingTodo(true);
    setDefaultState(state);
  };
  return (
    <div className="py-6 px-4 border-muted border-[1px] bg-black min-w-[342px] rounded-[16px]">
      <div className="flex justify-between items-center">
        <h2 className="font-sans uppercase">{state}</h2>
        <button
          onClick={handleCreateTodo}
          aria-label="Create Todo"
          className="bg-muted text-foreground p-2 rounded-[4px]"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex flex-col items-center mt-4 gap-4">
        {todos.map((todo) => (
          <article
            key={todo.id}
            className="relative w-full h-[18.375rem] px-4 py-[7.1875rem] rounded-[8px] overflow-hidden"
          >
            <div className="absolute top-6 right-6 z-10">
              <TodoDropdown todo={todo} setIsEditOpen={setIsEditOpen} />
            </div>
            <Image
              fill
              sizes="80vw"
              src={todo.coverImgUrl}
              alt={todo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
            <div className="absolute z-10 left-4 bottom-6">
              <h3 className="font-sans text-2xl leading-[85%]">{todo.title}</h3>
              <p className="font-serif text-xs mt-2">{todo.description}</p>
              <p className="font-sans inline-block uppercase text-xs p-2 mt-4 bg-background text-foreground rounded-[8px]">
                {todo.priority}
              </p>
            </div>

            {isEditOpen && (
              <TodoEdit todo={todo} setIsEditOpen={setIsEditOpen} />
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default TodoCardColumn;

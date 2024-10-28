import { openTodo } from "@/lib/features/todos/todosSlice";
import { TodoItem } from "@/types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TodoDropdown from "./todo-dropdown";
import TodoEdit from "./todo-edit";

const TodoListItem = ({ todo }: { todo: TodoItem }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <li className="w-[75rem] flex items-center justify-between border-muted border-[1px] p-6 rounded-[8px] h-[7.25rem]">
      <div className="flex flex-col gap-4 max-w-[230px]">
        <button
          onClick={() => dispatch(openTodo({ id: todo.id }))}
          // Dispatch action to open a specific todo item based on its ID
          className="text-2xl text-left leading-[85%] font-sans whitespace-nowrap"
        >
          {todo.title}
        </button>
        <p className="font-serif text-xs">{todo.description}</p>
      </div>

      <div className="items-end flex flex-col justify-between h-full">
        {/* Dropdown menu with edit/delete options */}
        <TodoDropdown todo={todo} setIsEditOpen={setIsEditOpen} />
        <div className="flex items-center gap-4 font-sans">
          {/* Display todo state and priority */}
          <div className="uppercase bg-foreground text-background rounded-[4px] text-base px-4 py-2 ">
            {todo.state}
          </div>
          <div className="uppercase bg-foreground text-background rounded-[4px] text-base px-4 py-2 ">
            {todo.priority}
          </div>
        </div>
      </div>
      {/* Show edit component if edit mode is active */}
      {isEditOpen && <TodoEdit todo={todo} setIsEditOpen={setIsEditOpen} />}
    </li>
  );
};

export default TodoListItem;

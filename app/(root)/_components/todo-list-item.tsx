import { openTodo } from "@/lib/features/todos/todosSlice";
import { TodoItem } from "@/types";
import React from "react";
import { useDispatch } from "react-redux";

const TodoListItem = ({ todo }: { todo: TodoItem }) => {
  const dispatch = useDispatch();

  return (
    <li className="w-[75rem] flex items-center justify-between border-muted border-[1px] p-6 rounded-[8px] h-[7.25rem]">
      <div className="flex flex-col gap-4 max-w-[230px]">
        <button
          onClick={() => dispatch(openTodo({ id: todo.id }))}
          className="text-2xl text-left  leading-[85%] font-sans whitespace-nowrap"
        >
          {todo.title}
        </button>
        <p className="font-serif text-xs">{todo.description}</p>
      </div>

      <div className="items-end flex flex-col justify-between h-full">
        <button
          className="flex items-center gap-[2px] px-0 py-0"
          aria-label="Toggle Task Options Menu"
        >
          <div className="w-[4px] h-[4px] rounded-full bg-foreground"></div>
          <div className="w-[4px] h-[4px] rounded-full bg-foreground"></div>
          <div className="w-[4px] h-[4px] rounded-full bg-foreground"></div>
        </button>
        <div className="flex items-center gap-4 font-sans">
          <div className="uppercase bg-foreground text-background rounded-[4px] text-base px-4 py-2 ">
            {todo.state}
          </div>
          <div className="uppercase bg-foreground text-background rounded-[4px] text-base px-4 py-2 ">
            {todo.priority}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;

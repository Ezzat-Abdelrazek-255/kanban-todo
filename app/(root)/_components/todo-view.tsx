import Image from "next/image";
import { TodoItem } from "@/types";
import React from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeTodo } from "@/lib/features/todos/todosSlice";

const TodoView = ({ todo }: { todo: TodoItem }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-black/50"></div>
      <div className="w-[40rem] h-[25.3125rem] bg-black z-10 border-muted border-[1px]  rounded-[16px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <button
          className="rounded-full absolute top-6 right-6 w-[1.5rem] h-[1.5rem] bg-background text-foreground z-20 grid place-content-center"
          onClick={() => dispatch(closeTodo({ id: todo.id }))}
        >
          <X size="14" />
        </button>
        <div className="w-full h-[11rem] relative ">
          <Image
            fill
            sizes="80vw"
            className="w-full h-full object-cover"
            src={todo.coverImgUrl}
            alt={todo.title}
          />
        </div>
        <div className="flex flex-col p-6 gap-4">
          <h2 className="font-sans text-2xl">{todo.title}</h2>
          <p className="text-xs font-serif">{todo.description}</p>
          <p className="font-sans flex items-center gap-1 uppercase text-xs">
            <span className="inline-block w-[4rem]">State:</span>
            <span className="inline-block py-1 px-2 bg-yellow-500">
              {todo.state}
            </span>
          </p>
          <p className="font-sans flex items-center gap-1 uppercase text-xs">
            <span className="inline-block w-[4rem]">Priority:</span>
            <span className="inline-block py-1 px-2 bg-red-500">
              {todo.priority}
            </span>
          </p>
          <p className="font-sans flex items-center gap-1 uppercase text-xs">
            <span className="inline-block w-[4rem]">Owner:</span>
            <span className="inline-block py-1 px-2 bg-foreground text-background">
              {todo.ownerUsername}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default TodoView;

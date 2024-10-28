import { TodoItem, TodoState } from "@/types";
import Image from "next/image";
import React, { useRef } from "react";
import TodoDropdown from "./todo-dropdown";
import { useState } from "react";
import TodoEdit from "./todo-edit";
import { cn } from "@/lib/utils";
import { useDrag } from "react-dnd";
import { DragItem } from "@/types";

const TodoCard = ({ todo, state }: { todo: TodoItem; state: TodoState }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const elementRef = useRef<HTMLElement>(null);

  // Set up drag functionality
  const [{ isDragging }, dragRef] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "TodoCard",
    item: { id: todo.id, state, type: "TodoCard" }, // Define the dragged item's properties
    collect: (monitor) => ({
      // Monitor if the card is currently being dragged
      isDragging: monitor.isDragging(),
    }),
  });

  // Attach dragRef to the card element for drag behavior
  dragRef(elementRef);

  return (
    <article
      key={todo.id}
      className={cn(
        "z-base transition-opacity duration-200 relative w-full h-[18.375rem] px-4 py-[7.1875rem] rounded-[8px] overflow-hidden",
        isDragging ? "opacity-50" : "opacity-100", // Apply transparency when dragging
      )}
      ref={elementRef}
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

      {/* Display edit modal when isEditOpen is true */}
      {isEditOpen && <TodoEdit todo={todo} setIsEditOpen={setIsEditOpen} />}
    </article>
  );
};

export default TodoCard;

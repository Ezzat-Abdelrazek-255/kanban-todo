import { Plus } from "lucide-react";
import React, { useRef } from "react";
import { DragItem, TodoItem, TodoState } from "@/types";
import TodoCard from "./todo-card";
import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";

const TodoCardColumn = ({
  todos,
  state,
  setIsCreatingTodo,
  setDefaultState,
  onDrop,
}: {
  todos: TodoItem[];
  state: TodoState;
  setIsCreatingTodo: (_: boolean) => void;
  setDefaultState: (_: TodoState) => void;
  onDrop: (id: string, targetState: TodoState) => void;
}) => {
  const container = useRef<HTMLDivElement>(null);
  // Set up drop target
  const [{ isOver, canDrop }, dropRef] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: "TodoCard",
    drop: (item: DragItem) => {
      if (item.state !== state) {
        onDrop(item.id, state);
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  dropRef(container);

  const handleCreateTodo = () => {
    setIsCreatingTodo(true);
    setDefaultState(state);
  };

  return (
    <div
      ref={container}
      className={cn(
        "py-6 px-4 border-2 bg-black min-w-[342px] rounded-[16px]",
        isOver && canDrop ? "border-primary border-dashed" : "border-muted",
        canDrop && "border-primary/50",
      )}
    >
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
      <div
        className={cn(
          "flex flex-col items-center mt-4 gap-4 min-h-[100px] p-2",
          isOver && "bg-primary/10 rounded-lg",
        )}
      >
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} state={state} />
        ))}
      </div>
    </div>
  );
};

export default TodoCardColumn;

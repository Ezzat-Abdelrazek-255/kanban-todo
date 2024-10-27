import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { TodoItem } from "@/types";
import { useDispatch } from "react-redux";
import { deleteTodo } from "@/lib/features/todos/todosSlice";

const TodoDropdown = ({ todo }: { todo: TodoItem }) => {
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 px-0 py-0"
        aria-label="Toggle Task Options Menu"
      >
        <div className="w-[8px] h-[8px] rounded-full bg-foreground"></div>
        <div className="w-[8px] h-[8px] rounded-full bg-foreground"></div>
        <div className="w-[8px] h-[8px] rounded-full bg-foreground"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="focus:bg-background">
          <Button variant="outline" className=" w-full">
            Edit
            <Pencil />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-background">
          <Button
            variant="outline"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
            <Trash2 />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoDropdown;

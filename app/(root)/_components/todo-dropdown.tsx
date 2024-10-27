import React, { useState } from "react";
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
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { PostgrestError } from "@supabase/supabase-js";

const TodoDropdown = ({
  todo,
  setIsEditOpen,
}: {
  todo: TodoItem;
  setIsEditOpen: (_: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTodo = async function() {
    const supabase = createClient();
    const { error: authError } = await supabase.auth.getUser();

    if (authError) {
      return redirect("/login");
    }

    setIsDeleting(true);
    const { error: deleteError } = await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id);

    setIsDeleting(false);
    if (deleteError) {
      return setError(deleteError);
    }
    dispatch(deleteTodo(todo.id));
  };
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
          <Button
            onClick={() => setIsEditOpen(true)}
            variant="outline"
            className=" w-full flex gap-2 justify-between"
          >
            Edit
            <Pencil />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-background flex flex-col gap-2 items-start">
          <Button variant="outline" onClick={handleDeleteTodo}>
            Delete
            <Trash2 />
          </Button>
          <p>{error?.message}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoDropdown;

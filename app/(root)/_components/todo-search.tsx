import { Input } from "@/components/ui/input";
import { setFilter } from "@/lib/features/todos/todosSlice";
import React from "react";
import { useDispatch } from "react-redux";

const TodoSearch = () => {
  const dispatch = useDispatch();
  return (
    <Input
      onChange={(e) =>
        dispatch(
          setFilter({
            search: e.target.value,
          }),
        )
      }
      type="search"
      placeholder="Search Tasks"
      className="text-base placeholder:white/50 border-muted border-[1px] px-4 py-2 font-sans"
    />
  );
};

export default TodoSearch;

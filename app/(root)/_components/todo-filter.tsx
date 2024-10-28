import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const TodoFilter = ({
  placeholder,
  options,
  onChange,
}: {
  placeholder: string;
  options: {
    value: string;
    title: string;
  }[];
  onChange: (value: string) => void;
}) => {
  return (
    // Select component for filtering todos
    <Select onValueChange={onChange}>
      <SelectTrigger className="bg-muted text-white flex gap-1 items-center px-4 py-2">
        <Filter /> {/* Filter icon for visual indication */}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="font-sans">
        {/* Render each filter option dynamically */}
        {options.map((option) => (
          <SelectItem key={option.title} value={option.value}>
            {option.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TodoFilter;

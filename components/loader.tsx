import { cn } from "@/lib/utils";
import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "w-8 h-8 border-[5px] border-background border-b-transparent rounded-full inline-block animate-spin duration-1000",
        className,
      )}
    ></span>
  );
};

export default Loader;

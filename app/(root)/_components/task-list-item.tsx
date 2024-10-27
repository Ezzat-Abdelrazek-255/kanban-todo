import React from "react";

const TaskListItem = () => {
  return (
    <li className="w-[75rem] flex items-center justify-between border-muted border-[1px] p-6 rounded-[8px] h-[7.25rem]">
      <div className="flex flex-col gap-4 max-w-[230px]">
        <h2 className="text-2xl leading-[85%] font-sans">
          Finish Landing Page
        </h2>
        <p className="font-serif text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </p>
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
          <div className="uppercase bg-white text-black rounded-[4px] text-base px-4 py-2 bg-background text-foreground">
            Doing
          </div>
          <div className="uppercase bg-white text-black rounded-[4px] text-base px-4 py-2 bg-background text-foreground">
            High
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;

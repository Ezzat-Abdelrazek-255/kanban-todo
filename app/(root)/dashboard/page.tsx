import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import React from "react";
import { ArrowUpDown, Filter, List, WalletCards } from "lucide-react";
import TaskList from "../_components/task-list";

const DashboardPage = () => {
  return (
    <main className="mt-8">
      <Tabs defaultValue="list">
        <div className="w-full border-muted flex items-center justify-between border-[1px] rounded-[8px] p-4">
          <div className="flex items-center gap-4 font-sans text-base">
            <Input
              type="search"
              placeholder="Search Tasks"
              className="text-base placeholder:white/50 border-muted border-[1px] px-4 py-2 font-sans"
            />
            <Button className="bg-muted text-white flex gap-1 items-center px-4 py-2">
              <Filter />
              Filter
            </Button>
            <Button className="bg-muted text-white flex gap-1 items-center px-4 py-2">
              <ArrowUpDown />
              Sort
            </Button>
          </div>
          <TabsList>
            <TabsTrigger
              value="list"
              className="flex gap-1 items-center px-4 py-2"
            >
              <List size="18" />
              List
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="flex gap-1 items-center px-4 py-2"
            >
              <WalletCards size="18" />
              Cards
            </TabsTrigger>
          </TabsList>
        </div>
        <TaskList />
      </Tabs>
    </main>
  );
};

export default DashboardPage;

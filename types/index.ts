export type TodoItem = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  state: "todo" | "doing" | "done";
  ownerUsername: string;
  coverImgUrl: string;
  createdAt: string;
  updatedAt: string;
  isOpen: boolean;
};

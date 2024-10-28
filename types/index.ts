export type TodoState = "todo" | "doing" | "done";
export type TodoPriority = "low" | "medium" | "high";
export type ImageMetadata = {
  path: string;
  size: number;
  mime_type: string;
};

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

export type DragItem = {
  id: string;
  state: TodoState;
  type: string;
};

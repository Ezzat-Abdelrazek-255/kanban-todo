import { TodoItem } from "@/types";

export const SUPABASE_IMAGES_BASE_URL =
  "https://gdlbinnbghlgzhwlhwfn.supabase.co/storage/v1/object/public/todo_covers/";

export const STATE_FILTER_OPTIONS = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Todo",
    value: "todo",
  },

  {
    title: "Doing",
    value: "doing",
  },

  {
    title: "Done",
    value: "Done",
  },
];

export const PRIORITY_FILTER_OPTIONS = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Low",
    value: "low",
  },

  {
    title: "Medium",
    value: "medium",
  },

  {
    title: "High",
    value: "high",
  },
];

export const DEMO_LOGIN_CREDENTIALS = [
  {
    username: "task-owner-1",
    email: "taskowner2024@gmail.com",
    password: "taskowner2024",
  },
  {
    username: "task-owner-2",
    email: "taskowner2023@gmail.com",
    password: "taskowner2024",
  },
  {
    username: "employee",
    email: "employee2024@gmail.com",
    password: "employee2024",
  },
];

export const TEST_TODOS: TodoItem[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description:
      "Draft and submit the Q4 project proposal with budget estimates",
    priority: "high",
    state: "doing",
    ownerUsername: "sarah.miller",
    coverImgUrl: "/0.jpg",
    createdAt: "2024-10-25T08:00:00.000Z",
    updatedAt: "2024-10-26T10:30:00.000Z",
    isOpen: false,
  },
  {
    id: "2",
    title: "Review Pull Requests",
    description:
      "Review and merge pending pull requests for the authentication module",
    priority: "medium",
    state: "todo",
    ownerUsername: "john.dev",
    coverImgUrl: "/0.jpg",
    createdAt: "2024-10-25T09:15:00.000Z",
    updatedAt: "2024-10-25T09:15:00.000Z",
    isOpen: false,
  },
  {
    id: "3",
    title: "Update Documentation",
    description: "Update API documentation with new endpoints and examples",
    priority: "low",
    state: "done",
    ownerUsername: "alex.writes",
    coverImgUrl: "/0.jpg",
    createdAt: "2024-10-24T14:20:00.000Z",
    updatedAt: "2024-10-26T16:45:00.000Z",
    isOpen: false,
  },
];

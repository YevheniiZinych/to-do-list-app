import { Todo } from "./todo";

interface Column {
  name: string;
  tasks: Todo[];
}

export interface Board {
  id: string;
  name: string;
  columns: {
    todo: Column;
    inProgress: Column;
    done: Column;
  };
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
   id: string;
   title: string;
   status: TaskStatus;
   tags: string[];
   subtasks: Task[];
   createdAt: Date;
   updatedAt: Date;
}

export type TaskItemProps = {
   task: Task;
   isSubtask?: boolean;
   statusOptions: {
      value: string;
      label: string;
   }[];
};

export type TaskItemEmit = {
   (e: 'delete'): void;
   (e: 'update:task', value: Task): void;
};

export interface Project {
   id: string;
   name: string;
   tasks: Task[];
}

export interface Filters {
   statuses: TaskStatus[];
   tags: string[];
   search: string;
}

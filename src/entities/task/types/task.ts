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

export const mockTasks: Task[] = [
   {
      id: '1',
      title: 'Создать базовый шаблон проекта',
      status: 'done',
      tags: ['setup', 'vite'],
      subtasks: [],
      createdAt: new Date('2025-07-01T10:00:00'),
      updatedAt: new Date('2025-07-01T12:00:00'),
   },
   {
      id: '2',
      title: 'Настроить Tailwind и SCSS',
      status: 'in-progress',
      tags: ['styles', 'tailwind'],
      subtasks: [],
      createdAt: new Date('2025-07-02T09:30:00'),
      updatedAt: new Date('2025-07-02T11:00:00'),
   },
   {
      id: '3',
      title: 'Реализовать компонент TaskItem',
      status: 'todo',
      tags: ['component', 'task'],
      subtasks: [
         {
            id: '3-1bbbggggttthhhjjj',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1vvvvv',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1cccccc',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1wqqqqqqqqqqqqqqq',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1fegbbbbbbgggggg',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
      ],
      createdAt: new Date('2025-07-03T08:00:00'),
      updatedAt: new Date('2025-07-03T08:00:00'),
   },
   {
      id: '4',
      title: 'Добавить экспорт задач с шифрованием',
      status: 'todo',
      tags: ['crypto', 'export'],
      subtasks: [
         {
            id: '3-1gergegegerg',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1fgdfhhergergeg',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1fvcggrgrgerwhgngfgfg',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
      ],
      createdAt: new Date('2025-07-04T14:15:00'),
      updatedAt: new Date('2025-07-04T14:15:00'),
   },
   {
      id: '5',
      title: 'Импортировать задачи из файла',
      status: 'todo',
      tags: ['crypto', 'import'],
      subtasks: [
         {
            id: '3-1rwrwrwe',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1wewewe',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
         {
            id: '3-1rerererererggff',
            title: 'Создать UI-верстку',
            status: 'todo',
            tags: [],
            subtasks: [],
            createdAt: new Date('2025-07-03T08:00:00'),
            updatedAt: new Date('2025-07-03T08:00:00'),
         },
      ],
      createdAt: new Date('2025-07-04T15:00:00'),
      updatedAt: new Date('2025-07-04T15:00:00'),
   },
];

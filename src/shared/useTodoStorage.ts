import type { Project, TaskStatus } from '@/entities/task/types/task';
import { ref, watch } from 'vue';

const STORAGE_KEY = 'todo_app_data';

interface Filters {
   statuses: TaskStatus[];
   tags: string[];
   search: string;
}

interface TodoAppData {
   projects: Project[];
   filters: Filters;
}

const defaultData: TodoAppData = {
   projects: [],
   filters: {
      statuses: [],
      tags: [],
      search: '',
   },
};

const stored = localStorage.getItem(STORAGE_KEY);
let parsed: TodoAppData;

try {
   parsed = stored ? JSON.parse(stored) : defaultData;
} catch {
   parsed = defaultData;
}

if (!parsed.projects || parsed.projects.length === 0) {
   parsed.projects = [
      {
         id: crypto.randomUUID(),
         name: 'Мой проект',
         tasks: [],
      },
   ];
}

const projects = ref<Project[]>(parsed.projects);
const filters = ref<Filters>({ ...parsed.filters });

watch(
   [projects, filters],
   () => {
      const data: TodoAppData = {
         projects: projects.value,
         filters: filters.value,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
   },
   { deep: true }
);

export function useTodoStorage() {
   return {
      projects,
      filters,
   };
}

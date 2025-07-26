import { ref, computed, watch } from 'vue';
import type { Task } from '../types/task';

const STORAGE_KEY = 'todo_app_data';

interface Project {
   id: string;
   name: string;
   tasks: Task[];
}

interface StoredData {
   projects: Project[];
   filters: {
      statuses: Array<'todo' | 'in-progress' | 'done'>;
      tags: string[];
      search: string;
   };
}

export function useTasks(projectId: string, limit: number = 10) {
   const allTasks = ref<Task[]>([]);
   const isLoading = ref(false);
   const totalPages = ref(1);
   const page = ref(1);

   const loadTasks = () => {
      isLoading.value = true;
      try {
         const raw = localStorage.getItem(STORAGE_KEY);
         if (!raw) {
            allTasks.value = [];
            totalPages.value = 1;
            return;
         }

         const data: StoredData = JSON.parse(raw);
         const project = data.projects.find(p => p.id === projectId);

         if (!project) {
            console.warn(`Проект с id "${projectId}" не найден`);
            allTasks.value = [];
            totalPages.value = 1;
            return;
         }

         allTasks.value = project.tasks;
         totalPages.value = Math.max(1, Math.ceil(project.tasks.length / limit));
      } catch (error) {
         console.error('Ошибка при загрузке задач:', error);
         allTasks.value = [];
         totalPages.value = 1;
      } finally {
         isLoading.value = false;
      }
   };

   const tasks = computed(() => {
      const start = (page.value - 1) * limit;
      const end = start + limit;
      return allTasks.value.slice(start, end);
   });

   loadTasks();

   watch(page, () => {});

   return {
      tasks,
      isLoading,
      totalPages,
      page,
      reload: loadTasks,
   };
}

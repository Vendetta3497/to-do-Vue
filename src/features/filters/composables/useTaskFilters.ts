import { ref, computed, type Ref } from 'vue';
import type { Task } from '@/entities/task/types/task';

export function useTaskFilters(tasks: Ref<Task[]>) {
   const filters = ref({
      statuses: [] as string[],
      tags: [] as string[],
      search: '',
   });

   function applyFilters(newFilters: typeof filters.value) {
      filters.value = newFilters;
   }

   const filteredTasks = computed(() => {
      return tasks.value.filter(task => {
         const matchesStatus =
            filters.value.statuses.length === 0 || filters.value.statuses.includes(task.status);

         const matchesTags =
            filters.value.tags.length === 0 ||
            filters.value.tags.every(tag => task.tags.includes(tag));

         const matchesSearch = task.title
            .toLowerCase()
            .includes(filters.value.search.toLowerCase());

         return matchesStatus && matchesTags && matchesSearch;
      });
   });

   return {
      filters,
      applyFilters,
      filteredTasks,
   };
}

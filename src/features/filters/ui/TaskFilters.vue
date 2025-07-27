<template>
   <div
      class="flex flex-col gap-6 p-4 items-center justify-center bg-white rounded-lg shadow-sm px-4 sm:px-8 md:px-20 mb-20"
   >
      <BaseInput v-model="searchQuery" placeholder="Поиск по названию" class="w-full" />

      <div class="flex flex-col gap-2 items-center justify-center">
         <p class="font-semibold text-gray-700">Статусы:</p>
         <div class="flex flex-wrap gap-3">
            <label
               v-for="status in statusOptions"
               :key="status.value"
               class="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
               <input
                  type="checkbox"
                  class="accent-blue-600"
                  :value="status.value"
                  v-model="selectedStatuses"
               />
               <span class="text-sm text-gray-800">{{ status.label }}</span>
            </label>
         </div>
      </div>

      <div class="flex flex-col gap-2 items-center justify-center">
         <p class="font-semibold text-gray-700">Теги:</p>
         <div class="flex flex-wrap gap-3">
            <label
               v-for="tag in allTags"
               :key="tag.value"
               class="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
               <input
                  type="checkbox"
                  class="accent-green-600"
                  :value="tag.value"
                  v-model="selectedTags"
               />
               <span class="text-sm text-gray-800">{{ tag.label }}</span>
            </label>
         </div>
      </div>

      <div class="flex items-center justify-center">
         <BaseButton variant="danger" @click="resetFilters">Сбросить</BaseButton>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Task } from '@/entities/task/types/task';

const props = defineProps<{
   tasks: Task[];
   statusOptions: { value: Task['status']; label: string }[];
}>();

const emit = defineEmits<{
   (
      e: 'update:filters',
      filters: {
         statuses: string[];
         tags: string[];
         search: string;
      }
   ): void;
}>();

const searchQuery = ref('');
const selectedStatuses = ref<string[]>([]);
const selectedTags = ref<string[]>([]);

const allTags = computed(() => {
   const tagSet = new Set<string>();
   props.tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
   return Array.from(tagSet).map(tag => ({ value: tag, label: '#' + tag }));
});

watch([selectedStatuses, selectedTags, searchQuery], () => {
   emit('update:filters', {
      statuses: selectedStatuses.value,
      tags: selectedTags.value,
      search: searchQuery.value.trim(),
   });
});

function resetFilters() {
   searchQuery.value = '';
   selectedStatuses.value = [];
   selectedTags.value = [];
}
</script>

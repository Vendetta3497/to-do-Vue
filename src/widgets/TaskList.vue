<template>
   <div class="flex flex-col">
      <TaskFilters
         :tasks="tasks"
         :filters="filters"
         :status-options="statusOptions"
         :all-tags="allTags"
         @update:filters="applyFilters"
      />

      <div class="flex justify-center mb-10">
         <BaseButton variant="primary" @click="showModal = true">+ Новая задача</BaseButton>
      </div>

      <div class="flex flex-col gap-10 w-full px-4 sm:px-8 md:px-20 mb-20">
         <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            :status-options="statusOptions"
            @update:task="updateTask"
            @delete="deleteTask(task.id)"
         />
      </div>

      <BaseModal :show="showModal" @close="showModal = false">
         <h2 class="text-xl font-semibold mb-4">Создать новую задачу</h2>
         <TaskForm :status-options="statusOptions" @submit="onTaskFormSubmit" />
      </BaseModal>
   </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Task } from '@/entities/task/types/task';
import TaskItem from '@/entities/task/ui/TaskItem.vue';
import TaskForm from '@/widgets/TaskForm.vue';
import TaskFilters from '@/features/filters/ui/TaskFilters.vue';

const props = defineProps<{
   tasks: Task[];
   statusOptions: { value: Task['status']; label: string }[];
}>();

const emit = defineEmits<{
   (e: 'update:task', task: Task): void;
   (e: 'delete', id: string): void;
   (e: 'create', task: Task): void;
}>();

const showModal = ref(false);

const filters = ref({
   statuses: [] as string[],
   tags: [] as string[],
   search: '',
});

function applyFilters(newFilters: typeof filters.value) {
   filters.value = newFilters;
}

const allTags = computed(() => {
   const tagSet = new Set<string>();
   props.tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
   return Array.from(tagSet).map(tag => ({ value: tag, label: '#' + tag }));
});

const filteredTasks = computed(() => {
   return props.tasks.filter(task => {
      const matchesStatus =
         filters.value.statuses.length === 0 || filters.value.statuses.includes(task.status);

      const matchesTags =
         filters.value.tags.length === 0 ||
         filters.value.tags.every(tag => task.tags.includes(tag));

      const matchesSearch = task.title.toLowerCase().includes(filters.value.search.toLowerCase());

      return matchesStatus && matchesTags && matchesSearch;
   });
});

function updateTask(task: Task) {
   emit('update:task', task);
}

function deleteTask(id: string) {
   emit('delete', id);
}

function onTaskFormSubmit(task: Task) {
   emit('create', task);
   showModal.value = false;
}
</script>

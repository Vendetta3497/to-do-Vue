<template>
   <div class="flex flex-col">
      <input
         v-if="currentProject"
         v-model="currentProject.name"
         class="text-2xl font-bold text-center my-10 border-b-2 outline-none px-2 py-1 max-w-md mx-auto"
         placeholder="Название проекта"
      />

      <div class="flex justify-center gap-4 mb-6">
         <BaseButton variant="primary" @click="handleExport"> Экспортировать </BaseButton>

         <label class="relative">
            <input
               type="file"
               accept=".txt"
               @change="handleImport"
               class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <BaseButton variant="primary">Импортировать</BaseButton>
         </label>
      </div>

      <TaskList
         :tasks="tasks"
         :status-options="statusOptions"
         @update:task="updateTask"
         @delete="deleteTask"
         @create="createTask"
      />
   </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { Filters, Project, Task, TaskStatus } from '@/entities/task/types/task';
import TaskList from '@/widgets/TaskList.vue';
import { useTodoStorage } from '@/shared/useTodoStorage';
import { exportData } from '@/shared/export';
import { importData } from '@/shared/importData';

const { projects, filters } = useTodoStorage();

onMounted(() => {
   if (projects.value.length === 0) {
      projects.value.push({
         id: crypto.randomUUID(),
         name: 'Мой проект',
         tasks: [],
      });
   }
});

const currentProject = computed(() => projects.value[0]);
const tasks = computed(() => currentProject.value?.tasks ?? []);

const statusOptions: { value: TaskStatus; label: string }[] = [
   { value: 'todo', label: 'To Do' },
   { value: 'in-progress', label: 'In Progress' },
   { value: 'done', label: 'Done' },
];

function createTask(task: Task) {
   currentProject.value?.tasks.unshift(task);
}

function updateTask(updated: Task) {
   const index = currentProject.value?.tasks.findIndex(t => t.id === updated.id);
   if (index !== undefined && index !== -1 && currentProject.value) {
      currentProject.value.tasks[index] = updated;
   }
}

function deleteTask(id: string) {
   if (currentProject.value) {
      currentProject.value.tasks = currentProject.value.tasks.filter(task => task.id !== id);
   }
}

function handleExport() {
   const password = prompt('Введите пароль для шифрования:');
   if (!password) return;

   exportData({ projects: projects.value, filters: filters.value }, password);
}

async function handleImport(event: Event) {
   const input = event.target as HTMLInputElement;
   if (!input.files || input.files.length === 0) return;

   const password = prompt('Введите пароль для расшифровки:');
   if (!password) return;

   const file = input.files[0];
   const result = await importData(file, password);

   if (result && typeof result === 'object') {
      const { projects: importedProjects, filters: importedFilters } = result as {
         projects: Project[];
         filters: Filters;
      };
      projects.value = importedProjects;
      filters.value = importedFilters;
      alert('Импорт успешно завершён!');
   } else {
      alert('Ошибка: неверный пароль или повреждённый файл');
   }

   input.value = '';
}
</script>

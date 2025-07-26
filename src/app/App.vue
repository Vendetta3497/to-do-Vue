<template>
   <div class="flex flex-col">
      <h1 class="text-3xl font-bold text-center my-20">
         ToDo-лист с мультитиповыми статусами, тегами и шифрованным экспортом
      </h1>

      <div class="flex flex-col gap-10 w-full px-20">
         <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @update:task="updateTask"
            @delete="deleteTask(task.id)"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TaskItem from '@/entities/task/ui/TaskItem.vue';
import { mockTasks } from '@/entities/task/types/task';
import type { Task } from '@/entities/task/types/task';

const tasks = ref<Task[]>([...mockTasks]);

function updateTask(updated: Task) {
   const index = tasks.value.findIndex(t => t.id === updated.id);
   if (index !== -1) tasks.value[index] = updated;
}

function deleteTask(id: string) {
   tasks.value = tasks.value.filter(task => task.id !== id);
}
</script>

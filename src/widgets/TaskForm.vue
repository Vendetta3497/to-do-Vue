<template>
   <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <BaseInput v-model="title" placeholder="Название задачи" required />
      <BaseSelect v-model="status" :options="props.statusOptions" placeholder="Выберите статус" />
      <BaseButton type="submit" variant="primary">Создать задачу</BaseButton>
   </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/entities/task/types/task';

const emit = defineEmits<{
   (e: 'submit', task: Task): void;
}>();

const props = defineProps<{
   statusOptions: { value: string; label: string }[];
}>();

const title = ref('');
const status = ref<Task['status']>('todo');

function handleSubmit() {
   if (!title.value.trim()) return;

   const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.value.trim(),
      status: status.value,
      tags: [],
      subtasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
   };

   emit('submit', newTask);

   title.value = '';
   status.value = 'todo';
}
</script>

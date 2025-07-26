<template>
   <div
      class="flex flex-col gap-4 p-6 rounded-xl shadow-md transition"
      :class="[
         isSubtask
            ? 'bg-white border-l-4 border-blue-500 ml-6 text-gray-800'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
      ]"
   >
      <div class="flex flex-col md:flex-row md:justify-between gap-4">
         <BaseSelect
            :id="`task-status-${localTask.id}`"
            :name="`task-status-${localTask.id}`"
            :model-value="localTask.status"
            @update:model-value="updateStatus"
            :options="statusOptions"
            placeholder="Выберите статус"
         />

         <div class="flex flex-wrap gap-2 items-center">
            <div class="flex flex-wrap gap-2 items-center">
               <div v-for="(tag, index) in localTask.tags" :key="index">
                  <div v-if="editingTagIndex === index">
                     <input
                        v-model="editingTag"
                        @keydown.enter.prevent="saveTagEdit(index)"
                        @blur="saveTagEdit(index)"
                        class="bg-transparent border-b border-white outline-none w-20 text-white"
                        :id="`edit-tag-${index}`"
                        :name="`edit-tag-${index}`"
                        autofocus
                     />
                  </div>
                  <div v-else>
                     <BaseTag
                        :label="'#' + tag"
                        color="blue"
                        removable
                        @click="editTag(index)"
                        @remove="removeTag(index)"
                     />
                  </div>
               </div>
            </div>
            <input
               v-model="tagInput"
               @keydown.enter.prevent="addTag"
               class="bg-gray-800 text-white text-sm px-2 py-1 rounded w-20 placeholder-white/60"
               placeholder="+ тег"
               id="new-tag"
               name="new-tag"
            />
         </div>
      </div>

      <div class="flex flex-col md:flex-row gap-2 items-start md:items-center flex-wrap">
         <BaseInput
            variant="light"
            v-model="localTask.title"
            placeholder="Название задачи"
            :id="`task-title-${localTask.id}`"
            :name="`task-title-${localTask.id}`"
         />
         <BaseButton variant="danger" @click="onDelete">Удалить</BaseButton>

         <BaseButton v-if="localTask.subtasks.length" variant="primary" @click="toggleSubtasks">
            {{ isSubtasksVisible ? 'Скрыть подзадачи' : 'Показать подзадачи' }}
         </BaseButton>

         <BaseButton variant="primary" @click="toggleAddSubtask">
            {{ isAddingSubtask ? 'Отменить' : 'Добавить подзадачу' }}
         </BaseButton>
      </div>

      <div
         v-if="isAddingSubtask"
         class="mt-2 flex flex-col sm:flex-row gap-2 items-start sm:items-center"
      >
         <BaseInput
            variant="light"
            v-model="newSubtaskTitle"
            placeholder="Новая подзадача"
            :id="`subtask-title-${localTask.id}`"
            :name="`subtask-title-${localTask.id}`"
         />
         <BaseButton variant="primary" @click="addSubtask">Сохранить</BaseButton>
      </div>

      <transition name="fade">
         <div
            v-if="isSubtasksVisible && localTask.subtasks.length"
            class="pl-4 border-l border-white/30 mt-4 flex flex-col gap-2"
         >
            <TaskItem
               v-for="subtask in localTask.subtasks"
               :key="subtask.id"
               :task="subtask"
               :is-subtask="true"
               @update:task="onSubtaskUpdate(subtask.id, $event)"
               @delete="onSubtaskDelete(subtask.id)"
            />
         </div>
      </transition>
   </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Task } from '../types/task';
import BaseInput from '@/shared/BaseInput.vue';
import BaseButton from '@/shared/BaseButton.vue';
import BaseSelect from '@/shared/BaseSelect.vue';
import BaseTag from '@/shared/BaseTag.vue';
import TaskItem from './TaskItem.vue';

const props = defineProps<{
   task: Task;
   isSubtask?: boolean;
}>();

const emit = defineEmits<{
   (e: 'delete'): void;
   (e: 'update:task', value: Task): void;
}>();

const localTask = ref({ ...props.task });
const editingTagIndex = ref<number | null>(null);
const editingTag = ref('');
const tagInput = ref('');
const isSubtasksVisible = ref(false);
const isAddingSubtask = ref(false);
const newSubtaskTitle = ref('');

const statusOptions = [
   { value: 'todo', label: 'To Do' },
   { value: 'in-progress', label: 'In Progress' },
   { value: 'done', label: 'Done' },
];

watch(
   () => props.task,
   newTask => {
      localTask.value = { ...newTask };
   },
   { deep: true, immediate: true }
);

function emitUpdate() {
   emit('update:task', { ...localTask.value });
}

function updateStatus(value: string) {
   localTask.value.status = value as Task['status'];
   emitUpdate();
}

function editTag(index: number) {
   editingTagIndex.value = index;
   editingTag.value = localTask.value.tags[index];
}

function saveTagEdit(index: number) {
   const newTag = editingTag.value.trim();
   if (newTag && !localTask.value.tags.includes(newTag)) {
      localTask.value.tags[index] = newTag;
      emitUpdate();
   }
   editingTagIndex.value = null;
   editingTag.value = '';
}

function addTag() {
   const tag = tagInput.value.trim();
   if (tag && !localTask.value.tags.includes(tag)) {
      localTask.value.tags.push(tag);
      emitUpdate();
   }
   tagInput.value = '';
}

function removeTag(index: number) {
   localTask.value.tags.splice(index, 1);
   emitUpdate();
}

function onDelete() {
   emit('delete');
}

function onSubtaskUpdate(id: string, updated: Task) {
   const index = localTask.value.subtasks.findIndex(t => t.id === id);
   if (index !== -1) {
      localTask.value.subtasks[index] = updated;
      emitUpdate();
   }
}

function onSubtaskDelete(id: string) {
   localTask.value.subtasks = localTask.value.subtasks.filter(t => t.id !== id);
   emitUpdate();
}

function addSubtask() {
   const title = newSubtaskTitle.value.trim();
   if (!title) return;

   const newSubtask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      tags: [],
      subtasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
   };

   localTask.value.subtasks.push(newSubtask);
   emitUpdate();
   newSubtaskTitle.value = '';
   isAddingSubtask.value = false;
}

function toggleSubtasks() {
   isSubtasksVisible.value = !isSubtasksVisible.value;
}

function toggleAddSubtask() {
   isAddingSubtask.value = !isAddingSubtask.value;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
   transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
   opacity: 0;
   transform: translateY(-5px);
}
</style>

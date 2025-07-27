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
            <BaseTag
               v-for="(tag, index) in localTask.tags"
               :key="`${localTask.id}-${index}`"
               :id="`edit-tag-${localTask.id}-${index}`"
               :label="'#' + tag"
               color="green"
               removable
               editable
               @remove="removeTag(index)"
               @update:label="(val: string) => updateTag(index, val.replace(/^#/, ''))"
            />
            <input
               v-model="tagInput"
               @keydown.enter.prevent="addTag"
               class="bg-gray-800 text-white text-sm px-2 py-1 rounded w-20 placeholder-white/60"
               :id="`new-tag-${localTask.id}`"
               :name="`new-tag-${localTask.id}`"
               placeholder="+ тег"
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
               :status-options="statusOptions"
               @update:task="onSubtaskUpdate(subtask.id, $event)"
               @delete="onSubtaskDelete(subtask.id)"
            />
         </div>
      </transition>
   </div>
</template>

<script setup lang="ts">
import { useTaskItem } from '@/entities/task/composables/useTaskItem';
import type { TaskItemProps, TaskItemEmit } from '../types/task';

const props = defineProps<TaskItemProps>();
const emit = defineEmits<TaskItemEmit>();

const {
   localTask,
   tagInput,
   isSubtasksVisible,
   isAddingSubtask,
   newSubtaskTitle,
   updateStatus,
   addTag,
   removeTag,
   onDelete,
   onSubtaskUpdate,
   onSubtaskDelete,
   addSubtask,
   toggleSubtasks,
   toggleAddSubtask,
   updateTag,
} = useTaskItem(props, emit);
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

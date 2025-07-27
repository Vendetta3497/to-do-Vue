import { ref, watch } from 'vue';
import type { Task, TaskItemEmit, TaskItemProps } from '@/entities/task/types/task';

export function useTaskItem(props: TaskItemProps, emit: TaskItemEmit) {
   const localTask = ref({ ...props.task });
   const editingTagIndex = ref<number | null>(null);
   const editingTag = ref('');
   const tagInput = ref('');
   const isSubtasksVisible = ref(false);
   const isAddingSubtask = ref(false);
   const newSubtaskTitle = ref('');

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

   function updateTag(index: number, newLabel: string) {
      const clean = newLabel.trim();
      if (clean && !localTask.value.tags.includes(clean)) {
         localTask.value.tags[index] = clean;
         emitUpdate();
      }
   }

   return {
      localTask,
      editingTagIndex,
      editingTag,
      tagInput,
      isSubtasksVisible,
      isAddingSubtask,
      newSubtaskTitle,
      updateStatus,
      editTag,
      saveTagEdit,
      addTag,
      removeTag,
      onDelete,
      onSubtaskUpdate,
      onSubtaskDelete,
      addSubtask,
      toggleSubtasks,
      toggleAddSubtask,
      updateTag,
   };
}

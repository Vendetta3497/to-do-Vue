<template>
   <span
      v-if="!isEditing"
      :class="[
         'inline-flex items-center gap-1 text-sm px-5 py-2 rounded-full font-medium',
         tagColor,
         removable ? 'pr-1' : '',
         editable ? 'cursor-pointer' : '',
      ]"
      @click="onEditClick"
   >
      <slot>{{ label }}</slot>
      <button
         v-if="removable"
         @click.stop="$emit('remove')"
         class="ml-1 text-xs text-white/70 px-2 hover:text-black focus:outline-none"
         aria-label="Удалить тег"
      >
         &times;
      </button>
   </span>

   <input
      v-else
      :value="editedValue"
      @input="onInput"
      @keydown.enter.prevent="emitSave"
      @blur="emitSave"
      :id="inputId"
      :name="inputId"
      class="bg-transparent border-b border-black outline-none w-20 text-black"
      autofocus
   />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

defineOptions({ name: 'BaseTag' });

const props = defineProps<{
   label?: string;
   color?: 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'indigo' | 'custom';
   removable?: boolean;
   editable?: boolean;
   id?: string;
}>();

const emit = defineEmits<{
   (e: 'remove'): void;
   (e: 'update:label', value: string): void;
}>();

const isEditing = ref(false);
const editedValue = ref(props.label ?? '');

const inputId = computed(() => props.id || `tag-input-${Math.random().toString(36).slice(2)}`);

watch(
   () => props.label,
   newLabel => {
      editedValue.value = newLabel ?? '';
   }
);

function onEditClick() {
   if (props.editable) isEditing.value = true;
}

function onInput(e: Event) {
   editedValue.value = (e.target as HTMLInputElement).value;
}

function emitSave() {
   if (editedValue.value.trim()) {
      emit('update:label', editedValue.value.trim());
   }
   isEditing.value = false;
}

const tagColor = computed(() => {
   switch (props.color) {
      case 'blue':
         return 'bg-blue-500 text-white';
      case 'green':
         return 'bg-green-500 text-white';
      case 'red':
         return 'bg-red-500 text-white';
      case 'gray':
         return 'bg-gray-500 text-white';
      case 'yellow':
         return 'bg-yellow-400 text-black';
      case 'indigo':
         return 'bg-indigo-500 text-white';
      case 'custom':
         return '';
      default:
         return 'bg-gray-300 text-black';
   }
});
</script>

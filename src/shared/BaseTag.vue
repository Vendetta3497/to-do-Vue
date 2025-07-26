<template>
   <span
      :class="[
         'inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-full font-medium',
         tagColor,
         removable ? 'pr-1' : '',
      ]"
   >
      <slot>{{ label }}</slot>
      <button
         v-if="removable"
         @click="$emit('remove')"
         class="ml-1 text-xs text-white/70 hover:text-white"
         aria-label="Удалить тег"
      >
         &times;
      </button>
   </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseTag' });

const props = defineProps<{
   label?: string;
   color?: 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'indigo' | 'custom';
   removable?: boolean;
}>();

defineEmits<{
   (e: 'remove'): void;
}>();

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

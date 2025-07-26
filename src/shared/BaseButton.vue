<template>
   <button
      :class="[
         'px-4 py-2 rounded font-medium transition',
         variantClass,
         disabled && 'opacity-50 cursor-not-allowed',
      ]"
      :disabled="disabled"
   >
      <slot />
   </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseButton' });

const props = defineProps<{
   variant?: 'primary' | 'secondary' | 'danger';
   disabled?: boolean;
}>();

const variantClass = computed(() => {
   switch (props.variant) {
      case 'primary':
         return 'bg-yellow-600 text-black hover:bg-blue-700';
      case 'secondary':
         return 'bg-appDark text-white hover:bg-gray-300';
      case 'danger':
         return 'bg-red-600 text-white hover:bg-red-700';
      default:
         return 'bg-gray-100 text-black';
   }
});
</script>

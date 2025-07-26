<template>
   <button :class="computedClass" :disabled="disabled">
      <slot />
   </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
   name: 'BaseButton',
});

const props = defineProps<{
   variant?: 'primary' | 'secondary' | 'danger';
   size?: 'sm' | 'md' | 'lg';
   disabled?: boolean;
}>();

const computedClass = computed(() => {
   return [
      'btn',
      props.size === 'sm' && 'btn-sm',
      props.size === 'md' && 'btn-md',
      props.size === 'lg' && 'btn-lg',
      props.variant === 'primary' && 'btn-primary',
      props.variant === 'secondary' && 'btn-secondary',
      props.variant === 'danger' && 'btn-danger',
      props.disabled && 'opacity-50 cursor-not-allowed',
   ];
});
</script>

<style lang="scss" scoped>
@layer components {
   .btn {
      @apply px-4 py-2 rounded font-semibold transition;
   }

   .btn-primary {
      @apply bg-blue-600 text-white;
   }

   .btn-secondary {
      @apply bg-gray-200 text-black;
   }

   .btn-danger {
      @apply bg-red-600 text-white;
   }
}
</style>

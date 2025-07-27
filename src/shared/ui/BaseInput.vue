<template>
   <div class="w-full">
      <input
         v-bind="$attrs"
         :type="type"
         :value="modelValue"
         :placeholder="placeholder"
         :autofocus="autofocus"
         :disabled="disabled"
         @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
         :class="[
            'w-full px-3 py-2 rounded border text-sm outline-none transition',
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500',
            disabled && 'opacity-50 cursor-not-allowed',
            variant === 'dark' && 'bg-gray-800 text-white placeholder-white',
            variant === 'light' && 'bg-white text-black placeholder-gray-500',
            variant === 'default' && 'bg-gray-100 text-black',
         ]"
      />
      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
   </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseInput' });

defineProps<{
   modelValue: string;
   type?: string;
   placeholder?: string;
   error?: string;
   disabled?: boolean;
   autofocus?: boolean;
   variant?: 'default' | 'light' | 'dark';
}>();

defineEmits<{
   (e: 'update:modelValue', value: string): void;
}>();
</script>

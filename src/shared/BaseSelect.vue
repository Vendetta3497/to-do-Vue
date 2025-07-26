<template>
   <div>
      <select
         :id="id"
         :name="name"
         :value="modelValue"
         @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
         :disabled="disabled"
         :class="[
            'w-full px-3 py-2 rounded text-sm outline-none transition bg-gray-800 text-white cursor-pointer',
            error
               ? 'border border-red-500 focus:ring focus:ring-red-500'
               : 'focus:ring focus:ring-blue-500',
            disabled && 'opacity-50 cursor-not-allowed',
         ]"
      >
         <option v-if="placeholder && !modelValue" value="" disabled hidden>
            {{ placeholder }}
         </option>

         <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
         </option>
      </select>

      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
   </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseSelect' });

defineProps<{
   modelValue: string;
   options: Array<{ value: string; label: string }>;
   placeholder?: string;
   disabled?: boolean;
   error?: string;
   id?: string;
   name?: string;
}>();

defineEmits<{
   (e: 'update:modelValue', value: string): void;
}>();
</script>

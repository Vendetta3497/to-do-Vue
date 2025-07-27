<template>
   <div>
      <select
         :id="id"
         :name="name"
         :multiple="multiple"
         :value="modelValue"
         @change="onChange"
         :disabled="disabled"
         :class="[
            'w-full px-3 py-2 rounded text-sm outline-none transition bg-gray-800 text-white cursor-pointer',
            error
               ? 'border border-red-500 focus:ring focus:ring-red-500'
               : 'focus:ring focus:ring-blue-500',
            disabled && 'opacity-50 cursor-not-allowed',
         ]"
      >
         <option v-if="placeholder && !multiple" value="" disabled hidden>
            {{ placeholder }}
         </option>
         <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :selected="multiple ? modelValue.includes(option.value) : modelValue === option.value"
         >
            {{ option.label }}
         </option>
      </select>

      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
   </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineOptions({ name: 'BaseSelect' });

const props = defineProps<{
   modelValue: string | string[];
   options: Array<{ value: string; label: string }>;
   placeholder?: string;
   disabled?: boolean;
   error?: string;
   id?: string;
   name?: string;
   multiple?: boolean;
}>();

const emit = defineEmits<{
   (e: 'update:modelValue', value: string | string[]): void;
}>();

function onChange(event: Event) {
   const target = event.target as HTMLSelectElement;

   if (props.multiple) {
      const selected = Array.from(target.selectedOptions).map(o => o.value);
      emit('update:modelValue', selected);
   } else {
      emit('update:modelValue', target.value);
   }
}
</script>

<template>
   <Teleport to="body">
      <transition name="fade">
         <div
            v-if="show"
            class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            @keydown.esc="$emit('close')"
            tabindex="0"
         >
            <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative" @click.stop>
               <button
                  class="absolute top-2 right-2 text-gray-500 hover:text-black"
                  @click="$emit('close')"
               >
                  &times;
               </button>

               <slot />
            </div>
         </div>
      </transition>
   </Teleport>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseModal' });

defineProps<{
   show: boolean;
}>();

defineEmits<{
   (e: 'close'): void;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>

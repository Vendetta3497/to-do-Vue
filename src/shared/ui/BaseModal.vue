<template>
   <Teleport to="body">
      <transition name="fade">
         <div
            v-if="show"
            class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            @click.self="$emit('close')"
            tabindex="0"
         >
            <div class="bg-blue-100 rounded-lg shadow-lg w-full max-w-lg p-6" @click.stop>
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

import type { Component } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import BaseModal from './BaseModal.vue';
import BaseTag from './BaseTag.vue';

const sharedComponents: Component[] = [BaseButton, BaseInput, BaseSelect, BaseModal, BaseTag];
export default sharedComponents;

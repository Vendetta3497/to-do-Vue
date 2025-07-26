import { createApp } from 'vue';
import '@/assets/styles/main.scss';
import App from './App.vue';
import components from '@/shared';

const app = createApp(App);
components.forEach(component => app.component(component.name!, component));
app.mount('#app');

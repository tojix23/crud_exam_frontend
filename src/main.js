import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import axios from 'axios';

loadFonts();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance;

app.use(router)
  .use(vuetify)
  .mount('#app');

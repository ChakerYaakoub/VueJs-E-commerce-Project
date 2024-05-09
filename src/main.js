import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './redux/store'; // Import as default export
import App from './App.vue';
import { routes } from './routes/index.js';
import './index.css';
import Panier from './components/Panier.vue';



const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
// app.component('Panier', Panier);

// Initialize the store and use it
app.use(store);

app.mount('#app');

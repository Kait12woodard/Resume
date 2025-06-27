import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Experiences from '../views/Experiences.vue';
import Videos from '../views/Videos.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/experiences', name: 'experiences', component: Experiences },
  { path: '/videos', name: 'videos', component: Videos }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FortuneView from '../views/FortuneView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/fortune/:type',
      name: 'fortune',
      component: FortuneView,
      props: true
    }
  ]
})

export default router
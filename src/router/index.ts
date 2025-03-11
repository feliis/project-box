import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from '@/pages/todo-list/src/views/TodoListView.vue'
import WeatherView from '@/pages/weather/src/views/WeatherView.vue'
import MasonryView from '@/pages/masonry/src/views/MasonryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/todo',
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoListView,
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView,
    },
    {
      path: '/masonry',
      name: 'masonry',
      component: MasonryView,
    },
  ],
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Countdowns from '../views/Countdowns.vue'

const routes = [
  {
    path: '/',
    redirect: '/countdowns'
  },
  {
    path: '/countdowns',
    name: 'Countdowns',
    component: Countdowns
  },
  {
    path: '/countdowns/:id',
    name: 'Countdown',
    component: () => import('../views/Countdown.vue')
  },
  {
    path: '/requirements',
    name: 'Requirements',
    component: () => import('../views/Requirements.vue')
  },
  {
    path: '/credits',
    name: 'Credits',
    component: () => import('../views/Credits.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  if (toDepth === fromDepth)
    to.meta.transitionName = 'fade'
  else
    to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { afterEach, beforeEach } from '@/router/guards'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router

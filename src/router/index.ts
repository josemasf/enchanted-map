import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/MapView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/location/:id',
    name: 'LocationDetail',
    component: () => import('@/views/LocationDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/auth/SignInView.vue'),
    meta: { requiresAuth: false, hideWhenAuthed: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: { requiresAuth: false, hideWhenAuthed: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  
  // Wait for auth to initialize
  if (!authStore.isInitialized) {
    await authStore.waitForInitialization();
  }
  
  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.meta.requiresAuth;
  const hideWhenAuthed = to.meta.hideWhenAuthed;
  
  if (requiresAuth && !isAuthenticated) {
    // Redirect to sign in if auth is required but user is not authenticated
    next({ name: 'SignIn', query: { redirect: to.fullPath } });
  } else if (hideWhenAuthed && isAuthenticated) {
    // Redirect to home if page should be hidden for authenticated users
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
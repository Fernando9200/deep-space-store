import { createRouter, createWebHistory } from 'vue-router';
import CheckoutPage from './views/CheckoutPage.vue';
import ThankYouPage from './views/ThankYouPage.vue';
import CartPage from './views/CartPage.vue';
import ProductsPage from './views/ProductsPage.vue';
import UserRegistration from './views/UserRegistration.vue';
import UserLogin from './views/UserLogin.vue';
import store from './store'; // Import the store for authentication checks

const routes = [
  {
    path: '/',
    name: 'products',
    component: ProductsPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/checkout/:itemId',
    name: 'checkoutWithItem',
    component: CheckoutPage,
    props: true,
    meta: { requiresAuth: true } // Require authentication
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true } // Require authentication
  },
  {
    path: '/thank-you',
    name: 'thankYou',
    component: ThankYouPage,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      store.commit('clearCart');
      next();
    }
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegistration
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      alert('Please log in to access this page.');
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

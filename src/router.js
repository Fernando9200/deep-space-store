import { createRouter, createWebHistory } from 'vue-router';
import CheckoutPage from './views/CheckoutPage.vue';
import ThankYouPage from './views/ThankYouPage.vue';
import CartPage from './views/CartPage.vue';
import ProductsPage from './views/ProductsPage.vue'; // Import the ProductsPage

const routes = [
  {
    path: '/',
    name: 'products',
    component: ProductsPage // Default route to ProductsPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/checkout/:step',
    name: 'checkout',
    component: CheckoutPage
  },
  {
    path: '/thank-you',
    name: 'thankYou',
    component: ThankYouPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

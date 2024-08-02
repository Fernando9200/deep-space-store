import { createRouter, createWebHistory } from 'vue-router';
import CheckoutPage from './views/CheckoutPage.vue';
import ThankYouPage from './views/ThankYouPage.vue';
import CartPage from './views/CartPage.vue';
import ProductsPage from './views/ProductsPage.vue';

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
    path: '/checkout/:itemId', // For "Buy Now" with specific item
    name: 'checkoutWithItem',
    component: CheckoutPage,
    props: true
  },
  {
    path: '/checkout', // For generic checkout from cart
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

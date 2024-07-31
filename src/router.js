import { createRouter, createWebHistory } from 'vue-router';
import CheckoutPage from './views/CheckoutPage.vue';
import ThankYouPage from './views/ThankYouPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/default-offer-code'  // Redirect to a default offer code
  },
  {
    path: '/:offerCode',
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

import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    cart: [],
    offer: {},
    order: {},
    steps: ['Personal Details', 'Delivery Details', 'Payment Details', 'Confirmation'],
    currentStep: 0 // Ensure currentStep is accurately updated
  },
  mutations: {
    setOffer(state, offer) {
      state.offer = offer;
    },
    addToCart(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    updateCartItem(state, { id, quantity }) {
      const item = state.cart.find(cartItem => cartItem.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, id) {
      state.cart = state.cart.filter(item => item.id !== id);
    },
    setOrder(state, order) {
      state.order = order;
    },
    nextStep(state) {
      if (state.currentStep < state.steps.length - 1) {
        state.currentStep++;
      }
    },
    prevStep(state) {
      if (state.currentStep > 0) {
        state.currentStep--;
      }
    },
    resetSteps(state) {
      state.currentStep = 0;
    }
  },
  actions: {
    async fetchOffer({ commit }, offerCode) {
      const response = await axios.get(`http://localhost:3001/offers/${offerCode}`);
      commit('setOffer', response.data);
    },
    async createOrder({ commit }, { offerCode, orderData }) {
      const response = await axios.post(`http://localhost:3001/offers/${offerCode}/create_order`, orderData);
      commit('setOrder', response.data);
    }
  },
  getters: {
    cart: state => state.cart,
    offer: state => state.offer,
    order: state => state.order,
    stepIndex: state => state.currentStep // Ensure this is correct
  }
});

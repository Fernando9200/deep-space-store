import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    cart: [],
    items: [],
    item: {},
    order: {},
    steps: ['Personal Details', 'Delivery Details', 'Payment Details', 'Confirmation'],
    currentStep: 0,
    checkoutItem: null
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setItem(state, item) {
      state.item = item || {};
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
    },
    setCheckoutItem(state, item) {
      state.checkoutItem = item;
    }
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get('http://localhost:3001/items');
        commit('setItems', response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async fetchItem({ commit }, itemId) {
      try {
        const response = await axios.get(`http://localhost:3001/items/${itemId}`);
        commit('setItem', response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
        commit('setItem', {});
      }
    },
    async createOrder({ commit }, { itemId, orderData }) {
      try {
        const response = await axios.post(`http://localhost:3001/items/${itemId}/create_order`, orderData);
        commit('setOrder', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Re-throw the error to be caught by the component
      }
    }
  },
  getters: {
    cart: state => state.cart,
    items: state => state.items,
    item: state => state.item,
    order: state => state.order,
    stepIndex: state => state.currentStep,
    checkoutItem: state => state.checkoutItem
  }
});

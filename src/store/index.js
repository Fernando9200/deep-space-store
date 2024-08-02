import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    cart: [],
    items: [],
    item: {},
    order: {},
    paymentMethods: [],
    steps: ['Personal Details', 'Delivery Details', 'Payment Details', 'Confirmation'],
    currentStep: 0,
    checkoutItem: null,
    userData: {
      fullName: '',
      email: '',
      phoneNumber: '',
      cep: '',
      address: '',
      paymentMethod: '',
      cpf: ''
    },
    currentUser: null, // Track the current logged-in user
    isAuthenticated: false // Track authentication state
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
    setPaymentMethods(state, paymentMethods) {
      state.paymentMethods = paymentMethods;
    },
    setUserData(state, userData) {
      state.userData = { ...state.userData, ...userData };
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
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
      state.isAuthenticated = true; // Set authenticated state
    },
    logoutUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false; // Reset authentication state
    },
    // Add this mutation to reset checkout-related data
    resetCheckoutData(state) {
      state.cart = [];
      state.order = {};
      state.currentStep = 0;
      state.checkoutItem = null;
      state.userData = {
        fullName: '',
        email: '',
        phoneNumber: '',
        cep: '',
        address: '',
        paymentMethod: '',
        cpf: ''
      };
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
    async fetchPaymentMethods({ commit }) {
      try {
        const response = await axios.get('http://localhost:3001/paymentMethods');
        commit('setPaymentMethods', response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    },
    async createOrder({ commit, state }, orderData) {
      if (!state.isAuthenticated) {
        throw new Error('User must be logged in to make a purchase.');
      }

      const userId = state.currentUser.id;

      try {
        const response = await axios.post(`http://localhost:3001/users/${userId}/orders`, {
          ...state.userData,
          ...orderData
        });
        commit('setOrder', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating order:', error);
        throw error;
      }
    },
    async loginUser({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost:3001/users/login', userData);
        commit('setCurrentUser', { id: response.data.userId, fullName: response.data.fullName });
        return response.data;
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    async registerUser({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost:3001/users/register', userData);
        commit('setCurrentUser', { id: response.data.userId, fullName: userData.fullName });
        return response.data;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },
    logoutUser({ commit }) {
      commit('logoutUser'); // Action to handle logout
    }
  },
  getters: {
    cart: state => state.cart,
    items: state => state.items,
    item: state => state.item,
    order: state => state.order,
    stepIndex: state => state.currentStep,
    checkoutItem: state => state.checkoutItem,
    paymentMethods: state => state.paymentMethods,
    currentUser: state => state.currentUser,
    isAuthenticated: state => state.isAuthenticated // Getter for authentication state
  }
});

import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    offer: {},
    order: {}
  },
  mutations: {
    setOffer(state, offer) {
      state.offer = offer;
    },
    setOrder(state, order) {
      state.order = order;
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
    offer: state => state.offer,
    order: state => state.order
  }
});

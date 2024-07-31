<template>
    <div>
      <h1>{{ offer.name }}</h1>
      <p>Price: {{ offer.price }}</p>
      <checkout-form></checkout-form>
    </div>
  </template>
  
  <script>
  import CheckoutForm from '../components/CheckoutForm.vue';
  
  export default {
    name: 'CheckoutPage',
    components: {
      CheckoutForm
    },
    computed: {
      offer() {
        return this.$store.getters.offer;
      }
    },
    created() {
      this.$store.dispatch('fetchOffer', this.$route.params.offerCode);
    }
  };
  </script>
  
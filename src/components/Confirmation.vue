<template>
    <v-card>
      <v-card-title>Confirmation</v-card-title>
      <v-card-text>
        <p>Review your information and confirm the order.</p>
        <!-- Add a summary of entered data here -->
        <v-btn @click="prev">Back</v-btn>
        <v-btn @click="confirmOrder">Confirm Order</v-btn>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';
  
  export default {
    name: 'ConfirmationPage',
    computed: {
      ...mapGetters(['offer', 'cart'])
    },
    methods: {
      ...mapMutations(['prevStep']),
      ...mapActions(['createOrder']),
      async confirmOrder() {
        const orderData = {
          // Collect all necessary data here
          items: this.cart,
          offerCode: this.offer.id,
          // Add more fields as necessary
        };
        try {
          await this.createOrder({ offerCode: this.offer.id, orderData });
          this.$router.push('/thank-you');
        } catch (error) {
          console.error('Order creation failed', error);
        }
      },
      prev() {
        this.prevStep();
      }
    }
  };
  </script>
  
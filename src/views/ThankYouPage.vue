<template>
  <div>
    <h1>Thank You for Your Order!</h1>
    <p>Order ID: {{ order.orderId }}</p>
    <div v-if="order.paymentDetails.code">
      <p>Payment Code: {{ order.paymentDetails.code }}</p>
    </div>
    <div v-else>
      <p>{{ order.paymentDetails.status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYouPage',
  computed: {
    order() {
      return this.$store.getters.order;
    }
  }
};
</script>

<style scoped>
/* Your style code here */
</style>

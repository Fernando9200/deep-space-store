<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Deep Space Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')">Products</v-btn>
      <v-btn text @click="$router.push('/cart')">Cart</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Fetch payment methods when the app is mounted
    this.$store.dispatch('fetchPaymentMethods');
  }
};
</script>

<style>
/* Add any additional styles here */
</style>

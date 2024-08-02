<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Deep Space Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')">Products</v-btn>
      <v-btn text @click="$router.push('/cart')">Cart</v-btn>
      <v-btn text v-if="!isAuthenticated" @click="$router.push('/register')">Register</v-btn>
      <v-btn text v-if="!isAuthenticated" @click="$router.push('/login')">Login</v-btn>
      <v-btn text v-if="isAuthenticated" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/'); // Redirect to home page after logout
    }
  },
  mounted() {
    // Fetch payment methods when the app is mounted
    this.$store.dispatch('fetchPaymentMethods');
  }
};
</script>

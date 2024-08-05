<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
    >
      <v-toolbar-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-shopping</v-icon>
        Deep Space Store
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        class="mr-4"
        @click="$router.push('/')"
        title="View Products"
      >
        <v-icon left class="mr-1">mdi-store</v-icon>
        Produtos
      </v-btn>
      <v-btn
        text
        class="mr-4 position-relative"
        @click="$router.push('/cart')"
        title="View Cart"
      >
        <v-icon left class="mr-1">mdi-cart-outline</v-icon>
        Carrinho
        <v-badge
          v-if="cartCount > 0"
          :content="cartCount"
          color="error"
          overlap
          class="cart-badge"
        ></v-badge>
      </v-btn>
      <v-divider vertical class="mx-3"></v-divider>
      <div v-if="isAuthenticated" class="d-flex align-center mr-3">
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        <span class="greeting-text mr-2">{{ firstName }}</span>
        <v-btn text @click="logout" title="Logout">
          <v-icon left class="mr-1">mdi-logout</v-icon>
          Logout
        </v-btn>
      </div>
      <div v-else class="d-flex align-center">
        <v-btn text class="mr-3" @click="$router.push('/register')" title="Register">
          <v-icon left class="mr-1">mdi-account-plus</v-icon>
          Registrar
        </v-btn>
        <v-btn text @click="$router.push('/login')" title="Login">
          <v-icon left class="mr-1">mdi-login</v-icon>
          Login
        </v-btn>
      </div>
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
    ...mapGetters(['isAuthenticated', 'currentUser', 'cartCount']),
    
    firstName() {
      if (this.currentUser && this.currentUser.fullName) {
        return this.currentUser.fullName.split(' ')[0];
      }
      return '';
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/'); // Redirect to the home page after logout
    }
  },
  mounted() {
    this.$store.dispatch('fetchPaymentMethods');
  }
};
</script>

<style scoped>
.v-toolbar-title {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.greeting-text {
  font-size: 16px;
}

.v-btn {
  transition: background-color 0.3s ease;
  text-transform: none;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-divider {
  height: 30px;
  align-self: center;
}

.cart-badge {
  position: absolute;
  right: -5px;
}

.position-relative {
  position: relative;
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}
</style>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Deep Space Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')">Products</v-btn>
      <v-btn text @click="$router.push('/cart')">Cart</v-btn>
      <!-- Verifica se o usuário está logado e exibe o primeiro nome ou o botão de registro -->
      <span v-if="isAuthenticated">
        Welcome, {{ firstName }}
      </span>
      <v-btn text v-else @click="$router.push('/register')">Register</v-btn>
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
    ...mapGetters(['isAuthenticated', 'currentUser']),
    
    // Propriedade computada para extrair o primeiro nome do usuário
    firstName() {
      if (this.currentUser && this.currentUser.fullName) {
        // Divide o nome completo em palavras e retorna o primeiro elemento
        return this.currentUser.fullName.split(' ')[0];
      }
      return '';
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/'); // Redireciona para a página inicial após logout
    }
  },
  mounted() {
    // Buscar métodos de pagamento quando o app é montado
    this.$store.dispatch('fetchPaymentMethods');
  }
};
</script>

<template>
    <v-container>
      <v-form ref="loginForm" v-model="isFormValid" @submit.prevent="loginUser">
        <v-text-field
          label="Email"
          v-model="formData.email"
          :rules="[validateEmail]"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="formData.password"
          :rules="[validatePassword]"
          type="password"
          required
        ></v-text-field>
        <v-btn :disabled="!isFormValid" @click="loginUser">Login</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserLogin',
    data() {
      return {
        formData: {
          email: '',
          password: ''
        },
        isFormValid: false
      };
    },
    methods: {
      validateEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) || 'Please enter a valid email address.';
      },
      validatePassword(value) {
        return value.length >= 6 || 'Password must be at least 6 characters.';
      },
      async loginUser() {
        if (this.$refs.loginForm.validate()) {
          try {
            const response = await axios.post('http://localhost:3001/users/login', this.formData);
            alert(response.data.message);
            // Save the logged-in user in the store
            this.$store.commit('setCurrentUser', {
              id: response.data.userId,
              fullName: response.data.fullName,
              email: response.data.email
            });
            this.$router.push('/'); // Redirect to home page or user dashboard
          } catch (error) {
            console.error('Login failed:', error);
            alert(error.response.data.message || 'Login failed.');
          }
        }
      }
    }
  };
  </script>
  
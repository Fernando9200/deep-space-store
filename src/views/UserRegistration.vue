<template>
    <v-container>
      <v-form ref="registrationForm" v-model="isFormValid" @submit.prevent="registerUser">
        <v-text-field
          label="Full Name"
          v-model="formData.fullName"
          :rules="[validateFullName]"
          required
        ></v-text-field>
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
        <v-btn :disabled="!isFormValid" @click="registerUser">Register</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserRegistration',
    data() {
      return {
        formData: {
          fullName: '',
          email: '',
          password: ''
        },
        isFormValid: false
      };
    },
    methods: {
      validateFullName(value) {
        return value.length > 0 || 'Full name is required.';
      },
      validateEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) || 'Please enter a valid email address.';
      },
      validatePassword(value) {
        return value.length >= 6 || 'Password must be at least 6 characters.';
      },
      async registerUser() {
        if (this.$refs.registrationForm.validate()) {
          try {
            const response = await axios.post('http://localhost:3001/users/register', this.formData);
            alert(response.data.message);
            this.$store.commit('setCurrentUser', { id: response.data.userId, fullName: this.formData.fullName });
            this.$router.push('/'); // Redirect to home page after registration
          } catch (error) {
            console.error('Registration failed:', error);
            alert(error.response.data.message || 'Registration failed.');
          }
        }
      }
    }
  };
  </script>
  
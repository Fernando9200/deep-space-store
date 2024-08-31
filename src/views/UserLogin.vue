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
  
<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 0 16px;
}

.v-form {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v-text-field {
  margin-bottom: 16px;
}

.v-text-field input {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.v-text-field input:focus {
  border-color: #42a5f5;
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
}

.v-text-field label {
  color: #333333;
  font-weight: bold;
}

.v-btn {
  background-color: #42a5f5;
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.v-btn:hover {
  background-color: #1e88e5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.v-btn:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .v-form {
    padding: 16px;
  }
}
</style>

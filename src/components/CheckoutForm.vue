<template>
    <v-form ref="form">
      <v-text-field label="Full Name" v-model="formData.fullName" required></v-text-field>
      <v-text-field label="Email" v-model="formData.email" required></v-text-field>
      <v-text-field label="Phone Number" v-model="formData.phoneNumber" required></v-text-field>
      <v-text-field label="CEP" v-model="formData.cep" @blur="fetchAddress" required></v-text-field>
      <v-text-field label="Address" v-model="formData.address" required></v-text-field>
      <v-select label="Payment Method" :items="paymentMethods" v-model="formData.paymentMethod" required></v-select>
      <v-text-field label="CPF" v-model="formData.cpf" required></v-text-field>
      <v-btn @click="submitOrder">Complete Order</v-btn>
    </v-form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          fullName: '',
          email: '',
          phoneNumber: '',
          cep: '',
          address: '',
          paymentMethod: '',
          cpf: ''
        },
        paymentMethods: ['Boleto', 'Credit Card', 'Credit', 'Pix']
      };
    },
    methods: {
      async fetchAddress() {
        const response = await axios.get(`https://viacep.com.br/ws/${this.formData.cep}/json/`);
        this.formData.address = response.data.logradouro;
      },
      async submitOrder() {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch('createOrder', {
            offerCode: this.$route.params.offerCode,
            orderData: this.formData
          });
          if (this.$store.getters.order.status === 'success') {
            this.$router.push('/thank-you');
          } else {
            alert(this.$store.getters.order.message);
          }
        }
      }
    }
  };
  </script>
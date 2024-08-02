<template>
    <v-card>
      <v-card-title>Payment Details</v-card-title>
      <v-card-text>
        <v-form ref="paymentForm" v-model="isFormValid" @submit.prevent="validateForm">
          <v-select
            :items="paymentMethods"
            label="Payment Method"
            v-model="userData.paymentMethod"
            required
          ></v-select>
          <v-text-field
            v-if="userData.paymentMethod === 'Credit Card'"
            label="Credit Card Number"
            v-model="cardNumber"
            :rules="[validateCardNumber]"
            required
          ></v-text-field>
          <v-text-field
            label="CPF"
            v-model="userData.cpf"
            @input="formatCPF"
            :rules="[validateCPF]"
            required
          ></v-text-field>
          <v-btn @click="prev">Back</v-btn>
          <v-btn :disabled="!isFormValid" @click="next">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { mapMutations, mapState } from 'vuex';
  
  export default {
    name: 'PaymentDetails',
    data() {
      return {
        cardNumber: '',
        isFormValid: false, // To track form validity
      };
    },
    computed: {
      ...mapState(['userData', 'paymentMethods']),
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      formatCPF() {
        let cleaned = this.userData.cpf.replace(/\D/g, ''); // Remove all non-digit characters
        if (cleaned.length > 3) {
          cleaned = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (cleaned.length > 7) {
          cleaned = cleaned.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (cleaned.length > 11) {
          cleaned = cleaned.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }
        this.userData.cpf = cleaned.slice(0, 14); // Limit input to 14 characters (11 digits with formatting)
      },
      validateCPF(value) {
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfPattern.test(value) || 'Please enter a valid CPF in the format 111.222.333-12.';
      },
      validateCardNumber(value) {
        // Simple validation to check if the card number is a valid numeric string
        const cardPattern = /^\d{16}$/;
        return cardPattern.test(value) || 'Please enter a valid credit card number with 16 digits.';
      },
      validateForm() {
        if (this.$refs.paymentForm.validate()) {
          this.setUserData({ ...this.userData, cardNumber: this.cardNumber }); // Store the user data in Vuex
          this.nextStep();
        }
      },
      prev() {
        this.prevStep();
      },
      next() {
        this.validateForm();
      },
    },
  };
  </script>
  
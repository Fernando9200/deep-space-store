<template>
    <v-card>
      <v-card-title>Payment Details</v-card-title>
      <v-card-text>
        <v-form ref="paymentForm" @submit.prevent="validateForm">
          <v-select
            :items="paymentMethods"
            label="Payment Method"
            v-model="paymentMethod"
            required
          ></v-select>
          <v-text-field
            v-if="paymentMethod === 'Credit Card'"
            label="Credit Card Number"
            v-model="cardNumber"
            required
          ></v-text-field>
          <v-text-field
            label="CPF"
            v-model="cpf"
            required
          ></v-text-field>
          <v-btn @click="prev">Back</v-btn>
          <v-btn @click="next">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    name: 'PaymentDetails',
    data() {
      return {
        paymentMethod: '',
        cardNumber: '',
        cpf: '',
        paymentMethods: ['Boleto', 'Credit Card', 'Credit', 'Pix']
      };
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep']),
      validateForm() {
        if (this.$refs.paymentForm.validate()) {
          this.nextStep();
        }
      },
      prev() {
        this.prevStep();
      },
      next() {
        this.validateForm();
      }
    }
  };
  </script>
  
<template>
    <v-card>
      <v-card-title>Payment Details</v-card-title>
      <v-card-text>
        <v-form ref="paymentForm" @submit.prevent="validateForm">
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
            required
          ></v-text-field>
          <v-text-field
            label="CPF"
            v-model="userData.cpf"
            required
          ></v-text-field>
          <v-btn @click="prev">Back</v-btn>
          <v-btn @click="next">Next</v-btn>
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
        cardNumber: ''
      };
    },
    computed: {
      ...mapState(['userData', 'paymentMethods'])
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
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
      }
    }
  };
  </script>
  
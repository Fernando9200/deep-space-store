<template>
    <v-card>
      <v-card-title>Delivery Details</v-card-title>
      <v-card-text>
        <v-form ref="deliveryForm" v-model="isFormValid" @submit.prevent="validateForm">
          <v-text-field
            label="CEP"
            v-model="userData.cep"
            :rules="[validateCEP]"
            @blur="fetchAddress"
            required
          ></v-text-field>
          <v-text-field
            label="Address"
            v-model="userData.address"
            required
          ></v-text-field>
          <v-btn @click="prev">Back</v-btn>
          <v-btn :disabled="!isFormValid" @click="next">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapMutations, mapState } from 'vuex';
  
  export default {
    name: 'DeliveryDetails',
    data() {
      return {
        isFormValid: false, // To track form validity
      };
    },
    computed: {
      ...mapState(['userData']),
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      validateCEP(value) {
        // Check if the CEP is exactly 8 digits
        const cepPattern = /^\d{8}$/;
        return cepPattern.test(value) || 'Please enter a valid CEP.';
      },
      async fetchAddress() {
        if (this.userData.cep && this.validateCEP(this.userData.cep) === true) {
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${this.userData.cep}/json/`);
            if (response.data && !response.data.erro) {
              this.userData.address = response.data.logradouro || 'Address not found';
            } else {
              this.userData.address = 'Address not found';
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            this.userData.address = 'Address not found';
          }
        }
      },
      validateForm() {
        if (this.$refs.deliveryForm.validate()) {
          this.setUserData(this.userData); // Store the user data in Vuex
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
  
<template>
    <v-card>
      <v-card-title>Delivery Details</v-card-title>
      <v-card-text>
        <v-form ref="deliveryForm" v-model="isFormValid" @submit.prevent="validateForm">
          <v-text-field
            label="Postal Code"
            v-model="userData.cep"
            :rules="[validateCEP]"
            @blur="fetchAddress"
            required
            data-test="cep-input"
          ></v-text-field>

          <v-text-field
            label="Address"
            v-model="userData.address"
            required
            data-test="address-input"
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
        return cepPattern.test(value) || 'Please enter a valid Postal Code from Brazil.';
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
  
  <style scoped>
  .v-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  
  .v-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
  
  .v-card-text {
    padding: 16px;
    font-family: 'Roboto', sans-serif;
  }
  
  .v-text-field {
    margin-bottom: 16px;
  }
  
  .v-input__slot::before,
  .v-label {
    color: #555 !important;
    font-weight: 500;
  }
  
  .v-btn {
    margin-right: 8px;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .v-btn:disabled {
    background-color: #aaa;
    color: #ddd;
  }
  
  .v-btn:not(:disabled):hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 600px) {
    .v-card {
      padding: 12px;
    }
    .v-card-title {
      font-size: 1.25rem;
    }
    .v-card-text {
      padding: 12px;
    }
    .v-text-field {
      margin-bottom: 12px;
    }
    .v-btn {
      font-size: 0.9rem;
    }
  }
  
  </style>
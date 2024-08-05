<template>
    <v-card>
      <v-card-title>Dados da Entrega</v-card-title>
      <v-card-text>
        <v-form ref="deliveryForm" v-model="isFormValid" @submit.prevent="validateForm">
          <v-text-field
            label="CEP"
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
  
  <style scoped>
  /* Base styles for v-card */
  .v-card {
    background-color: #f8f9fa; /* Light background for a soft look */
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    padding: 16px; /* Padding for breathing space */
  }
  
  /* Styling for card title */
  .v-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333; /* Dark text for contrast */
    border-bottom: 2px solid #eee; /* Bottom border for separation */
    padding-bottom: 8px;
    margin-bottom: 16px; /* Margin for separation from text */
  }
  
  /* Styling for card text (form container) */
  .v-card-text {
    padding: 16px;
    font-family: 'Roboto', sans-serif; /* Clean, modern font */
  }
  
  /* Styles for text fields */
  .v-text-field {
    margin-bottom: 16px; /* Space between fields */
  }
  
  /* Styling for input labels */
  .v-input__slot::before,
  .v-label {
    color: #555 !important; /* Subtle label color */
    font-weight: 500; /* Medium font weight for emphasis */
  }
  
  /* Styling for buttons */
  .v-btn {
    margin-right: 8px; /* Space between buttons */
    background-color: #007bff; /* Primary blue color */
    color: #fff; /* White text for contrast */
    border-radius: 4px; /* Rounded corners for a softer look */
    font-weight: bold; /* Bold text for emphasis */
    transition: background-color 0.3s; /* Smooth transition on hover */
  }
  
  .v-btn:disabled {
    background-color: #aaa; /* Disabled button color */
    color: #ddd; /* Light text for disabled state */
  }
  
  .v-btn:not(:disabled):hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
  
  /* Responsive styles */
  @media (max-width: 600px) {
    .v-card {
      padding: 12px; /* Reduced padding for smaller screens */
    }
    .v-card-title {
      font-size: 1.25rem; /* Smaller font for smaller screens */
    }
    .v-card-text {
      padding: 12px; /* Reduced padding for smaller screens */
    }
    .v-text-field {
      margin-bottom: 12px; /* Reduced margin for smaller screens */
    }
    .v-btn {
      font-size: 0.9rem; /* Smaller font size for buttons */
    }
  }
  
  
  </style>
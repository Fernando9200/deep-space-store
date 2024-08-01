<template>
    <v-card>
      <v-card-title>Delivery Details</v-card-title>
      <v-card-text>
        <v-form ref="deliveryForm" @submit.prevent="validateForm">
          <v-text-field
            label="CEP"
            v-model="cep"
            @blur="fetchAddress"
            required
          ></v-text-field>
          <v-text-field
            label="Address"
            v-model="address"
            required
          ></v-text-field>
          <v-btn @click="prev">Back</v-btn>
          <v-btn @click="next">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapMutations } from 'vuex';
  
  export default {
    name: 'DeliveryDetails',
    data() {
      return {
        cep: '',
        address: ''
      };
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep']),
      async fetchAddress() {
        if (this.cep) {
          const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`);
          this.address = response.data.logradouro || 'Address not found';
        }
      },
      validateForm() {
        if (this.$refs.deliveryForm.validate()) {
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
  
<template>
    <v-card>
      <v-card-title>Delivery Details</v-card-title>
      <v-card-text>
        <v-form ref="deliveryForm" @submit.prevent="validateForm">
          <v-text-field
            label="CEP"
            v-model="userData.cep"
            @blur="fetchAddress"
            required
          ></v-text-field>
          <v-text-field
            label="Address"
            v-model="userData.address"
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
  import { mapMutations, mapState } from 'vuex';
  
  export default {
    name: 'DeliveryDetails',
    computed: {
      ...mapState(['userData'])
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      async fetchAddress() {
        if (this.userData.cep) {
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
      }
    }
  };
  </script>
  
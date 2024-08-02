<template>
    <v-card>
      <v-card-title>Personal Details</v-card-title>
      <v-card-text>
        <v-form ref="personalForm" v-model="isFormValid" @submit.prevent="validateForm">
          <v-text-field
            label="Full Name"
            v-model="userData.fullName"
            :rules="[validateFullName]"
            required
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="userData.email"
            :rules="[validateEmail]"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="userData.phoneNumber"
            :rules="[validatePhoneNumber]"
            @input="formatPhoneNumber"
            type="tel"
            required
          ></v-text-field>
          <v-btn :disabled="stepIndex === 0" @click="prev">Back</v-btn>
          <v-btn :disabled="!isFormValid" @click="next">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { mapMutations, mapGetters, mapState } from 'vuex';
  
  export default {
    name: 'PersonalDetails',
    data() {
      return {
        isFormValid: false, // To track form validity
      };
    },
    computed: {
      ...mapState(['userData']),
      ...mapGetters(['stepIndex']),
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      validateFullName(value) {
        // Validate that the full name contains at least two words
        const nameParts = value.trim().split(' ');
        return nameParts.length > 1 || 'Please enter your full name.';
      },
      validateEmail(value) {
        // Simple email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) || 'Please enter a valid email address.';
      },
      validatePhoneNumber(value) {
        // Regex for Brazilian phone number (11 digits)
        const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phonePattern.test(value) || 'Please enter a valid Brazilian phone number.';
      },
      formatPhoneNumber() {
        // Automatically format the phone number
        let cleaned = this.userData.phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
        if (cleaned.length > 2) {
          // Format as (XX) XXXXX-XXXX
          cleaned = cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        this.userData.phoneNumber = cleaned;
      },
      validateForm() {
        if (this.$refs.personalForm.validate()) {
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
  
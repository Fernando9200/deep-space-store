<template>
    <v-card>
      <v-card-title>Personal Details</v-card-title>
      <v-card-text>
        <v-form ref="personalForm" @submit.prevent="validateForm">
          <v-text-field
            label="Full Name"
            v-model="fullName"
            required
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="phoneNumber"
            type="tel"
            required
          ></v-text-field>
          <v-btn :disabled="stepIndex === 0" @click="prev">Back</v-btn>
          <v-btn @click="next">Next</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { mapMutations, mapGetters } from 'vuex';
  
  export default {
    name: 'PersonalDetails',
    data() {
      return {
        fullName: '',
        email: '',
        phoneNumber: ''
      };
    },
    computed: {
      ...mapGetters(['stepIndex'])
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep']),
      validateForm() {
        if (this.$refs.personalForm.validate()) {
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
  
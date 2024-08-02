<template>
    <v-card>
      <v-card-title>Personal Details</v-card-title>
      <v-card-text>
        <v-form ref="personalForm" @submit.prevent="validateForm">
          <v-text-field
            label="Full Name"
            v-model="userData.fullName"
            required
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="userData.email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="userData.phoneNumber"
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
  import { mapMutations, mapGetters, mapState } from 'vuex';
  
  export default {
    name: 'PersonalDetails',
    computed: {
      ...mapState(['userData']),
      ...mapGetters(['stepIndex'])
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
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
      }
    }
  };
  </script>
  
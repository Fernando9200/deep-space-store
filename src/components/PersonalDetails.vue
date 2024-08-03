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
        isFormValid: false, // Para rastrear a validade do formulário
      };
    },
    computed: {
      ...mapState(['userData', 'currentUser']),
      ...mapGetters(['stepIndex']),
    },
    mounted() {
      // Preencher automaticamente os campos com os dados do usuário logado
      if (this.currentUser) {
        this.userData.fullName = this.currentUser.fullName;
        this.userData.email = this.currentUser.email;
      }
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      validateFullName(value) {
        // Validar se o nome completo contém pelo menos duas palavras
        const nameParts = value.trim().split(' ');
        return nameParts.length > 1 || 'Please enter your full name.';
      },
      validateEmail(value) {
        // Padrão simples de regex para email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) || 'Please enter a valid email address.';
      },
      validatePhoneNumber(value) {
        // Regex para número de telefone brasileiro (11 dígitos)
        const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phonePattern.test(value) || 'Please enter a valid Brazilian phone number.';
      },
      formatPhoneNumber() {
        // Formatar automaticamente o número de telefone
        let cleaned = this.userData.phoneNumber.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (cleaned.length > 2) {
          // Formatar como (XX) XXXXX-XXXX
          cleaned = cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        this.userData.phoneNumber = cleaned;
      },
      validateForm() {
        if (this.$refs.personalForm.validate()) {
          this.setUserData(this.userData); // Armazenar os dados do usuário no Vuex
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
  
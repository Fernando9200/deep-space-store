<template>
    <v-card>
      <v-card-title>Dados do Comprador</v-card-title>
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
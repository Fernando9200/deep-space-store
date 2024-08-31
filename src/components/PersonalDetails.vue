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
        isFormValid: false,
      };
    },
    computed: {
      ...mapState(['userData', 'currentUser']),
      ...mapGetters(['stepIndex']),
    },
    mounted() {
      if (this.currentUser) {
        this.userData.fullName = this.currentUser.fullName;
        this.userData.email = this.currentUser.email;
      }
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      validateFullName(value) {
        const nameParts = value.trim().split(' ');
        return nameParts.length > 1 || 'Please enter your full name.';
      },
      validateEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) || 'Please enter a valid email address.';
      },
      validatePhoneNumber(value) {
        const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phonePattern.test(value) || 'Please enter a valid Brazilian phone number.';
      },
      formatPhoneNumber() {
        let cleaned = this.userData.phoneNumber.replace(/\D/g, '');
        if (cleaned.length > 2) {
          cleaned = cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        this.userData.phoneNumber = cleaned;
      },
      validateForm() {
        if (this.$refs.personalForm.validate()) {
          this.setUserData(this.userData);
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
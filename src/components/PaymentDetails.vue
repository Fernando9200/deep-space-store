<template>
    <v-card>
      <v-card-title>Informações de Pagamento</v-card-title>
      <v-card-text>
        <v-form ref="paymentForm" v-model="isFormValid" @submit.prevent="validateForm">
          <v-select
            :items="paymentMethods"
            label="Payment Method"
            v-model="userData.paymentMethod"
            required
          ></v-select>
          <v-text-field
            v-if="userData.paymentMethod === 'Credit Card'"
            label="Credit Card Number"
            v-model="cardNumber"
            :rules="[validateCardNumber]"
            @input="formatCardNumber"
            required
          ></v-text-field>
          <v-text-field
            v-if="userData.paymentMethod === 'Credit Card'"
            label="Expiration Date (MM/YY)"
            v-model="cardExpiry"
            :rules="[validateExpiry]"
            @input="formatExpiry"
            required
          ></v-text-field>
          <v-text-field
            v-if="userData.paymentMethod === 'Credit Card'"
            label="CVV"
            v-model="cardCvv"
            :rules="[validateCvv]"
            @input="formatCvv"
            @focus="flipCard"
            @blur="flipCard"
            required
          ></v-text-field>
          <v-text-field
            label="CPF"
            v-model="userData.cpf"
            @input="formatCPF"
            :rules="[validateCPF]"
            required
            data-test="CPF"
          ></v-text-field>
          <v-btn @click="prev">Back</v-btn>
          <v-btn :disabled="!isFormValid" @click="next">Next</v-btn>
        </v-form>
  
        <!-- Card Preview: only shows when a card number is present -->
        <div v-if="cardNumber" class="card-container">
          <div :class="['card', { flipped: isCardFlipped }]">
            <div :class="['card-front', cardTypeClass]">
              <div class="card-number">{{ formattedCardNumber }}</div>
              <div class="card-type">{{ cardTypeName }}</div>
              <div class="card-details">
                <span class="card-expiry">Exp: {{ formattedExpiry }}</span>
                <span class="card-holder">{{ userData.fullName }}</span>
              </div>
            </div>
            <div class="card-back">
              <span class="cvv-label">CVV</span>
              <span class="card-cvv">{{ cardCvv }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { mapMutations, mapState } from 'vuex';
  
  export default {
    name: 'PaymentDetails',
    data() {
      return {
        cardNumber: '',
        cardCvv: '',
        cardExpiry: '',
        isFormValid: false,
        isCardFlipped: false,
      };
    },
    computed: {
      ...mapState(['userData', 'paymentMethods']),
      cardTypeClass() {
        if (this.cardNumber.startsWith('4')) {
          return 'visa';
        }
        return 'mastercard';
      },
      cardTypeName() {
        if (this.cardNumber.startsWith('4')) {
          return 'Visa';
        }
        return 'MasterCard';
      },
      formattedCardNumber() {
        return this.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      formattedExpiry() {
        return this.cardExpiry.replace(/^(\d{2})(\d{2})$/, '$1/$2');
      }
    },
    methods: {
      ...mapMutations(['nextStep', 'prevStep', 'setUserData']),
      formatCPF() {
        let cleaned = this.userData.cpf.replace(/\D/g, ''); // Remove all non-digit characters
        if (cleaned.length > 3) {
          cleaned = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (cleaned.length > 7) {
          cleaned = cleaned.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (cleaned.length > 11) {
          cleaned = cleaned.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }
        this.userData.cpf = cleaned.slice(0, 14); // Limit input to 14 characters (11 digits with formatting)
      },
      validateCPF(value) {
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const invalidCPF = /^(\d)\1{2}\.(\d)\2{2}\.(\d)\3{2}-(\d)\4{1}$/;

        // Check if the format is correct and the CPF is not a sequence of the same digit
        if (cpfPattern.test(value) && !invalidCPF.test(value)) {
          return true;
        }

        return 'Please enter a valid CPF in the format 111.222.333-12.';
      },
      formatCardNumber() {
        let cleaned = this.cardNumber.replace(/\D/g, '').slice(0, 16); // Remove non-digit chars and limit to 16 digits
        this.cardNumber = cleaned.replace(/(.{4})/g, '$1 ').trim();
      },
      validateCardNumber() {
        const cardPattern = /^(\d{4} ){3}\d{4}$/;
        return cardPattern.test(this.formattedCardNumber) || 'Please enter a valid credit card number with 16 digits.';
      },
      formatCvv() {
        this.cardCvv = this.cardCvv.replace(/\D/g, '').slice(0, 3); // Limit to 3 digits
      },
      validateCvv() {
        return this.cardCvv.length === 3 || 'Please enter a valid 3-digit CVV.';
      },
      formatExpiry() {
        let cleaned = this.cardExpiry.replace(/\D/g, '').slice(0, 4); // Remove non-digit chars and limit to 4 digits
        if (cleaned.length > 2) {
          cleaned = cleaned.replace(/(\d{2})(\d)/, '$1/$2');
        }
        this.cardExpiry = cleaned;
      },
      validateExpiry() {
        const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        return expiryPattern.test(this.formattedExpiry) || 'Please enter a valid expiry date in the format MM/YY.';
      },
      validateForm() {
        if (this.$refs.paymentForm.validate()) {
          this.setUserData({
            ...this.userData,
            cardNumber: this.cardNumber,
            cardCvv: this.cardCvv,
            cardExpiry: this.cardExpiry
          }); // Store the user data in Vuex
          this.nextStep();
        }
      },
      flipCard() {
        this.isCardFlipped = !this.isCardFlipped;
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
  .card-container {
    margin-top: 20px;
    perspective: 1000px; /* Add perspective for 3D effect */
  }
  
  .card {
    width: 300px;
    height: 180px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }
  
  .card.flipped {
    transform: rotateY(180deg); /* Flip the card */
  }
  
  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    backface-visibility: hidden; /* Hide backface during rotation */
  }
  
  .card-front.visa {
    background: linear-gradient(135deg, #1a1f71, #1a1f71);
    color: white;
  }
  
  .card-front.mastercard {
    background: linear-gradient(135deg, #ff5f00, #ff5f00);
    color: white;
  }
  
  .card-back {
    background: #333;
    color: white;
    transform: rotateY(180deg); /* Position the back of the card */
  }
  
  .card-number {
    font-size: 20px;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
  
  .card-type {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .card-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-expiry,
  .card-holder {
    font-size: 14px;
  }
  
  .cvv-label {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 12px;
    color: white;
  }
  
  .card-cvv {
    position: absolute;
    top: 40px;
    right: 20px;
    font-size: 16px;
    letter-spacing: 2px;
  }
  
  /* MasterCard Symbol */
  .card-front.mastercard::before {
    content: '';
    position: absolute;
    top: 15px;
    right: 4px;
    width: 50px;
    height: 50px;
    background: radial-gradient(circle at 40% 50%, red 35%, transparent 36%), radial-gradient(circle at 60% 50%, yellow 35%, transparent 36%);
    border-radius: 50%;
    z-index: 1;
  }
  </style>
  
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
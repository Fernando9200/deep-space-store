<template>
  <v-container>
    <v-stepper v-model="stepIndex" v-if="cartItems.length || item">

      <!-- Stepper Content -->
      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in steps"
          :key="index"
          :step="index"
          v-show="stepIndex === index"
        >
          <component
            :is="getComponentForStep(step)"
            @next="nextStep"
            @prev="prevStep"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-alert type="error" v-else>No items to checkout.</v-alert>
  </v-container>
</template>

<script>
import PersonalDetails from '../components/PersonalDetails.vue';
import DeliveryDetails from '../components/DeliveryDetails.vue';
import PaymentDetails from '../components/PaymentDetails.vue';
import Confirmation from '../components/Confirmation.vue';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'CheckoutPage',
  props: ['itemId'],
  computed: {
    ...mapGetters(['stepIndex', 'checkoutItem', 'item']),
    ...mapState(['cart']),
    cartItems() {
      return this.cart;
    },
    steps() {
      return ['Personal Details', 'Delivery Details', 'Payment Details', 'Confirmation'];
    }
  },
  created() {
    if (this.itemId) {
      this.$store.dispatch('fetchItem', this.itemId);
    }
  },
  methods: {
    ...mapMutations(['nextStep', 'prevStep']),
    getComponentForStep(step) {
      switch (step) {
        case 'Personal Details':
          return PersonalDetails;
        case 'Delivery Details':
          return DeliveryDetails;
        case 'Payment Details':
          return PaymentDetails;
        case 'Confirmation':
          return Confirmation;
      }
    }
  }
};
</script>

<style scoped>
/* Container */
.v-container {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5; /* Softer background color */
}

/* Stepper */
.v-stepper {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 20px;
}

/* Stepper Header */
.v-stepper-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  position: relative;
}

.v-stepper-step {
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #757575;
  transition: color 0.3s ease;
  position: relative;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 2px solid #e0e0e0; /* Underline for steps */
}

.v-stepper-step.complete {
  color: #42a5f5;
  border-bottom-color: #42a5f5; /* Highlight complete steps */
}

.v-stepper-step.active {
  color: #1e88e5;
  border-bottom-color: #1e88e5; /* Highlight active step */
}

/* Arrows or connectors */
.v-stepper-step::after {
  content: '➔';
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #bdbdbd;
}

.v-stepper-step.complete::after,
.v-stepper-step.active::after {
  color: #42a5f5;
}

.v-stepper-step:last-child::after {
  display: none;
}

/* Stepper Divider */
.v-divider {
  width: 100%;
  margin: 0;
  height: 1px;
  background-color: #e0e0e0;
}

/* Stepper Content */
.v-stepper-items {
  padding: 24px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.v-stepper-content {
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  background-color: #fafafa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Navigation Buttons */
.v-btn {
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 16px;
  align-self: flex-end;
}

.v-btn.primary {
  background-color: #42a5f5;
  color: #ffffff;
}

.v-btn.primary:hover {
  background-color: #1e88e5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-btn.secondary {
  background-color: #b0bec5;
  color: #ffffff;
  margin-right: 8px;
}

.v-btn.secondary:hover {
  background-color: #90a4ae;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Alert */
.v-alert {
  margin-top: 20px;
  border-radius: 8px;
  padding: 16px;
  color: #d32f2f;
  background-color: #ffcdd2;
  border: 1px solid #f44336;
}

/* Responsive Design */
@media (max-width: 600px) {
  .v-stepper-header {
    flex-direction: column;
    padding: 12px;
  }

  .v-btn {
    width: 100%;
    margin: 8px 0;
  }

  .v-stepper-step::after {
    display: none; /* Hide arrows on small screens */
  }
}
</style>




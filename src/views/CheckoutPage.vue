<template>
  <v-container>
    <v-stepper v-model="stepIndex" non-linear>

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
  </v-container>
</template>

<script>
import PersonalDetails from '../components/PersonalDetails.vue';
import DeliveryDetails from '../components/DeliveryDetails.vue';
import PaymentDetails from '../components/PaymentDetails.vue';
import Confirmation from '../components/Confirmation.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CheckoutPage',
  computed: {
    ...mapGetters(['stepIndex']),
    steps() {
      return ['Personal Details', 'Delivery Details', 'Payment Details', 'Confirmation'];
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
/* Optionally add styles for the stepper */
</style>

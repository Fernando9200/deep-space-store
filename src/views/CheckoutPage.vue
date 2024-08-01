<template>
  <v-container>
    <v-stepper v-model="stepIndex">
      <!-- Stepper Header -->
      <v-stepper-header>
        <v-stepper-step
          v-for="(step, index) in steps"
          :key="index"
          :complete="stepIndex > index"
          :step="index"
        >
          {{ step }}
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>

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
  props: ['offerCode'],
  computed: {
    ...mapGetters(['stepIndex', 'checkoutItem', 'offer']),
    steps() {
      return ['Personal Details', 'Delivery Details', 'Payment Details', 'Confirmation'];
    }
  },
  created() {
    if (this.offerCode) {
      this.$store.dispatch('fetchOffer', this.offerCode);
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

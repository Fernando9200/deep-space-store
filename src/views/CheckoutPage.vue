<template>
  <v-container>
    <v-card v-if="item && Object.keys(item).length">
      <v-card-title>Checkout - {{ item.name }}</v-card-title>
      <v-card-subtitle>Price: ${{ item.price }}</v-card-subtitle>
      <v-card-text>
        <v-img :src="item.images[0]" alt="Product Image" max-width="200"></v-img>
      </v-card-text>
    </v-card>
    <v-card v-else-if="cartItems.length">
      <v-card-title>Checkout - Cart Items</v-card-title>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(cartItem, index) in cartItems"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ cartItem.name }}</v-list-item-title>
              <v-list-item-subtitle>Price: ${{ cartItem.price }}</v-list-item-subtitle>
              <v-list-item-subtitle>Quantity: {{ cartItem.quantity }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-img :src="cartItem.images[0]" alt="Product Image" max-width="100"></v-img>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-stepper v-model="stepIndex" v-if="cartItems.length || item">
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

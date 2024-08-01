<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Thank You for Your Order!</v-card-title>
          <v-card-text>
            <p>Order ID: {{ order.orderId }}</p>
            <div v-if="order.paymentDetails.code">
              <p>Payment Code: {{ order.paymentDetails.code }}</p>
            </div>
            <div v-else>
              <p>{{ order.paymentDetails.status }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ThankYouPage',
  computed: {
    ...mapGetters(['order'])
  }
};
</script>

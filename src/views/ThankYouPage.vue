<template>
  <v-container class="py-5">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="elevation-2 pa-4">
          <v-card-title class="text-h5 mb-3">
            <v-icon class="mr-2" color="green darken-2">mdi-check-circle-outline</v-icon>
            Muito obrigado pela sua compra!
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-3">
            <v-row class="mb-2">
              <v-col cols="12" class="text-subtitle-1">
                <strong>ID da Compra:</strong> {{ order.orderId }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-subtitle-1">
                <v-icon
                  class="mr-2"
                  :color="order.paymentDetails.status === 'Payment successful' ? 'green darken-2' : 'orange darken-2'"
                >
                  {{ order.paymentDetails.status === 'Payment successful' ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline' }}
                </v-icon>
                {{ order.paymentDetails.status }}
              </v-col>
            </v-row>
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
    ...mapGetters(['order']),
  },
};
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  color: #4caf50; /* Green color for the title */
}

.v-card {
  background-color: #f9f9f9; /* Light background color */
  border-radius: 12px;
}

.v-icon {
  vertical-align: middle;
}

.text-subtitle-1 {
  font-size: 16px;
  color: #424242; /* Dark grey color for text */
}
</style>

<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Products</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(item, index) in offerItems"
                  :key="index"
                  cols="12"
                  md="4"
                >
                  <v-card>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>Price: ${{ item.price }}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn @click="addToCart(item)">Add to Cart</v-btn>
                      <v-btn color="primary" @click="buyNow(item)">Buy Now</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'ProductsPage',
    computed: {
      offerItems() {
        return this.$store.getters.offer.items || [];
      }
    },
    created() {
      this.$store.dispatch('fetchOffer', 'default-offer-code');
    },
    methods: {
      ...mapActions(['fetchOffer']),
      addToCart(item) {
        this.$store.commit('addToCart', item);
      },
      buyNow(item) {
        // Set only the selected item for checkout
        this.$store.commit('setCheckoutItem', item);
        // Ensure offerCode is passed correctly
        this.$router.push({ name: 'checkout', params: { offerCode: 'default-offer-code' } });
      }
    }
  };
  </script>
  
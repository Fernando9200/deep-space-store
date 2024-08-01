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
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'ProductsPage',
    computed: {
      ...mapGetters(['offer']),
      offerItems() {
        return this.offer.items || [];
      }
    },
    created() {
      this.fetchOffer('default-offer-code');
    },
    methods: {
      ...mapActions(['fetchOffer']),
      addToCart(item) {
        this.$store.commit('addToCart', item);
      }
    }
  };
  </script>
  
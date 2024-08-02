<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Products</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="item.id"
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
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
  
  export default {
    name: 'ProductsPage',
    computed: {
      ...mapState(['items']),
      ...mapGetters(['isAuthenticated'])
    },
    created() {
      this.resetCheckout();
      this.fetchItems();
    },
    methods: {
      ...mapActions(['fetchItems']),
      ...mapMutations(['resetCheckoutData']),
      resetCheckout() {
        this.resetCheckoutData();
      },
      addToCart(item) {
        if (!this.isAuthenticated) {
          this.$router.push('/login');
          alert('Please log in or register to add items to the cart.');
          return;
        }
        this.$store.commit('addToCart', item);
      },
      buyNow(item) {
        if (!this.isAuthenticated) {
          this.$router.push('/login');
          alert('Please log in or register to buy this item.');
          return;
        }
        this.$store.commit('setCheckoutItem', item);
        this.$router.push({ name: 'checkoutWithItem', params: { itemId: item.id } });
      }
    }
  };
  </script>
  
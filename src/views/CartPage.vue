<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Shopping Cart</v-card-title>
            <v-card-text>
              <v-list v-if="cartItems.length">
                <v-list-item-group>
                  <v-list-item
                    v-for="(item, index) in cartItems"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>Price: ${{ item.price }}</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Quantity:
                        <v-text-field
                          v-model.number="item.quantity"
                          type="number"
                          min="1"
                          max="99"
                          @change="updateQuantity(item.id, item.quantity)"
                        />
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn color="red" @click="removeItem(item.id)">Remove</v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider></v-divider>
              <v-row>
                <v-col>Total: ${{ cartTotal }}</v-col>
                <v-col class="text-right">
                  <v-btn
                    :disabled="cartItems.length === 0"
                    @click="proceedToCheckout"
                  >
                    Proceed to Checkout
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapMutations } from 'vuex';
  
  export default {
    name: 'CartPage',
    computed: {
      ...mapGetters(['cart']),
      cartItems() {
        return this.cart;
      },
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },
    methods: {
      ...mapMutations(['updateCartItem', 'removeCartItem']),
      updateQuantity(id, quantity) {
        this.updateCartItem({ id, quantity });
      },
      removeItem(id) {
        this.removeCartItem(id);
      },
      proceedToCheckout() {
        this.$router.push({ name: 'checkout' }); // Navigate without item ID
      }
    }
  };
  </script>
  
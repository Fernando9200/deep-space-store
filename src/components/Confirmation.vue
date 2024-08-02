<template>
    <v-card>
      <v-card-title>Order Confirmation</v-card-title>
      <v-card-text>
        <div v-if="orderItem">
          <p>Thank you for your purchase!</p>
          <p><strong>Product Name:</strong> {{ orderItem.name }}</p>
          <p><strong>Price:</strong> ${{ orderItem.price }}</p>
          <v-img :src="orderItem.images[0]" alt="Product Image" max-width="200"></v-img>
        </div>
        <div v-else-if="cartItems.length">
          <p>Thank you for your purchase! Here's a summary of your order:</p>
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
        </div>
        <v-alert type="error" v-else>No items to confirm in the order.</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="confirmOrder">Confirm Order</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    name: 'ConfirmationPage',
    computed: {
      ...mapState(['cart', 'item']),
      ...mapGetters(['checkoutItem']),
      cartItems() {
        return this.cart.length ? this.cart : []; // Ensure we have a fallback to an empty array
      },
      orderItem() {
        if (this.checkoutItem && this.checkoutItem.id) {
          return this.checkoutItem; // Use the checkout item if available
        } else if (this.cartItems.length === 1) {
          return this.cartItems[0]; // Use the cart item if it's a single item checkout
        }
        return null; // Return null if there's no valid order item
      }
    },
    methods: {
      async confirmOrder() {
        if (this.orderItem || this.cartItems.length) {
          const orderData = {
            cpf: '123.456.789-00', // Example CPF
            paymentMethod: 'Credit Card', // Example payment method
            items: this.cartItems.length ? this.cartItems : [this.orderItem] // Use the cart items if they exist, otherwise the single item
          };
  
          const itemId = this.orderItem ? this.orderItem.id : this.cartItems[0]?.id; // Determine the item ID for the order
  
          try {
            await this.$store.dispatch('createOrder', { itemId, orderData });
            this.$router.push({ name: 'thankYou' });
          } catch (error) {
            console.error('Order creation failed:', error);
            const errorMessage = error?.response?.data?.message || 'Failed to create order. Please try again later.';
            if (this.$toast) {
              this.$toast.error(errorMessage);
            } else {
              alert(errorMessage); // Fallback if $toast is not available
            }
          }
        } else {
          console.error('No item to confirm.');
          if (this.$toast) {
            this.$toast.error('No item to confirm.');
          } else {
            alert('No item to confirm.');
          }
        }
      }
    }
  };
  </script>
  
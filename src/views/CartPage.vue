<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Cart</v-card-title>
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
      ...mapGetters(['cart', 'isAuthenticated']),
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
        if (!this.isAuthenticated) {
          this.$router.push('/login');
          alert('Please log in or register to proceed to checkout.');
          return;
        }
        this.$router.push({ name: 'checkout' });
      }
    }
  };
  </script>
  
  <style scoped>
.v-container {
  margin-top: 20px;
  padding: 16px;
  background-color: #f9f9f9;
}

.v-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background-color: #ffffff;
  overflow: hidden;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  background-color: #42a5f5;
  color: #ffffff;
  padding: 16px;
  text-align: center;
  margin-bottom: 8px;
}

.v-list-item {
  border-bottom: 1px solid #eeeeee;
  padding: 16px 0;
}

.v-list-item-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333333;
}

.v-list-item-subtitle {
  font-size: 1rem;
  color: #757575;
  margin-bottom: 8px;
}

.v-text-field {
  width: 60px;
  margin-left: 8px;
}

.v-list-item-action {
  display: flex;
  align-items: center;
}

.v-btn.red {
  background-color: #f44336;
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.v-btn.red:hover {
  background-color: #d32f2f;
}

.v-divider {
  margin: 16px 0;
}

.v-row {
  align-items: center;
  padding: 16px;
}

.v-col {
  font-size: 1.25rem;
  color: #333333;
}

.text-right {
  text-align: right;
}

.v-btn {
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.v-btn:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.v-btn:not(.red) {
  background-color: #42a5f5;
  color: #ffffff;
}

.v-btn:not(.red):hover {
  background-color: #1e88e5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 600px) {
  .v-list-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .v-text-field {
    width: 100%;
    margin: 8px 0;
  }

  .v-col {
    text-align: left;
  }
}
</style>
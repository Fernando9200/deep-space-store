<template>
  <v-card>
    <v-card-title>Order Confirmation</v-card-title>
    <v-card-text>
      <!-- Display Order Summary -->
      <div v-if="orderItem">
        <p>Thank you for your purchase!</p>
        <p><strong>Product Name:</strong> {{ orderItem.name }}</p>
        <p><strong>Price:</strong> ${{ totalAmount }}</p>
        <v-img :src="orderItem.images[0]" alt="Product Image" max-width="200"></v-img>
      </div>
      <div v-else-if="cartItems.length">
        <p>Thank you for your purchase! Here's a summary of your order:</p>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(cartItem, index) in cartItems" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ cartItem.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  Price: ${{ cartItem.price }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Quantity: {{ cartItem.quantity }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-img
                  :src="cartItem.images[0]"
                  alt="Product Image"
                  max-width="100"
                ></v-img>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <p><strong>Total Price:</strong> ${{ totalAmount }}</p>
      </div>
      <v-alert type="error" v-else>No items to confirm in the order.</v-alert>

      <!-- Display Boleto Information if Payment Method is Boleto -->
      <div v-if="isBoletoPayment || isPixPayment">
        <h3 v-if="isBoletoPayment">Boleto Bancário</h3>
        <h3 v-if="isPixPayment">Pagamento com Pix</h3>
        <div class="boleto">
          <p><strong>Beneficiário:</strong> Deep Space Store</p>
          <p><strong>CNPJ:</strong> 12.345.678/0001-99</p>
          <p><strong>Agência:</strong> 1234</p>
          <p><strong>Conta:</strong> 56789-0</p>
          <p><strong>Vencimento:</strong> {{ dueDate }}</p>
          <p>
            <strong>Valor:</strong>
            R$ ${{ totalAmount }}
          </p>
          <div v-if="isBoletoPayment" class="barcode">
            <div class="barcode-image"></div>
          </div>
          <img
            v-if="isPixPayment"
            :src="require('@/assets/QR_code_for_mobile_English_Wikipedia.svg.png')"
            alt="QR Code for Pix Payment"
            width="200"
            height="200"
          />
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <!-- Back Button -->
      <v-btn color="secondary" @click="goBack">Back to Payment</v-btn>
      <v-btn color="primary" @click="confirmOrder">Confirm Order</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: "ConfirmationPage",
  computed: {
    ...mapState(["cart", "item", "userData"]),
    ...mapGetters(["checkoutItem", "currentStep", "currentStepName"]),
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
    },
    isBoletoPayment() {
      return this.userData.paymentMethod === "Boleto";
    },
    isPixPayment() {
      return this.userData.paymentMethod === "Pix";
    },
    totalAmount() {
      if (this.orderItem) {
        // Use the price of the single item if orderItem is available
        return this.orderItem.price;
      }
      // Calculate the total amount if multiple items in the cart
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    dueDate() {
      const date = new Date();
      date.setDate(date.getDate() + 7); // Set due date to 7 days from now
      return date.toLocaleDateString("pt-BR");
    },
  },
  methods: {
    ...mapMutations(['prevStep']),
    async confirmOrder() {
      if (this.orderItem || this.cartItems.length) {
        const orderData = {
          items: this.cartItems.length
            ? this.cartItems
            : [this.orderItem], // Use the cart items if they exist, otherwise the single item
          paymentMethod: this.userData.paymentMethod,
        };

        const itemId = this.orderItem
          ? this.orderItem.id
          : this.cartItems[0]?.id; // Determine the item ID for the order

        try {
          await this.$store.dispatch("createOrder", { itemId, orderData });
          this.$router.push({ name: "thankYou" });
        } catch (error) {
          console.error("Order creation failed:", error);
          const errorMessage =
            error?.response?.data?.message ||
            "Failed to create order. Please try again later.";
          if (this.$toast) {
            this.$toast.error(errorMessage);
          } else {
            alert(errorMessage); // Fallback if $toast is not available
          }
        }
      } else {
        console.error("No item to confirm.");
        if (this.$toast) {
          this.$toast.error("No item to confirm.");
        } else {
          alert("No item to confirm.");
        }
      }
    },
    goBack() {
      // Use the mutation to navigate back to the previous step
      this.prevStep();
    }
  },
};
</script>

<style scoped>
.boleto {
  border: 1px solid #ccc;
  padding: 16px;
  margin-top: 16px;
}

.barcode {
  margin-top: 16px;
}

.barcode-image {
  height: 20px;
  background: repeating-linear-gradient(
    90deg,
    #000,
    #000 2px,
    #fff 2px,
    #fff 3px
  );
}
</style>

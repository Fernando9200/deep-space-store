<template>
  <v-card>
    <v-card-title>Informações da Compra</v-card-title>
    <v-card-text>
      <!-- Display Order Summary -->
      <div v-if="orderItem">
        <p>Muito obrigado por comprar conosco!</p>
        <p><strong>Nome do Produto:</strong> {{ orderItem.name }}</p>
        <p><strong>Preço:</strong> R${{ totalAmount }}</p>
        <v-img :src="orderItem.images[0]" alt="Product Image" max-width="200"></v-img>
      </div>
      <div v-else-if="cartItems.length">
        <p>Muito obrigado pela sua compra! Resumo do seu pedido:</p>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(cartItem, index) in cartItems" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ cartItem.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  Preço: R${{ cartItem.price }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Quantidade: {{ cartItem.quantity }}
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
        <p v-if="isCard"><strong>Preço Total:</strong> R${{ totalAmount }}</p>
      </div>
      <v-alert type="error" v-else>Não há items no carrinho para confirmar a compra</v-alert>

      <!-- Display Boleto Information if Payment Method is Boleto -->
      <div v-if="isBoletoPayment || isPixPayment">
        <div class="boleto">
        <h3 v-if="isBoletoPayment">Boleto Bancário</h3>
        <h3 v-if="isPixPayment">Pagamento com Pix</h3>
          <p><strong>Beneficiário:</strong> Deep Space Store</p>
          <p><strong>CNPJ:</strong> 12.345.678/0001-99</p>
          <p><strong>Agência:</strong> 1234</p>
          <p><strong>Conta:</strong> 56789-0</p>
          <p><strong>Vencimento:</strong> {{ dueDate }}</p>
          <p>
            <strong>Valor:</strong>
            R$ {{ totalAmount }}
          </p>
          <div v-if="isBoletoPayment" class="barcode">
            <div class="barcode-image"></div>
          </div>
          <img
            v-if="isPixPayment"
            :src="require('@/assets/QR_Code.png')"
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
    isCard() {
      return this.userData.paymentMethod === "Credit Card";
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
.v-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: #333;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.v-card-text {
  padding: 24px;
  color: #555;
}

.v-card-text p {
  margin: 12px 0;
}

.v-list-item-content {
  margin-bottom: 16px;
}

.v-list-item-title {
  font-weight: 500;
  font-size: 1.2rem;
  color: #222;
}

.v-list-item-subtitle {
  font-size: 1rem;
  color: #777;
}

.v-list-item-action img {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-alert {
  margin-top: 16px;
  text-align: center;
}

.boleto {
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
  text-align: center;
}

.boleto h3 {
  font-size: 1.6rem; /* Font size for better readability */
  font-weight: 700; /* Bolder font for emphasis */
  color: #1a1a1a; /* Text color for contrast */
  margin-bottom: 24px; /* Increase margin for better spacing */
  padding: 12px 0; /* Add padding for space within the title */
  text-align: center; /* Center align text */
  text-transform: uppercase; /* Uppercase text for emphasis */
  letter-spacing: 1px; /* Add letter spacing for legibility */
  background-color: #e6e6e6; /* Light gray background for contrast */
  border-radius: 8px; /* Rounded corners for a softer appearance */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.boleto p {
  margin: 8px 0;
  font-size: 1rem;
  color: #555;
}

.barcode {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.barcode-image {
  height: 40px; /* Increase the height for better visibility */
  width: 500px; /* Set a width to ensure the barcode is visible */
  background: repeating-linear-gradient(
    90deg,
    #000,
    #000 4px,
    #fff 4px,
    #fff 6px
  );
}

.v-card-actions {
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.v-btn {
  font-size: 1rem;
  font-weight: 500;
  text-transform: none;
}

.v-btn[color="primary"] {
  background-color: #1976d2;
  color: #fff;
}

.v-btn[color="secondary"] {
  background-color: #9e9e9e;
  color: #fff;
}
</style>

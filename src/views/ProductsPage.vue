<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Produtos</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="item.id"
                  cols="12"
                  md="4"
                >
              <v-card>
                <v-img :src="require(`@/assets/${getImageFileName(item.id)}`)" height="200px" alt="Product Image"></v-img>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>Preço: R${{ item.price }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn @click="addToCart(item)">Adicionar</v-btn>
                  <v-btn color="primary" @click="buyNow(item)">Comprar Agora</v-btn>
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
      getImageFileName(itemId) {
        const imageMap = {
          ENT123: 'Miniatura_Enterprise.png',
          SPC456: 'Modelo_Onibus_Espacial.png',
          ALN789: 'Alien_Figure.png',
          // Add other mappings as necessary
        };
        return imageMap[itemId] || 'default.png'; // Fallback to 'default.png' if no match is found
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
  
  <style scoped>
  /* Container */
  .v-container {
    margin-top: 20px;
    padding: 16px;
    background-color: #f9f9f9;
  }
  
  /* Main Card */
  .v-card {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: #ffffff;
  }
  
  /* Card Title */
  .v-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333333;
    padding: 16px;
    background-color: #ffffff;
    border-bottom: 2px solid #eeeeee;
  }
  
  /* Card Subtitle */
  .v-card-subtitle {
    font-size: 1.1rem;
    color: #666666;
    margin-bottom: 8px;
    padding-left: 16px;
    background-color: #ffffff;
  }
  
  /* Card Actions */
  .v-card-actions {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    background-color: #f0f0f0;
    border-top: 1px solid #dddddd;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  
  /* Buttons */
  .v-btn {
    font-weight: bold;
    text-transform: uppercase;
    padding: 8px 16px;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .v-btn:hover {
    background-color: #2196f3;
    color: #ffffff;
  }
  
  /* Primary Button */
  .v-btn.primary {
    background-color: #42a5f5;
    color: #ffffff;
  }
  
  .v-btn.primary:hover {
    background-color: #1e88e5;
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .v-card-title {
      font-size: 1.25rem;
    }
  
    .v-card-subtitle {
      font-size: 1rem;
    }
  
    .v-card-actions {
      flex-direction: column;
      align-items: stretch;
    }
  
    .v-btn {
      width: 100%;
      margin-bottom: 8px;
    }
  }
  </style>
  
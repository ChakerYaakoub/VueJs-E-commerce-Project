<template>
  <div class="panier-container" v-if="!hidden">
    <div class="panier-content">
      <h1 class="panier-title">Panier
        <font-awesome-icon :icon="faTimes" @click="handleClosePanier" />
      </h1>
      <div v-for="(item, indexDiv) in panierContent" :key="indexDiv" :id="indexDiv" class="panier-item">
        <p class="nameProduct">{{ item.produit.designation }}</p>
        <div class="quantity-wrapper">
          <select v-model="item.quantite" @change="handleQuantiteChange($event)" class="quantity-select">
            <option v-for="indexOption in item.quantite + item.produit.quantite" :key="indexOption" :value="indexOption">{{ indexOption }}</option>
          </select>
          <button @click="handleDeletePanier($event)" class="delete-button">
            <font-awesome-icon :icon="faTimes" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex'; // Import useStore instead of useSelector
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import axios from 'axios';
import { faCartPlus, faTimes } from '@fortawesome/free-solid-svg-icons';


export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    hidden: Boolean,
    x: Number,
    y: Number,
  },
  setup() {
    const panierRef = ref(null);
    const panierContent = ref([]);
    const store = useStore(); // Use useStore to access the Vuex store instance

    const getId = (item, tagName, level) => {
      let currentElement = item;
      let i = 1;

      while (currentElement) {
        if (currentElement.tagName == tagName) {
          if (i != level) {
            i++;
          } else {
            return currentElement.getAttribute('id');
          }
        }
        currentElement = currentElement.parentNode;
      }
      return null;
    };

    const handleQuantiteChange = async (event) => {
      let item = event.target;
      let id = getId(item, 'DIV', 2);

      if (id) {
        let panier = panierContent.value[id];

        let body = {
          produitId: panier.produitId,
          panierId: panier.panierId,
          quantite: parseInt(item.value),
        };

        try {
          let response = await axios.put(`http://localhost:3000/panier-produits/${panier.id}`, body);
          if (response.status == 200) {
            store.dispatch('htmlElements/setPanierChange'); // Dispatch the action using store.dispatch
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    const handleDeletePanier = async (event) => {
      let item = event.target;
      let id = getId(item, 'DIV', 2);

      let confirmation = confirm('Voulez vous retirer ce produit du panier ?');

      if (id && confirmation) {
        let panier = panierContent.value[id];

        try {
          let response = await axios.delete(`http://localhost:3000/panier-produits/${panier.id}`);

          if (response.status == 200) {
            location.reload();
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    onMounted(() => {
      const panier = panierRef.value;

      if (panier) {
        panier.style.right = x + 'px';
        panier.style.top = y + 'px';
      }

      let mediaQuery = window.matchMedia('(min-width: 768px)');

      let nameProduct = panier.querySelectorAll('.nameProduct');

      let nameProductParent = null;

      if (mediaQuery.matches) {
        panier.style.minWidth = '25rem';
        panier.style.maxWidth = '25rem';
        panier.style.minHeight = '25rem';
        panier.style.maxHeight = '25rem';
      } else {
        panier.style.minWidth = '15rem';
        panier.style.maxWidth = '15rem';
        panier.style.minHeight = '15rem';
        panier.style.maxHeight = '15rem';

        nameProduct.forEach((element) => {
          nameProductParent = element.parentNode;
          let maxWidth = nameProductParent.getBoundingClientRect().width * 0.5;

          element.style.maxWidth = maxWidth + 'px';
        });
      }

      panierContent.value = store.state.user.panier.panierProduits; // Access state data using store.state
    });

    return { panierRef, panierContent,faCartPlus,    faTimes, handleQuantiteChange, handleDeletePanier };
  },
};

  </script>
  <style scoped>
  .panier-container {
    background-color: #D9D9D9;
    border: 2px solid #383F51;
    border-radius: 8px;
    margin: 20px; /* Adjust margin as needed */
    padding: 20px; /* Adjust padding as needed */
  }
  
  .panier-content {
    max-width: 600px; /* Adjust width as needed */
  }
  
  .panier-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 2px solid #383F51;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .panier-item {
    margin-bottom: 10px;
    border-bottom: 2px solid #6D768E;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nameProduct {
    font-weight: bold;
  }
  
  .quantity-wrapper {
    display: flex;
    align-items: center;
  }
  
  .quantity-select {
    margin-right: 10px;
  }
  
  .delete-button {
    background-color: #FFC107;
    color: #383F51;
    border: none;
    cursor: pointer;
  }
  </style>
  
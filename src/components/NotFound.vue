<template>
    <div>
      <!-- Le contenu de la page NotFound -->
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'NotFound',
    setup() {
      const route = useRoute();
      const store = useStore();
  
      // Vérifie si l'utilisateur est connecté
      const isLoggedIn = computed(() => store.state.user.isLoggedIn);
  
      // Redirection en fonction de l'état de connexion
      onMounted(() => {
        if (isLoggedIn.value) {
          router.push('/produits');
        } else {
          router.push('/');
        }
      });
    },
  };
  </script>
  
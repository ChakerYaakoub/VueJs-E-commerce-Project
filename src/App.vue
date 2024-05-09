<template>
  <div class="min-w-full flex flex-col min-h-screen bg-[#989FCE] px-[40px] md:px-[80px] lg:px-[120px]">
    <Header :auth="isLoggedIn" />
 
    <router-view v-if="!loading" />
  
  </div>
  <Footer />
</template> 

<script>
import { defineComponent, onMounted, computed } from 'vue';
import axios from 'axios';
import store from './redux/store'; // Import your Vuex store module

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Loading from './components/Loading.vue';
import Connexion from './pages/Connexion.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
    Loading,
    Connexion,
  },
  setup() {
    const isLoggedIn = computed(() => store.state.user.isLoggedIn);
    const loading = computed(() => store.state.htmlElements.loading);
    

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    onMounted(async () => {
      try {
        const token = getCookie('access_token');

        if (token) {
          const response = await axios.get(`http://localhost:3000/auth/verifyToken/${token}`);

          if (response.status === 200) {
            const id = getCookie('id');

            if (id) {
              const userResponse = await axios.get(`http://localhost:3000/users/${id}`);
              store.commit('actualUserSet', userResponse.data);
            }
            store.commit('loggedIn', true);
          } else {
            store.commit('loggedIn', false);
          }
        } else {
          store.commit('loggedIn', false);
        }
        store.commit('setLoading', false);
      } catch (error) {
        console.error('Error fetching data:', error);
        store.commit('setLoading', false);
      }
    });

    return {
      isLoggedIn,
      loading,
    };
  },
});

</script>
<style>

/* @import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities'; */

</style>

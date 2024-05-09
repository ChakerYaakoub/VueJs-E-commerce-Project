<template>
  <div class="py-5" v-if="auth">
    <Panier :hidden="hidden" :x="xPanier" :y="yPanier" />
    <div class="
      h-[3rem]
      md:h-[4rem]
      lg:h-[3rem]
      flex flex-row w-full animate-slideup  object-contain items-center"
    >
      <div class="flex-1 flex justify-start">
        <img
          src="@/assets/logo.png"
          alt="Logo de l'app"
          class="
            w-[2.5rem] h-[2.5rem]
            md:w-[4rem] md:h-[4rem]
            lg:w-[3rem] lg:h-[3rem]
            rounded-full"
        />
      </div>
      <div class="flex-1 flex justify-center font-bold mt-4">
        <div class="flex-col space-y-3">
          <h1 class="text-xs md:text-2xl lg:text-base text-center">{{ user.user.firstName }} {{ user.user.lastName }}</h1>
          <DoubleLink :auth="auth" />
        </div>
      </div>
      <div class="flex-1 flex justify-end font-bold space-x-3">
        <button
          ref="panierRef"
          id="panierButton"
          @click="panierDisplay"
          class="
            panierBtn
            p-1 text-base
            md:p-3 md:text-2xl
            lg:p-2 lg:text-xl
            rounded-full bg-[#383F51] text-[#989FCE] transition-all duration-300 hover:bg-opacity-75"
        >
        <FontAwesomeIcon :icon="faShoppingCart" />
              </button>
        <button
          @click="handleDeconnexion"
          class="
            p-1 text-base
            md:p-3 md:text-2xl
            lg:p-2 lg:text-xl
            rounded-full bg-[#383F51] text-[#989FCE] transition-all duration-300 hover:bg-opacity-75"
        >
          <FontAwesomeIcon :icon="faDoorOpen" />
        </button>
      </div>
    </div>
  </div>
  <div class="py-5" v-else>
    <div class="
      h-[3rem]
      md:h-[4rem]
      lg:h-[3rem]
      flex flex-row w-full animate-slideup  object-contain items-center"
    >
      <div class="flex-1 flex justify-start">
        <img
          src="@/assets/logo.png"
          alt="Logo de l'app"
          class="
            w-[2.5rem] h-[2.5rem]
            md:w-[4rem] md:h-[4rem]
            lg:w-[3rem] lg:h-[3rem]
            rounded-full"
        />
      </div>
      <div class="flex-1 flex justify-end font-bold">
        <DoubleLink :auth="auth" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'; // Import useStore instead of useDispatch
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShoppingCart, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import DoubleLink from './DoubleLink.vue';



export default {
  name: 'Header',
  props: {
    auth: Boolean,
  },
  components: {
    FontAwesomeIcon,
    DoubleLink,
  },

  setup(props) {
    const router = useRouter();
    const store = useStore(); // Use useStore to access the Vuex store instance
    const user = computed(() => store.state.user);
    const route = useRoute();

    const panierRef = ref(null);
    const hidden = ref(true);
    const xPanier = ref(0);
    const yPanier = ref(0);

    const handleDeconnexion = () => {
      console.log('Déconnexion');
    const isLoggedIn = computed(() => store.state.user.isLoggedIn);
    console.log(isLoggedIn);

      deleteCookie('access_token');
      deleteCookie('id');
      store.commit('user/loggedIn', false); // Use store.commit to commit mutations
      router.push('/');
    };
    const deleteCookie = (name) => {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const panierDisplay = () => {
      hidden.value = !hidden.value;
    };
    function hasClassInHisParent (element, className) {
        let currentElement = element;

        while (currentElement) {
            if (currentElement.classList && currentElement.classList.contains(className)) {
                return true;
            }
            currentElement = currentElement.parentNode;
        }
        return false;
    }


    onMounted(() => {
      const panier = panierRef.value;
      if (panier) {
        let x = window.innerWidth - panier.getBoundingClientRect().x - panier.getBoundingClientRect().width;
        let y = panier.getBoundingClientRect().height + panier.getBoundingClientRect().y + 5;
        xPanier.value = x;
        yPanier.value = y;

        document.addEventListener('click', (event) => {
          let item = event.target;

          if (hasClassInHisParent(item, 'panierBtn')) {
          } else if (hasClassInHisParent(item, 'panier')) {
          } else {
            hidden.value = true;
          }
        });
      }
    });

    return {
      router,
      user,
      handleDeconnexion,
      panierRef,
      hidden,
      xPanier,
      yPanier,
      panierDisplay,
      FontAwesomeIcon ,
      DoubleLink ,
      faShoppingCart,
      faDoorOpen,
    };
  },
};

</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>

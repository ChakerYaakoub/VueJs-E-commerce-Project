<template>
  <div :class="containerClasses">
    <button
      v-if="auth"
      @click="handleRedirect('/produits')"
      :class="{ 'bg-[#FFC107] text-[#383F51]': isCurrentPage('produits'), 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]': !isCurrentPage('produits') }"
      class="flex-1 rounded-full py-2"
    >
      Produits
    </button>
    <button
      v-if="auth"
      @click="handleRedirect('/categories')"
      :class="{ 'bg-[#FFC107] text-[#383F51]': isCurrentPage('categories'), 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]': !isCurrentPage('categories') }"
      class="flex-1 rounded-full py-2"
    >
      Categories
    </button>
    <template v-else>
      <button
        @click="handleRedirect('/')"
        :class="{ 'bg-[#FFC107] text-[#383F51]':isCurrentPage(''), 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]': pageActuel !== '' }"
        class="flex-1 rounded-full py-2"
      >
        Connexion
      </button>
      <button
        @click="handleRedirect('/inscription')"
        :class="{ 'bg-[#FFC107] text-[#383F51]': isCurrentPage('inscription') , 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]': pageActuel !== 'inscription' }"
        class="flex-1 rounded-full py-2"
      >
        Inscription
      </button>
    </template>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Import useRouter instead of useNavigate

export default {
  name: 'DoubleLink',
  props: {
    auth: Boolean,
  },
  setup(props) {
    const router = useRouter(); // Use useRouter instead of useNavigate
    const route = useRoute();
    const pageActuel = reactive({ value: null });

    const handleRedirect = (route) => {
      router.push(route); // Use router.push to navigate
    };

    const isCurrentPage = (page) => {
      console.log(pageActuel.value, page);
      return pageActuel.value === page;
    };

    const containerClasses = computed(() => ({
      'w-[8rem] text-[0.7rem]': props.auth,
      'w-[10rem] text-xs': !props.auth,
      'md:w-[16rem] md:text-xl': props.auth,
      'md:w-[24rem] md:text-2xl': !props.auth,
      'lg:w-[14rem] lg:text-base': true,
      'flex bg-[#383F51] rounded-full': true,
    }));

    watch(
      () => route.path,
      (newValue) => {
        pageActuel.value = newValue.substring(1);
      }
    );

    return {
      handleRedirect,
      isCurrentPage,
      containerClasses,
      pageActuel,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

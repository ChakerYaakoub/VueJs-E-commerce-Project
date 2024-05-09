<template>
  <section
    ref="bodyRef"
    class="flex flex-col items-center w-full relative"
  >
    <slot></slot>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; // Import useStore instead of useDispatch
// import { setBodyWidth, setBodyHeight } from '../redux/store';
// Import mutations directly from Vuex modules
import { setBodyWidth, setBodyHeight } from '../redux/features/htmlElements';

export default {
  name: 'BodyAuth',
  setup() {
    const bodyRef = ref(null);
    const store = useStore(); 
  
    onMounted(() => {
      const body = bodyRef.value;
      const footer = document.getElementById('footer');

      const bodyY = body.getBoundingClientRect().y;
      const footerY = footer.getBoundingClientRect().y;

      const height = footerY - bodyY;
      const width = body.getBoundingClientRect().width;

      // Dispatch mutations using store.commit
      store.commit('setBodyHeight', height);
      store.commit('setBodyWidth', width);

      body.style.height = height + 'px';
    });

    return {
      bodyRef,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

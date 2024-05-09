<template>
    <div class="absolute left-0 top-0">
      <Button
        bgColor="#FFC107"
        textColor="#383F51"
        content="Retour"
        icon="false"
        :restClass="['mt-0', 'md:mt-0', 'lg:mt-0']"
        @click="navigateTo(href)"
      />
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import Button from '@/components/Button.vue'; // Update the path based on your project structure
  
  export default {
    props: {
      href: String // Assuming href is a string containing the path to navigate to
    },
    components: {
      Button
    },
    setup() {
      const router = useRouter();
  
      const navigateTo = (path) => {
        router.push(path);
      };
  
      return {
        navigateTo
      };
    }
  };
  </script>
  
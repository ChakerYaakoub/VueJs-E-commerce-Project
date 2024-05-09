<template>
    <div v-if="status === 'global'" class="flex min-h-screen w-full bg-[#989FCE] justify-center items-center">
      <img src="../assets/LoadingImg.svg" alt="Loading..." class="w-[33%] mx-auto" />
    </div>
    <!-- Ajoutez ici la gestion du cas où status n'est pas 'global' -->
  </template>
  
  <script>
  export default {
    name: 'Loading',
    props: {
      status: String,
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  
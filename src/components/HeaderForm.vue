<template>
    <div
      class="
        p-3 text-lg w-full
        md:p-8 md:text-4xl md:w-[90%]
        lg:p-3 lg:text-2xl lg:w-[60%]
        font-bold bg-[#383F51] rounded-lg rounded-b-none text-center text-[#989FCE]"
    >
      {{ content }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderForm',
    props: {
      content: String,
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  
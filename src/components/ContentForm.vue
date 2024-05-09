<template>
    <div :class="containerClasses">
      <form @submit.prevent="onSubmit" method="POST" class="m-0 p-0 w-full">
        <slot></slot>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContentForm',
    props: {
      onSubmit: Function,
    },
    computed: {
      containerClasses() {
        return {
          'px-3 py-3 w-full': true,
          'md:px-3 md:py-3 md:w-[90%]': true,
          'lg:px-3 lg:py-3 lg:w-[60%]': true,
          'bg-[#6D768E] rounded-lg rounded-t-none flex flex-col items-center': true,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  
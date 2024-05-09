<template>
    <section v-if="display" class="inset-0 absolute z-10 m-0 bg-opacity-45 bg-slate-100 text-[#989FCE] font-bold" :class="{ 'hidden': !display }">
      <div class="w-[90%] md:w-[70%] lg:w-[50%] mx-auto mt-28 flex flex-col">
        <div class="w-full bg-[#383F51] flex items-center p-2 rounded-t-lg">
          <div class="flex-1 flex justify-center"></div>
          <div class="flex-1 text-center text-2xl">{{ title }}</div>
          <div class="flex-1 flex justify-end text-[#FFC107] text-3xl">
            <button @click="handleClose" class="transition-all duration-300 hover:bg-opacity-75">
              <font-awesome-icon :icon="faRectangleXmark" />
            </button>
          </div>
        </div>
        <div class="w-full bg-[#6D768E] px-5 py-5 text-[#383F51]">
          <slot></slot>
        </div>
        <div class="w-full bg-[#383F51] flex justify-center space-x-5 min-h-8">
          <button v-if="bottom" @click="onClick" class="transition-all duration-300 hover:bg-opacity-75">
            <Button
              bgColor="#FFC107"
              textColor="#383F51"
              content="Enregistrer"
              :restClass="`mt-5 md:mt-5 md:text-sm md:px-3 md:py-[0.4rem] lg:mt-5`"
              :icon="false"
            />
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import Button from '@/components/Button.vue'; // Assurez-vous de spécifier le bon chemin vers le composant Button
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
  
  export default {
    name: 'VoirModal',
    components: {
      FontAwesomeIcon,
      Button,
    },
    props: {
      bottom: Boolean,
      title: String,
      display: Boolean,
      onClose: Function,
      onClick: Function,
      idProduct: String, // Assurez-vous que le type est correct
    },
    methods: {
      handleClose() {
        if (this.onClose) {
          this.onClose();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  
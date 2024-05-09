<template>
  <button
    @click="onClick"
    :disabled="disable"
    :ref="refElement"
    :class="buttonClasses"
  >
    <font-awesome-icon v-if="icon" :icon="actualIcon" />
    <span v-else>{{ content }}</span>
  </button>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faPlus, faEdit, faTrashAlt, faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'Button',
  props: {
    bgColor: String,
    textColor: String,
    content: String,
    onClick: Function,
    icon: Boolean,
    restClass: String,
    disable: Boolean,
    refElement: String,
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const actualIcon = ref(faEye);

    onMounted(() => {
      if (props.icon) {
        switch (props.content) {
          case 'faEye':
            actualIcon.value = faEye;
            break;
          case 'faPlus':
            actualIcon.value = faPlus;
            break;
          case 'faEdit':
            actualIcon.value = faEdit;
            break;
          case 'faTrashAlt':
            actualIcon.value = faTrashAlt;
            break;
          case 'faXmark':
            actualIcon.value = faTimes;
            break;
          case 'faCartShopping':
            actualIcon.value = faCartShopping;
            break;
        }
      }
    });

    const buttonClasses = computed(() => {
      return [
        'px-1 py-[0rem] text-sm',
        props.content === 'faPlus'
          ? 'md:px-4 md:py-1 md:text-xl lg:px-4 lg:py-1 lg:text-base'
          : 'md:px-[0.35rem] md:py-1 md:text-base lg:px-2 lg:py-1 lg:text-base',
        props.disable ? 'bg-opacity-25' : 'hover:bg-opacity-75',
        `bg-[${props.bgColor}] text-[${props.textColor}] rounded-full font-bold transition-all duration-300 border-2 border-[#383F51]`,
        props.restClass,
      ];
    });

    return {
      actualIcon,
      buttonClasses,
    };
  },
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>

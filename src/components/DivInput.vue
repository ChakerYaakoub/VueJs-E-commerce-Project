<template>
  <div :class="containerClasses">
    <template v-if="modal">
      <template v-if="childrenCount > 1">
        <div
          class="
            space-y-3
            md:space-x-5 md:flex md:justify-center md:space-y-0
            w-full my-2"
        >
          <div
            v-for="(child, index) in $slots.default"
            :key="index"
            class="md:flex-1 md:flex md:justify-center"
          >
            <slot></slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-full flex justify-center my-2">
          <slot></slot>
        </div>
      </template>
    </template>
    <template v-else>
      <template v-if="childrenCount > 1">
        <div
          :class="
            'w-full md:w-3/4 lg:space-x-3 lg:w-4/6 lg:flex items-center text-[#383F51] mx-auto'"
        >
          <div
            v-for="(child, index) in $slots.default"
            :key="index"
            class="md:flex-1 md:flex md:justify-center w-full"
          >
            <slot></slot>
          </div>
        </div>
      </template>
      <template v-else-if="childrenCount === 1">
        <div
          class="
            my-2
            md:my-5
            lg:my-2
            flex w-full justify-center text-[#383F51]"
        >
          <slot></slot>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DivInput',
  props: {
    modal: Boolean,
  },
  computed: {
    containerClasses() {
      return {
        'w-full': true,
      };
    },
    childrenCount() {
      return this.$slots.default ? this.$slots.default.length : 0;
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>

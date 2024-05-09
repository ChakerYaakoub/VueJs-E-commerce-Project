<template>
  <div
    :class="[
      'text-base',
      'md:text-3xl',
      'lg:text-base',
      'flex',
      'flex-col',
      'items-center',
      'w-full',
      double ? 'my-2 md:my-5 lg:my-2' : ''
    ]"
  >
    <label class="font-bold mb-1" :for="id">{{ label }}: </label>
    <input
      v-if="type !== 'select'"
      :type="type"
      :name="inputName"
      :id="id"
      autocomplete="off"
      @input="handleInput"
      :value="value"
      :class="[
        'px-3 py-1',
        'md:px-3 md:py-2',
        'lg:px-3 lg:py-1',
        'bg-[#989FCE]',
        'focus:ring-2',
        'focus:bg-[#989FCE]',
        'outline-none',
        'rounded-lg',
        double ? 'w-full' : 'w-5/6 md:w-3/4 lg:w-4/6'
      ]"
    />
    <select
      v-else
      :name="inputName"
      :id="id"
      autocomplete="off"
      @input="handleInput"
      :value="value"
      :default-value="defaultValue"
      :class="[
        'px-3 py-1',
        'md:px-3 md:py-2',
        'lg:px-3 lg:py-1',
        'bg-[#989FCE]',
        'focus:ring-2',
        'focus:bg-[#989FCE]',
        'outline-none',
        'rounded-lg',
        double ? 'w-full' : 'w-5/6 md:w-3/4 lg:w-4/6'
      ]"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    inputName: String,
    id: String,
    type: String,
    label: String,
    double: Boolean,
    select: Boolean,
    value: [String, Number],
    defaultValue: [String, Number],
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value); // Emitting the input event with the new value
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>

<template>
    <div
      :id="'elementsInput'"
      :class="[
        'flex',
        'justify-center',
        'space-x-2',
        up ? 'flex flex-col justify-center' : ''
      ]"
    >
      <label
        :class="[
          'font-bold',
          'mb-1',
          up ? 'text-center' : ''
        ]"
        :for="id"
      >
        {{ label }}:
      </label>
      <input
        :type="type"
        :name="inputName"
        :id="id"
        autocomplete="off"
        :disabled="display"
        :value="value || ''"
        @change="handleChange"
        ref="refElement"
        class="
          px-3 py-1
          md:px-3 md:py-2
          lg:px-3 lg:py-1
          bg-[#D9D9D9] focus:ring-2 focus:bg-[#D9D9D9] outline-none rounded-lg
        "
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'InputModal',
    props: {
      label: String,
      type: String,
      inputName: String,
      id: String,
      onChange: Function,
      display: Boolean,
      up: Boolean,
      value: [String, Number],
      refElement: Object,
    },
    methods: {
      handleChange(event) {
        this.onChange(event);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  
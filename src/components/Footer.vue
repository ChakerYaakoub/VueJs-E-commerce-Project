<template>
  <footer
    id="footer"
    class="
      px-[40px] text-xs h-16
      md:px-[80px] md:text-xl md:h-24
      lg:px-[120px] lg:text-base lg:h-16
      fixed bottom-0 w-full flex items-center font-bold bg-[#383F51] text-[#FFC107]"
  >
    <div class="flex-1 flex justify-start">
      By Yaakoub
    </div>
    <div class="flex-1 flex justify-center">
      <img
        src="@/assets/VegetaGoku.png"
        alt="GokuAndVegeta"
        class="
          w-16 h-16
          md:w-24 md:h-24
          lg:w-16 lg:h-16
        "
      />
    </div>
    <div class="flex-1 flex justify-end">
      And Ismael
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>

<script>
import PvSelectButton from "../../main.js";

export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    }
  }
}
</script>

<template>
  <pv-select-button
      v-model="$i18n.locale"
      :options="languages"
      class="uppercase"/>
</template>

<style scoped>

</style>
<script>
import {Source} from "../model/source.entity.js";
import PvAvatar from "../../main.js";

export default {
  name: "source-item",
  props: {
    source: { type: Source, required: true }
  },
  methods: {
    onSourceSelected() {
      this.$emit('source-selected', this.source);
    }
  }
}
</script>

<template>
  <div class="m-4">
    <div @click="onSourceSelected()"
         class="flex align-content-start flex-wrap">
      <span class="flex align-items-center justify-content-center mr-2">
        <pv-avatar :aria-label="source.name"
                   :image="source.urlToLogo" shape="circle"/>
      </span>
      <span class="flex align-items-center justify-content-center">
        {{ source.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
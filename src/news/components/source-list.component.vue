<script>
import {NewsApiService} from "../services/news-api.service.js";
import {Source} from "../model/source.entity.js";
import SourceItem from "./source-item.component.vue";

export default {
  name: "source-list",
  components: {SourceItem},
  props: {visible: Boolean},
  data() {
    return {
      sources: [],
      errors: [],
      newsApi: new NewsApiService()
    }
  },
  methods: {
    onSourceSelected(source) {
      this.$emit('source-selected', source);
    },
    isVisible() {
      return this.visible;
    },
    buildSourceListFromResponseData(sources) {
      return sources.map(source => new Source(source));
    }
  },
  created() {
    this.newsApi.getSources()
        .then(response => {
          this.sources = this.buildSourceListFromResponseData(response.data.sources);
          this.sources.forEach(source => {
            source.urlToLogo = this.newsApi.getUrlToLogo(source);
          });
          console.log('sources', this.sources);
        })
        .catch(e => this.errors.push(e));
  }
}
</script>

<template>
  <pv-drawer v-bind:visible="visible">
    <source-item
        v-for="source in sources"
        :key="source.id"
        :source="source"
        @source-selected="onSourceSelected(source)"/>
  </pv-drawer>
</template>

<style scoped>

</style>
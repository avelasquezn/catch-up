<script>
import {NewsApiService} from "./news/services/news-api.service.js";
import {Article} from "./news/model/article.entity.js";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import ArticleList from "./news/components/article-list.component.vue";
import UnavailableContent from "./news/components/unavailable-content.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";

export default {
  name: 'App',
  components: {FooterContent, UnavailableContent, ArticleList, LanguageSwitcher},
  data() {
    return {
      drawerVisible: false,
      articles: [],
      errors: [],
      newsApi: new NewsApiService()
    }
  },
  methods: {
    buildArticleListFromResponseData(articles) {
      return articles.map(article =>
          new Article(
              article.title,
              article.description,
              article.url,
              article.urlToImage,
              article.source,
              article.publishedAt
          ));
    },
    getArticlesForSource(sourceId) {
      this.newsApi.getArticlesForSource(sourceId)
          .then(response => {
            let articles = response.data.articles;
            this.articles = this.buildArticleListFromResponseData(articles);
            console.log(this.articles);
          })
          .catch(e => this.errors.push(e));
    },
    getArticlesForSourceWithLogo(source) {
      this.newsApi.getArticlesForSource(source.id)
          .then(response => {
            let articles = response.data.articles;
            this.articles = this.buildArticleListFromResponseData(articles);
            this.articles.forEach(article =>
                article.source.urlToLogo = source.urlToLogo);
          })
          .catch(e => this.errors.push(e));
    },
    toggleSidebar() {
      this.drawerVisible = !this.drawerVisible;
    },
    setSource(source) {
      this.getArticlesForSourceWithLogo(source);
      this.toggleSidebar();
    }
  }
}
</script>

<template>
  <div>
    <div>
      <pv-menubar>
        <template #start>
          <pv-button icon="pi pi bars" label="CatchUp"
                     text @click="toggleSidebar"/>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </div>
    <div>
      <article-list :articles="articles" v-if="errors"/>
      <unavailable-content v-else :errors="errors"/>
    </div>
    <footer-content/>
  </div>
</template>

<style scoped>

</style>

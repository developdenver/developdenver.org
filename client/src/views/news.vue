<template>
  <section class="news">
    <h2>Conference News</h2>
    <ul>
      <li v-for="(newsItem, index) in newsItems" :key="index">
        <news-item
          :title="newsItem.title"
          :date="newsItem.date"
          :author="newsItem.author"
          :content="newsItem.content"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import NewsItem from '../components/news-item.vue';
import newsItems from '../data/news-items';

export default {
    components: {
        NewsItem,
    },
    data() {
        return {
            newsItems,
        };
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';

.news {
}
</style>

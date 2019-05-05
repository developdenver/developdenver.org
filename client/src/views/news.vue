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
@import '@/styles/_general.scss';

.news {
	@include grid;
	grid-template-columns: repeat(8, 1fr);
	grid-auto-rows: auto;
	margin: $baseline * 8 0;
	h2 {
		grid-column: 2 / span 6;
	}
	ul {
		grid-column: 4 / span 3;
	}
}
</style>

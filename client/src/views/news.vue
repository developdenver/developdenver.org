<template>
	<section class="news">
		<countdown />
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
import Countdown from '../components/count-down.vue';
import newsItems from '../data/news-items';
import CircleLogo from '@/components/circle-logo';

export default {
	components: {
		NewsItem,
		Countdown,
		CircleLogo,
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
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	ul {
		@include grid-form;
	}
}
</style>

<template>
    <article class="news-item">
		<header>
			<h3>{{title}}</h3>
			<span class="byline">
				<time>{{date}}</time>
				<address>{{author}}</address>
			</span>
		</header>
		<main>
			<div v-html="parsedContent"></div>
		</main>
    </article>
</template>

<script>
import Showdown from "showdown";

const showdown = new Showdown.Converter();

export default {
	props: {
		title: String,
		date: String,
		author: String,
		content: String,
	},
	computed: {
		parsedContent() {
			return showdown.makeHtml(this.content);
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";

.news-item {
	margin-bottom: $baseline * 2;
	h3 {
		@include talk-title-font;
		margin-bottom: 0;
	}
	.byline {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-bottom: 0;
		time {
			@include talk-title-font;
		}
		address {
			font-style: italic;
		}
	}
}
</style>

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
	header {
		margin-bottom: $baseline;
		h3 {
			@include section-header-font;
		}
		.byline {
			@include italic-body-font;
			time {
				display: inline;
				margin-right: $xs;
				&:after {
					margin-left: $xs;
					content: "-";
				}
			}
			address {
				display: inline;
			}
		}
	}
}
</style>

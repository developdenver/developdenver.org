<template>
	<section class="feature">
		<img :src="image.url" :alt="image.altText" />
		<div class="benefit">
			<h2>{{heading}}</h2>
			<div v-html="parsedCopy"></div>
		</div>
	</section>
</template>

<script>
	import Showdown from "showdown";
	export default {
		props: {
			image: Object,
			heading: String,
			copy: String
		},
		computed: {
			parsedCopy(){
				const showdown = new Showdown.Converter();
				return showdown.makeHtml(this.copy);
			}
		}
	}
</script>

<style lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_colors.scss";
	@import "@/styles/_sizes.scss";

	$clip-amount: 80px;

	.feature {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		margin-top: $clip-amount * -1;
		margin-bottom: calc($clip-amount * -1) + $large;
		img {
			clip-path: inset($clip-amount 0);
		}
		.benefit {
			background-color: $pure-white;
			padding: $large;
			z-index: 10;
			h2 {
				@include section-header-font;
			}
		}
		@media (max-width: $large-breakpoint){
			& {
				margin-top: 0;
				margin-bottom: $large;
				img {
					display: block;
					width: 100%;
					clip-path: none;
				}
			}
		}
	}
</style>

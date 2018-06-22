<template>
	<section class="sponsors">
		<h2>Sponsors</h2>
		<ul class="platinum-sponsors">
			<li>Sponsor Here</li>
		</ul>
		<ul class="gold-sponsors">
			<li>Sponsor Here</li>
		</ul>
		<div class="sponsor-call-to-action">
		<a class="button" href="mailto:hello@developdenver.com">Interested in Sponsoring?</a>
		</div>
	</section>
</template>

<style lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";
	@import "@/styles/_general.scss";

	.sponsors {
		padding: $baseline;
		background-color: $light-grey;
		h2 {
			display: block;
			text-align: center;
			letter-spacing: 0;
			@include tertiary-header-font;
		}
		a {
			display: inline-block;
			@include call-to-action-font;
		}
		ul {
			padding: $baseline;
			border-bottom: 1px solid $light-grey;
		}
		.sponsor-call-to-action {
			display: flex;
			justify-content: center;
			padding: $xl;
			.button {
				@include call-to-action-button;
				margin: 0 auto;
			}
		}
	}
</style>

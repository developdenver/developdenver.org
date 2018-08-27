<template>
	<section class="sponsors">
		<h2><img src="../assets/logos/sponsors.svg" class="svg" alt="sponsors" /></h2>
		<ul v-if="premiumSponsor" class="platinum-sponsors">
			<li>Sponsor Here</li>
		</ul>
		<ul v-if="siteSponsors.length" class="gold-sponsors">
			<li>Sponsor Here</li>
		</ul>
		<div class="sponsor-call-to-action">
			<p>Interested in becoming a sponsor?</p>
			<a class="button" href="mailto:hello@developdenver.com">Contact Us</a>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			premiumSponsor: null,
			siteSponsors: [],
		};
	},
};
</script>

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
		img.svg {
			width: 15rem;
			padding: $baseline;
		}
		.sponsor-call-to-action {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: $xl;
			p {
				@include stylized-body-font;
				max-width: 100%;
				text-align: center;
			}
			.button {
				@include call-to-action-button;
				margin: 0 auto;
			}
		}
	}
</style>

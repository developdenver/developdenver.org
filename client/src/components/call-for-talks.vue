<template>
	<section class="call-for-talks">
		<div class="talk-call-to-action">
			<p>Interested in speaking at Develop Denver?</p>
			<router-link class="button" :to="{name: 'submit-talk'}">Register and submit a talk!</router-link>
		</div>
	</section>
</template>

<style lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";
	@import "@/styles/_general.scss";

	.call-for-talks {
		padding: $xxl;
		background-color: $tertiary-color;
		.talk-call-to-action {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: $xl;
			p {
				@include body-font;
				font-size: $large;
				max-width: 100%;
				text-align: center;
				margin-bottom: $large;
			}
			.button {
				@include call-to-action-button;
				margin: 0 auto;
			}
		}
	}
</style>

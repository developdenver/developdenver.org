<template>
	<section class="call-to-registration">
		<div class="mind-melter">
			<img src="@/assets/mind-melter.svg" alt="Skull with exposed brain" />
		</div>
		<div class="call-to-action">
			<span class="slogan">Code</span>
			<span class="slogan">Design</span>
			<span class="slogan">Community</span>
			<p class="date">October 11th & 12th</p>
			<router-link class="button" :to="{name: 'registration'}">Register Today</router-link>
		</div>
	</section>
</template>

<style scoped lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_general.scss";
	@import "@/styles/_sizes.scss";

	.call-to-registration {
		display: grid;
		grid-template:
			"mind-melter call-to-action" auto / 1fr 1fr;
		margin-top: 10rem + $xxxl; // Offset mind-melter image
		margin-bottom: 2rem + $xxxl; // Offset mind-metler image
		@media (max-width: $large-breakpoint){
			display: block;
			position: relative;
			margin: $xxl 0;
			padding: 0 $baseline;
		}
		.mind-melter {
			position: relative;
			img {
				position: absolute;
				max-width: 500px; // SVG
				bottom: -30px; // Offset
				right: -100px; // Offset
				@media (max-width: $large-breakpoint){
					padding: 0 $baseline;
					height: 100%;
					bottom: 0;
					right: 0;
				}
			}
			@media (max-width: $large-breakpoint){
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
		.call-to-action {
			grid-area: call-to-action;
			.slogan {
				@include secondary-header-font;
				display: block;
			}
			.date {
				@include tertiary-header-font;
				margin-top: $baseline;
				margin-bottom: $large;
			}
			.button {
				@include call-to-action-button;
			}
			@media (max-width: $large-breakpoint){
				background-color: $white;
				z-index: 10;
				opacity: 0.85;
			}
		}
	}
</style>

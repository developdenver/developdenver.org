<template>
  <div class="hero">
	<countdown />
    <call-to-registration />
  </div>
</template>

<script>
import Countdown from "@/components/count-down.vue";
import CallToRegistration from "@/components/call-to-registration.vue";

export default {
	components: {
		Countdown,
		CallToRegistration,
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

.hero {
	height: 100vh;
	@include grid;
	grid-template-rows: auto 1fr;
	@media (max-width: $small-breakpoint) {
		height: calc(100vh - #{$mobile-header-size}); // header size
	}
	&::after {
		content: "";
		opacity: 0.3;
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url("/img/ballmer-peak.jpeg");
		background-size: cover;
	}
	.call-to-registration {
		grid-row: 2;
		grid-column: 3 / span 3;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
		.button {
			margin-top: $baseline * 2;
			@include call-to-action;
		}
		.slogan {
			@include primary-header-font;
		}
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>

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
	grid-template: auto 1fr / repeat(8, 1fr);
	padding: $baseline;
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
		grid-column: 2 / span 3;
	}
	.countdown {
		grid-row: 1;
		grid-column: 7 / span 2;
	}
}
</style>

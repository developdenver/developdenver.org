<template>
	<section id="landing" class="full landing-screen">
		<div class="plus-grid-container"></div>
		<div class="landing-headline">
			<h1>August</h1>
			<div class="spacer" />
			<h1>15th + 16th</h1>
		</div>
		<countdown />
	</section>
</template>

/* SCRIPTS */
<script>
import Countdown from '@/components/count-down.vue';

export default {
	components: {
		Countdown,
	},
};
</script>

/* SCRIPTS */
<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_typography.scss';
#landing {
	height: 100vh;
	position: relative;
	z-index: -2;
	.landing-headline {
		@include align-self(center);
		@include headline-font;
		grid-row: 2;
		grid-column: 2 / span 5;
		h1 {
			background: $yellow;
			float: left;
			line-height: 1em;
		}
		.spacer {
			height: 40px;
			float: left;
			width: 100%;
		}
	}
}
</style>

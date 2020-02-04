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

		grid-row: 2;
		grid-column: 2 / span 5;
		h1 {
			@include headline-font;
			background: $yellow;
			float: left;
			line-height: 1em;
		}
		.spacer {
			height: 40px;
			float: left;
			width: 100%;
		}
		@media (max-width: $medium-breakpoint) {
			grid-column: 1 / span 6;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			h1 {
				font-size: 76px;
			}
		}
	}
	.plus-grid-container {
		&.onScroll {
			transform: translate(-5%, -5%) skewX(40deg);
			transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
		}
	}
}
</style>

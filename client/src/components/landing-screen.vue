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
	// data() {
	// 	return {
	// 		landingHeadline: document.getElementsByClassName(
	// 			'landing-headline',
	// 		)[0],
	// 		landingBackground: document.getElementsByClassName(
	// 			'plus-grid-container',
	// 		)[0],
	// 		wh: window.innerHeight,
	// 	};
	// },
	// methods: {
	// 	throttle(type, name, obj) {
	// 		var obj = obj || window;
	// 		var running = false;
	// 		var func = function() {
	// 			if (running) {
	// 				return;
	// 			}
	// 			running = true;
	// 			requestAnimationFrame(function() {
	// 				obj.dispatchEvent(new CustomEvent(name));
	// 				running = false;
	// 			});
	// 		};
	// 		obj.addEventListener(type, func);
	// 	},
	// 	handleScroll(event) {
	// 		console.log('window page offset ', window.pageYOffset);
	// 		let scrollpos = window.scrollY;
	// 		let skew = 0;
	// 		let x = 0;
	// 		let y = 0;
	// 		let offsetToScroll = this.landingHeadline.offsetTop - scrollpos;
	// 		// When the element is in the top 1/4 of the screen add the effect
	// 		console.log('is greater ', offsetToScroll < this.wh / 4);
	// 		if (offsetToScroll < this.wh / 4) {
	// 			skew = (offsetToScroll - this.wh / 4) / 10;
	// 			x = -(offsetToScroll - this.wh / 4) / 100;
	// 			console.log('numerator ', offsetToScroll - this.wh / 4);
	// 			console.log('SKEW', skew);
	// 			console.log('x ', x);
	// 			if (skew > -90) {
	// 				this.landingBackground.style.webkitTransform = `rotate3d(${x}, 1, 1, ${skew}deg)`;
	// 			}
	// 		} else {
	// 			console.log('stop effect');
	// 			x = 0;
	// 			skew = 0;
	// 			this.landingBackground.style.webkitTransform = `rotate3d(${x}, 1, 1, ${skew}deg)`;
	// 		}
	// 		// this.landingBackground.style.transform =
	// 		// 	'rotate(' + window.pageYOffset + 'deg)';
	// 	},
	// },
	// mounted() {
	// 	this.landingHeadline = document.getElementsByClassName(
	// 		'landing-headline',
	// 	)[0];
	// 	this.landingBackground = document.getElementsByClassName(
	// 		'plus-grid-container',
	// 	)[0];
	// 	this.wh = window.innerHeight;
	// 	this.throttle('scroll', 'handleScroll');
	// },
	// created() {
	// 	console.log('created');
	// 	window.addEventListener('scroll', this.handleScroll);
	// },
	// destroyed() {
	// 	window.removeEventListener('scroll', this.handleScroll);
	// },
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
			@include grid-full-width;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			h1 {
				font-size: 76px;
			}
		}
	}
	.plus-grid-container {
		// transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
		&.onScroll {
			transform: translate(-5%, -5%) skewX(40deg);
			transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
		}
	}
}
</style>

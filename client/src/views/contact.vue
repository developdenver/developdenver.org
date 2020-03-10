<template>
	<fragment>
		<section id="contact-landing" class="full landing-screen">
			<countdown />
			<h1>Questions? Comments. Codeblocks.</h1>
			<div class="plus-grid red move"></div>
		</section>
		<section class="contact-image full">
			<div class="image-wrapper">
				<img
					class="moving-image"
					src="/img/default_profile_yellow.jpg"
					alt="Nerdy Developer Photo"
				/>
			</div>
		</section>
		<section class="contact">
			<HeaderBar
				title="Contact"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SPONSORS.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="intro">
				<h4>Comments, Questions, Press</h4>
				<a href="mailto:hello@developdenver.org"
					>hello@developdenver.org</a
				>
				<h4>Sponsorship</h4>
				<a href="mailto:sponsorship@developdenver.org"
					>sponsorship@developdenver.org</a
				>
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import HeaderBar from '@/components/header-bar.vue';
import Countdown from '@/components/count-down.vue';
import { parallaxElement, throttle } from '@/utilities/parallax';
export default {
	components: {
		Countdown,
		HeaderBar,
	},
	data() {
		return {
			rotatingElements: document.getElementsByClassName('move'),
			movingImages: document.getElementsByClassName('moving-image'),
		};
	},
	mounted() {
		this.rotatingElements = document.getElementsByClassName('move');
		this.movingImages = document.getElementsByClassName('moving-image');
		this.throttle('scroll', 'handleScroll');
	},
	created() {
		this.$store.dispatch('events/fetchEvents');
		window.addEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll(event) {
			let scrollpos = window.scrollY;
			let denominator = 5;
			for (let i = 0; i < this.rotatingElements.length; i++) {
				parallaxElement(
					this.rotatingElements[i],
					scrollpos,
					denominator,
					5,
				);
			}
			for (let i = 0; i < this.movingImages.length; i++) {
				parallaxElement(this.movingImages[i], scrollpos, 2, 3);
			}
		},
	},
};
</script>
<style lang="scss">
@import '@/styles/_general.scss';
#contact-landing {
	.plus-grid.red {
		grid-column: 3 / span 4;
		height: 80vh;
		margin-top: 20vh;
		width: 50vw;
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid.red {
			height: 20vh;
			margin-top: 0vh;
		}
	}
}
.contact-image {
	background: $yellow;
	.image-wrapper {
		grid-column: 1 / span 3;
		img {
			max-width: 100%;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
	}
}
.contact {
	h4 {
		padding: $baseline * 2 0 $baseline/2 0;
		&:first-child {
			padding-top: 0;
		}
	}
}
</style>

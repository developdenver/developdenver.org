<template>
	<fragment>
		<section id="contact-landing" class="full landing-screen">
			<countdown />
			<h1>Questions? Comments. Codeblocks.</h1>
			<div class="plus-grid red"></div>
		</section>
		<section class="contact-image full">
			<div class="image-wrapper">
				<img src="/img/default_profile_yellow.jpg" />
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
export default {
	components: {
		Countdown,
		HeaderBar,
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

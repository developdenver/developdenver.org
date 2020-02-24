<template>
	<fragment>
		<section id="sponsorship-landing" class="full landing-screen">
			<countdown />
			<h1>Support the conference. Support the community.</h1>
			<div class="plus-grid red move"></div>
		</section>
		<section class="intro-image full">
			<div class="image-wrapper">
				<img
					class="moving-image"
					src="/img/2020/dd_20_sponsor_1b.jpg"
					alt="Develop Denver Speaker"
				/>
			</div>
		</section>
		<section class="exposure">
			<HeaderBar
				title="Sponsor"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SPONSORS.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_SPONSORS.svg')
				"
			/>
			<div class="intro">
				<p>
					Promote your product to over 500 attendees, while showing
					support for the Denver developer community.
				</p>
				<p>
					Atendees include:
				</p>
				<ul class="bullet-list">
					<li>Developers</li>
					<li>Designers</li>
					<li>Infrastructure Engineers</li>
					<li>Product Designers</li>
					<li>Engineering Managers</li>
				</ul>
				<p>
					This year we're doing more than giving an amazing conference
					experience, we're also committing to helping Denver stay
					educated and connected by funding local meetups. That's why
					a small portion of every single sponsor's donation this year
					will go towards helping local meetups in need. If you want
					to be more involved in this aspect of giving, please let us
					know and we will facilitate accordingly.
				</p>
				<p>
					Have questions? Email:
					<a href="mailto:sponsorship@developdenver.org"
						>sponsorship@developdenver.org</a
					>
				</p>
				<a class="button" href="/dvlp_schedule_digital.pdf"
					><button>Download Sponsor Deck</button></a
				>
			</div>
		</section>
		<section class="benefits">
			<HeaderBar
				title="Sponsor Discounts"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SPONSORS.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_SPONSORS.svg')
				"
			/>
			<div class="intro">
				<p>
					Sponsors get a discounted ticket rate of <b>$199 </b> for
					one-to-ten tickets and <b>$149 </b> for more than ten
					tickets purchased.
				</p>

				<p>
					Want to become a sponsor? Have questions? Email us at:
					<a href="mailto:sponsorship@developdenver.org"
						>sponsorship@developdenver.org</a
					>
				</p>
			</div>
		</section>
		<sponsor-list :showButton="false" />
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import SponsorList from '@/components/sponsor-list.vue';
import { parallaxElement, throttle } from '@/utilities/parallax';

export default {
	components: {
		Countdown,
		HeaderBar,
		SponsorList,
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
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll(event) {
			let scrollpos = window.scrollY;
			let denominator = 2;
			for (let i = 0; i < this.rotatingElements.length; i++) {
				parallaxElement(
					this.rotatingElements[i],
					scrollpos,
					denominator,
					3,
				);
			}
			for (let i = 0; i < this.movingImages.length; i++) {
				parallaxElement(this.movingImages[i], scrollpos, 4, 2);
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

#sponsorship-landing {
	@include grid-full-width;
	position: relative;
	h1 {
		z-index: 2;
	}
	.plus-grid.red {
		@include plus-grid;
		grid-column: 3 / span 4;
		height: 80vh;
		margin-top: 60vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
		z-index: 1;
	}
	.countdown {
		z-index: 2;
	}
	@media (max-width: $small-breakpoint) {
		grid-column: 1;
		h1 {
			grid-column: 1;
			grid-row: 2;
		}
		.plus-grid.red {
			grid-column: 1;
			grid-row: 2;
			height: 15vh;
			margin-top: 30vh;
			width: 100vw;
		}
		.countdown {
			grid-row: 2;
		}
	}
}
.exposure a {
	display: inline;
}
.benefits b {
	font-weight: 700;
	color: $red;
}
</style>

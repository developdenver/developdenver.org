<template>
	<div class="index">
		<landing-screen />
		<about />
		<venue-list />
		<section class="image-break">
			<div class="image-container">
				<img
					class="moving-image"
					src="/img/2020/dd_20_home_2.jpg"
					alt="Develop Denver Community Photo"
				/>
			</div>
			<div class="plus-grid red move"></div>
		</section>
		<ticket-details :showGroup="false" :buyTixCTA="true" />

		<!-- <schedule-download /> -->
		<sponsor-list :showButton="true" />
	</div>
</template>

/* SCRIPTS */
<script>
import About from '@/components/about.vue';
import BuyTicketsButton from '@/components/buy-tickets-button';
import CallForTalks from '@/components/call-for-talks';
import FeaturedTalks from '@/components/featured-talks.vue';
import LandingScreen from '@/components/landing-screen.vue';
import ProfileCardList from '@/components/profile-card-list';
import ScheduleDownload from '@/components/schedule-download.vue';
import SponsorList from '@/components/sponsor-list';
import TicketDetails from '@/components/ticket-details.vue';
import VenueList from '@/components/venue-list';
import { parallaxElement, throttle } from '@/utilities/parallax';

export default {
	components: {
		About,
		BuyTicketsButton,
		CallForTalks,
		FeaturedTalks,
		LandingScreen,
		ProfileCardList,
		ScheduleDownload,
		SponsorList,
		TicketDetails,
		VenueList,
	},
	data() {
		return {
			landingHeadline: document.getElementsByClassName(
				'landing-headline',
			)[0],
			landingBackground: document.getElementsByClassName(
				'plus-grid-container',
			)[0],
			rotatingElements: document.getElementsByClassName('move'),
			movingImages: document.getElementsByClassName('moving-image'),
			wh: window.innerHeight,
		};
	},
	methods: {
		handleScroll(event) {
			let scrollpos = window.scrollY;
			let skewBg = 0;
			let xBg = 0;
			let offsetToScroll = this.landingHeadline.offsetTop - scrollpos;

			for (let i = 0; i < this.rotatingElements.length; i++) {
				parallaxElement(this.rotatingElements[i], scrollpos, 4, 2);
			}
			for (let i = 0; i < this.movingImages.length; i++) {
				parallaxElement(this.movingImages[i], scrollpos, 2, 3);
			}

			// When the element is in the top 1/4 of the screen add the effect
			if (offsetToScroll < this.wh / 3) {
				skewBg = (offsetToScroll - this.wh / 3) / 2;

				if (skewBg > -500) {
					this.landingBackground.style.webkitTransform = `translateY(${skewBg}px)`;
				}
			} else {
				xBg = 0;
				skewBg = 0;
				this.landingBackground.style.webkitTransform = `translateY(${skewBg}px)`;
			}
		},
	},
	mounted() {
		this.landingHeadline = document.getElementsByClassName(
			'landing-headline',
		)[0];
		this.landingBackground = document.getElementsByClassName(
			'plus-grid-container',
		)[0];
		this.rotatingElements = document.getElementsByClassName('move');
		this.movingImages = document.getElementsByClassName('moving-image');
		this.wh = window.innerHeight;
		throttle('scroll', 'handleScroll');
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},
};
</script>

/* STYLES */
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.index {
	display: contents;
	.image-break {
		.image-container {
			grid-column: 1 / span 4;
			grid-row: 1;
			img {
				max-width: 100%;
				width: 100%;
			}
		}
		.plus-grid {
			@include plus-grid;
			grid-column: 3 / span 4;
			grid-row: 1;
			height: 300px;
			margin-top: -100px;
		}
	}
	@media (max-width: $small-breakpoint) {
		.image-break {
			.image-container,
			.plus-grid {
				grid-column: 1;
				height: 200px;
			}
			.image-container {
				margin-top: $baseline * 4;
			}
		}
	}
}
</style>

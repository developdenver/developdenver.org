<template>
	<div class="index">
		<landing-screen />
		<about />
		<venue-list />
		<section class="image-break">
			<div class="image-container">
				<img src="/img/ballmer-peak.jpeg" />
			</div>
			<div class="plus-grid red"></div>
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
			}
			.image-container {
				margin-top: $baseline * 4;
			}
		}
	}
}
</style>

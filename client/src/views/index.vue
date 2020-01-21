<template>
	<div class="index">
		<landing-screen />
		<about />
		<venue-list />
		<ticket-details />
		<!-- <schedule-download /> -->
		<sponsor-list />
	</div>
</template>

/* SCRIPTS */
<script>
import About from '@/components/about.vue';
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
	.conference-info {
		@media (max-width: $small-breakpoint) {
			margin-top: $baseline * 2;
			padding: 0;
		}
		max-width: $max-width;
		> section {
			margin-bottom: $baseline * 9;
			@media (max-width: $small-breakpoint) {
				padding: $baseline;
				margin-bottom: $baseline * 2;
				&.featured-talks {
					margin-bottom: 0;
				}
			}
		}
	}
}
</style>

<template>
	<div class="index">
		<hero-banner/>
		<section class="conference-info">
			<feature-benefit />
			<featured-talks />
			<ticket-details />
			<sponsor-list />
			<venue-list />
		</section>
	</div>
</template>

<script>
import HeroBanner from '@/components/hero-banner.vue';
import ProfileCardList from '@/components/profile-card-list';
import FeatureBenefit from '@/components/feature-benefit.vue';
import TicketDetails from '@/components/ticket-details.vue';
import SponsorList from '@/components/sponsor-list';
import CallForTalks from '@/components/call-for-talks';
import VenueList from '@/components/venue-list';
import FeaturedTalks from '@/components/featured-talks.vue';

export default {
	components: {
		HeroBanner,
		ProfileCardList,
		FeatureBenefit,
		TicketDetails,
		SponsorList,
		CallForTalks,
		VenueList,
        FeaturedTalks,
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.index {
	display: contents;
	.conference-info {
		padding: 0 $baseline * 2;
		margin-top: $baseline * 9;
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

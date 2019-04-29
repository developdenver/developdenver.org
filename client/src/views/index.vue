<template>
	<div class="index">
		<hero-banner/>
		<section class="conference-info">
			<feature-benefit />
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

export default {
	components: {
		HeroBanner,
		ProfileCardList,
		FeatureBenefit,
		TicketDetails,
		SponsorList,
		CallForTalks,
		VenueList,
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
	h2 {
		@include primary-header-font;
		border-bottom: 1px solid $white;
		margin-bottom: $baseline;
	}
	.conference-info {
		@include grid;
		grid-template: auto / repeat(8, 1fr);
		.feature, .ticket-details, .venues, .sponsors {
			grid-column: 2 / span 6;
		}
	}
}
</style>

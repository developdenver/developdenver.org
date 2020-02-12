<template>
	<fragment>
		<section id="tickets-landing" class="full landing-screen">
			<countdown />
			<h1>The hottest ticket in town</h1>

			<div class="cta">
				<BuyTicketsButton />
			</div>
			<div class="plus-grid red"></div>
		</section>
		<ticket-details :showGroup="false" />
		<section id="buy-tickets">
			<HeaderBar
				title="Buy Tickets"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<ticket-purchase :levels="levels" :isDiscountCode="false" />
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import BuyTicketsButton from '@/components/buy-tickets-button';
import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import TicketPurchase from '../components/ticket-purchase';
import TicketDetails from '../components/ticket-details';
import VenueList from '@/components/venue-list';

export default {
	components: {
		BuyTicketsButton,
		Countdown,
		HeaderBar,
		TicketPurchase,
		TicketDetails,
		VenueList,
	},
	data() {
		return {
			levels: [
				/*
                {
                    sku: 'skuEarly',
                    label: '$149 - Early Bird',
                    description:
                        'Full access 2-day conference badge - Available until May 1st',
                },
				*/
				{
					sku: 'skuRegular',
					price: '$249',
					label: 'Individual Ticket',
					description:
						'This ticket is for those attendees who are paying for thier own conference registration. We also encourage non-profit and university employees to purchase this ticket.',
				},
				{
					sku: 'skuEmployer',
					price: '$399',
					label: 'Corporate Ticket',
					description:
						'This ticket is for those attendees whose (for profit) companies are paying for their conference registration.',
					additional_info:
						' Help make Develop Denver affordable to all attendees, including sponsoring student tickets and sponsoring meals during the conference.',
				},
			],
		};
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
#tickets-landing {
	.plus-grid.red {
		@include plus-grid;
		grid-column: 2 / span 4;
		height: 30vh;
		margin-top: 60vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
		z-index: 1;
	}
	@media (max-width: $small-breakpoint) {
		grid-column: 1;
		h1 {
			grid-column: 1;
			grid-row: 1;
		}
		.plus-grid.red {
			grid-column: 1;
			grid-row: 2;
			height: 55vh;
			margin-top: 30vh;
		}
	}
}

.ticket-details {
	@include grid-full-width;
}
</style>

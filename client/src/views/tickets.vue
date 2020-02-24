<template>
	<fragment>
		<section id="tickets-landing" class="full landing-screen">
			<countdown />
			<h1>The hottest ticket in town</h1>

			<div class="cta">
				<BuyTicketsButton />
			</div>
			<div class="plus-grid red move"></div>
		</section>
		<ticket-details :showGroup="true" />
		<section id="buy-tickets">
			<HeaderBar
				title="Buy Tickets"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_TICKET.svg')"
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
import { parallaxElement, throttle } from '@/utilities/parallax';

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
			rotatingElements: document.getElementsByClassName('move'),
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
	methods: {
		handleScroll(event) {
			let scrollpos = window.scrollY;
			let denominator = 2;
			for (let i = 0; i < this.rotatingElements.length; i++) {
				parallaxElement(
					this.rotatingElements[i],
					scrollpos,
					denominator,
					2,
				);
			}
		},
	},
	mounted() {
		this.rotatingElements = document.getElementsByClassName('move');
		this.throttle('scroll', 'handleScroll');
	},
	created() {
		this.$store.dispatch('events/fetchEvents');
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
#tickets-landing {
	.plus-grid.red {
		grid-column: 2 / span 4;
		height: 60vh;
		margin-top: 45vh;
		width: 50vw;
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid.red {
			height: 25vh;
			margin-top: 5vh;
		}
	}
}

.ticket-details {
	@include grid-full-width;
}
</style>

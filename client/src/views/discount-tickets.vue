<template>
	<fragment>
		<section id="discount-tickets-landing" class="full landing-screen">
			<countdown />
			<h1>The hottest ticket in town</h1>
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
			<ticket-purchase :levels="levels" :isDiscountCode="true" />
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import TicketPurchase from '../components/ticket-purchase';
import TicketDetails from '../components/ticket-details';
/* global Stripe */
import CreditCardPayment from '../components/credit-card-payment';
import { parallaxElement, throttle } from '@/utilities/parallax';

export default {
	components: {
		CreditCardPayment,
		Countdown,
		HeaderBar,
		TicketPurchase,
		TicketDetails,
	},
	data() {
		return {
			rotatingElements: document.getElementsByClassName('move'),
			levels: [
				{
					sku: 'skuDiscount',
					label: '$199 - Discount',
					description: 'Thank you for being a part of our community!',
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
#discount-tickets-landing {
	.plus-grid.red {
		grid-column: 2 / span 4;
		height: 50vh;
		margin-top: 30vh;
		width: 50vw;
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid.red {
			height: 15vh;
			margin-top: 0vh;
		}
	}
}

.ticket-details {
	@include grid-full-width;
}
</style>

<template>
	<fragment>
		<section id="student-tickets-landing" class="full landing-screen">
			<countdown />
			<h1>The hottest ticket in town</h1>
			<div class="plus-grid red move"></div>
		</section>
		<ticket-details :showGroup="false" />
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

/* global Stripe */
import CreditCardPayment from '../components/credit-card-payment';
import TicketPurchase from '../components/ticket-purchase';
import TicketDetails from '../components/ticket-details';
import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import { parallaxElement, throttle } from '@/utilities/parallax';

export default {
	components: {
		CreditCardPayment,
		TicketPurchase,
		Countdown,
		HeaderBar,
		TicketDetails,
	},
	data() {
		return {
			rotatingElements: document.getElementsByClassName('move'),
			levels: [
				{
					sku: 'skuStudent',
					label: '$99 - Student',
					description:
						'I’m currently a student and I need financial help attending the conference. Note: If this is still too expensive please contact us via email at hello@developdenver.com and ask about volunteer opportunities.',
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
#student-tickets-landing {
	.plus-grid.red {
		height: 50vh;
		margin-top: 30vh;
		width: 50vw;
		@media (max-width: $small-breakpoint) {
			height: 15vh;
			margin-top: 0;
		}
	}
}
.student-tickets {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.ticket-details {
		@include grid-full-width;
		@include grid;
		.date-and-location {
			@include grid-text-0;
		}
		.benefits {
			@include grid-text-1;
		}
		.groups {
			@include grid-text-2;
		}
	}
	.venues,
	.ticket-purchase {
		@include grid-full-width;
	}
	.ticket-details,
	.venues {
		margin-bottom: $baseline * 4;
		@media (max-width: $small-breakpoint) {
			margin-bottom: $baseline * 2;
		}
	}
}
</style>

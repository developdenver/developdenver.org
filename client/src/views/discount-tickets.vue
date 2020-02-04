<template>
	<section class="discount-tickets">
		<countdown />
		<h2>Tickets</h2>
		<div class="ticket-details">
			<div class="date-and-location">
				<p>When: August 15 and 16, 2019</p>
				<p>Where: RiNo Brighton Boulevard</p>
			</div>
			<div class="benefits">
				<p>
					All badges include a custom printed 2-day conference badge,
					access to keynote, talks, workshops, and live podcasts,
					coffee, breakfast, and lunch at Zeppelin Station vendors
					both days, opening and closing parties, 8th annual Ballmer
					Peak Hackathon
				</p>
			</div>
		</div>
		<ticket-purchase :levels="levels" :isDiscountCode="true" />
	</section>
</template>

<script>
/* global Stripe */
import CreditCardPayment from '../components/credit-card-payment';
import TicketPurchase from '../components/ticket-purchase';
import Countdown from '@/components/count-down';

export default {
	components: {
		CreditCardPayment,
		TicketPurchase,
		Countdown,
	},
	data() {
		return {
			levels: [
				{
					sku: 'skuDiscount',
					label: '$199 - Discount',
					description: 'Thank you for being a part of our community!',
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

.discount-tickets {
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

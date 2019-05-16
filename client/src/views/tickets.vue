<template>
  <section class="tickets">
	<countdown />
	<h2>Tickets</h2>
	<div class="ticket-details">
		<div class="date-and-location">
			<p>When: August 15 and 16, 2019</p>
			<p>Where: RiNo Brighton Boulevard</p>
		</div>
		<div class="benefits">
			<p>All badges include a custom printed 2-day conference badge, access to keynote, talks, workshops, and live podcasts, coffee, breakfast, and lunch at Zeppelin Station vendors both days, opening and closing parties, 8th annual Ballmer Peak Hackathon</p>
		</div>
		<div class="groups">
			<p>Don’t worry, we’re all setup so you can purchase a group of conference badges. You’ll be asked to provide an email address for each attendee and you’re good to go. Have questions? Please contact us at <a href="mailto:hello@developdenver.org">hello@developdenver.org</a> if you need help.</p>
		</div>
	</div>
    <ticket-purchase :levels="levels" :isDiscountCode="false"/>
  </section>
</template>

<script>
import TicketPurchase from '../components/ticket-purchase';
import VenueList from '@/components/venue-list';
import Countdown from '@/components/count-down';

export default {
    components: {
        TicketPurchase,
		VenueList,
		Countdown,
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
                    label: '$249 - Regular',
                    description:
                        'Full access 2-day conference badge',
                },
                {
                    sku: 'skuEmployer',
                    label: '$399 - Employer',
                    description:
                        'Coming on your employer’s dime? Help make Develop Denver affordable to all attendees, including sponsoring student tickets and sponsoring meals during the conference.',
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

.tickets {
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
	.venues, .ticket-purchase {
		@include grid-full-width;;
	}
	.ticket-details, .venues {
		margin-bottom: $baseline * 8;
		@media (max-width: $small-breakpoint) {
			margin-bottom: $baseline * 2;
		}
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>

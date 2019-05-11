<template>
  <section class="tickets">
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
	<venue-list />
    <ticket-purchase :levels="levels" :isDiscountCode="false"/>
  </section>
</template>

<script>
import TicketPurchase from '../components/ticket-purchase';
import VenueList from '@/components/venue-list';

export default {
    components: {
        TicketPurchase,
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
	grid-template-columns: repeat(8, 1fr);
	margin: $baseline * 8 0;
	grid-auto-rows: auto;
	h2, .ticket-details, .venues {
		grid-column: 2 / span 6;
	}
	.ticket-purchase {
		grid-column: 4 / span 3;
	}
	.ticket-details, .venues {
		margin-bottom: $baseline * 8;
	}
}
</style>

<template>
  <section class="tickets">
    <ticket-purchase :levels="levels" :isDiscountCode="false"/>
  </section>
</template>

<script>
import TicketPurchase from '../components/ticket-purchase';

export default {
    components: {
        TicketPurchase,
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
                        '2-Day conference pass including personalized conference badge, access to keynote speakers, talks, workshops and food and beverage at five amazing venues in the Denver RiNo district.',
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
	grid-template: auto / repeat(8, 1fr);
	margin: $baseline * 8 0;
	h2, .ticket-purchase, .venues {
		grid-column: 2 / span 6;
	}
}
</style>

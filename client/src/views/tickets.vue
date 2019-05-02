<template>
  <section class="tickets">
    <h2>Conference Badges</h2>
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
    padding: $baseline;
    h2 {
        @include tertiary-header-font;
        margin-bottom: $large;
    }
}
</style>

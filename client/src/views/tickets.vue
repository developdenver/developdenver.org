<template>
  <section class="tickets">
    <h2>Tickets</h2>
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
                {
                    sku: 'skuEarly',
                    label: '$149 - Early Bird',
                    description:
                        'Available until May 1st, early bird pricing give access to the full 2-conference',
                },
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
                        'For those of you coming on your employer’s dime. Your ticket helps make Develop Denver affordable to all attendees, including sponsoring student tickets and sponsoring meals during the conference.',
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

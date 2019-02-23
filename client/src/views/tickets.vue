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
                    sku: 'skuRegular',
                    label: '$250 - Regular',
                    description:
                        '2-Day conference pass including personalized conference badge, access to keynote speakers, talks, workshops and food and beverage at five amazing venues in the Denver RiNo district.',
                },
                {
                    sku: 'skuEmployer',
                    label: '$400 - Employer',
                    description:
                        'For those of you coming on your employer’s dime. Your ticket helps make Develop Denver affordable to all attendees, including sponsoring student tickets and sponsoring meals during the conference.',
                },
                // {
                //     value: 'premium',
                //     label: '$500 - Individual Sponsor',
                //     description:
                //         'Play an important role in supporting the Denver tech community without breaking the bank. Your sponsorship ensures we can continue to provide a local community-driven conference. In addition to special sponsorship badge your name will appear as a sponsor on the Develop Denver website.',
                // },
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

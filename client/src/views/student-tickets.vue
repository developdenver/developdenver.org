<template>
  <section class="student-tickets">
    <h2>Tickets</h2>
    <ticket-purchase :levels="levels" :isDiscountCode="true"/>
  </section>
</template>

<script>
/* global Stripe */
import CreditCardPayment from '../components/credit-card-payment';
import TicketPurchase from '../components/ticket-purchase';

export default {
    components: {
        CreditCardPayment,
        TicketPurchase,
    },
    data() {
        return {
            levels: [
                {
                    sku: 'skuStudent',
                    label: '$99 - Student',
                    description:
                        'I’m currently a student and I need financial help attending the conference. Note: If this is still too expensive please contact us via email at hello@developdenver.com and explain your situation.',
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

.student-tickets {
}
</style>

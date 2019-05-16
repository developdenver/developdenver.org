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
                    level: 'discount',
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

.student-tickets {
}
</style>

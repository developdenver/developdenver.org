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
                    label: '$100 - Student',
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
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    max-width: $max-line-length;
    margin-bottom: $large;
    padding: $baseline;
    h2 {
        @include tertiary-header-font;
        margin-bottom: $large;
    }
    form {
        margin-bottom: $xxl;
        [type='submit'],
        a {
            @include call-to-action-button;
            display: block;
            width: 100%;
            margin-bottom: $large;
            &[disabled] {
                background-color: $medium-light-grey;
            }
        }
        .levels {
            margin-bottom: $large;
            input,
            label {
                display: inline-block;
                width: auto;
            }
            input {
                margin-bottom: $small;
                margin-right: $large;
            }
            label {
                @include fieldset-header-font;
            }
        }
    }
    .errors {
        color: $warning;
    }
    .message {
        @include bold-body-font;
    }
}
</style>

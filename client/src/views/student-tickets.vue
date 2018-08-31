<template>
    <section class="student-tickets">
        <h2>Tickets</h2>
		<ticket-purchase :levels="levels" :isDiscountCode="true" />
    </section>
</template>

<script>
/* global Stripe */
import CreditCardPayment from "../components/credit-card-payment";
import TicketPurchase from "../components/ticket-purchase";

export default {
	components: {
		CreditCardPayment,
		TicketPurchase,
	},
	data() {
		return {
			ticketLevel: "",
			error: "",
			message: "",
			stripe: null,
			card: null,
			levels: [{
				value: "student",
				label: "$90 - Student",
				description: "I’m currently a student and I need financial help attending the conference. Note: If this is still too expensive please contact us via email at hello@developdenver.com and explain your situation.",
			}],
		};
	},
	created() {
		this.stripe = Stripe(this.stripeKey);
		const elements = this.stripe.elements();
		this.card = elements.create("card");
	},
	computed: {
		paymentsService() {
			return this.$store.state.services.payments;
		},
		currentProfile() {
			return this.$store.getters["services/user/currentProfile"];
		},
		stripeKey() {
			return this.paymentsService.paymentKey;
		},
		isLoading() {
			return this.$store.getters["services/loading/isLoading"];
		},
	},
	methods: {
		async submit() {
			this.$store.dispatch("services/loading/pushLoading");
			const result = await this.stripe.createToken(this.card);
			if (result.error) {
				this.error = result.error;
				this.message = "";
			} else {
				const { id, firstName, lastName } = this.currentProfile.properties;
				const charge = {
					description: `${id} - ${lastName}, ${firstName}`,
					token: result.token.id,
					level: this.ticketLevel,
				};
				this.$store.dispatch("services/payments/charge", charge).then(response => {
					this.$store.dispatch("services/user/setAttendee", this.ticketLevel);
					this.error = "";
					this.message = "You're going to Develop Denver!";
					this.$router.push({name: "news"});
				}).catch(error => {
					this.error = error.message;
				});
			}
			this.$store.dispatch("services/loading/popLoading");
		},
		setError(error) {
			this.error = error;
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

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
        [type="submit"], a {
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
			input, label {
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

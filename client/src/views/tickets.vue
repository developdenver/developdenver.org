<template>
    <section class="tickets">
        <h2>Tickets</h2>
        <form @submit.prevent="submit">
            <div class="levels">
                <input type="radio" required id="early-bird" name="ticket-level" value="early-bird" v-model="ticketLevel" />
                <label for="early-bird">$135 - Early Bird</label>
                <p>Gets you tickets to the conference, a goody bag, and more! This is a $100 savings off the regular price of $235. Limited to the first 100 attendees!</p>
            </div>
            <div class="levels">
                <input type="radio" required id="premium" name="ticket-level" value="premium" v-model="ticketLevel" />
                <label for="premium">$500 - Premium</label>
                <p>Gets you everything a regular ticket gets you, your name listed on a site, and a custom-designed hoodie indicating your support of this community.</p>
            </div>

            <credit-card-payment
                :card="card"
                @setError="setError"
            />

            <input type="submit" value="Buy" />
            <div class="errors">{{error}}</div>
            <div class="message">{{message}}</div>
        </form>
    </section>
</template>

<script>
/* global Stripe */
import CreditCardPayment from "../components/credit-card-payment";

export default {
	components: {
		CreditCardPayment,
	},
	data() {
		return {
			ticketLevel: "",
			error: "",
			message: "",
			stripe: null,
			card: null,
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
	},
	methods: {
		async submit() {
			const result = await this.stripe.createToken(this.card);
			if (result.error) {
				this.error = result.error;
				this.message = "";
			} else {
				const {id, firstName, lastName} = this.currentProfile;
				const charge = {
					description: `${id} - ${lastName}, ${firstName}`,
					token: result.token.id,
					level: this.ticketLevel,
				};
				return this.$store.dispatch("services/payments/charge", charge).then(response => {
					this.error = "";
					this.message = "You're going to Develop Denver!";
					return this.$router.push({name: "news"});
				}).catch(error => {
					this.error = error.message;
					return true;
				});
			}
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

.tickets {
    max-width: 400px;
    h2 {
        @include tertiary-header-font;
        margin-bottom: $large;
    }
    form {
        margin-bottom: $xxl;
        input, label {
            display: inline-block;
        }
        [type="submit"] {
            @include call-to-action-button;
            display: block;
            width: 100%;
            margin-bottom: $large;
        }
        .levels {
            margin-bottom: $large;
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

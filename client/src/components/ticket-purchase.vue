<template>
	<form class="ticket-purchase" @submit.prevent="submit">
		<div class="ticket-details">
			<p>All tickets include conference badge, attendance to keynote speakers, talks, and workshops. Your ticket also included coffee, breakfast, lunch at Zeppelin Station, afternoon open bar, opening and closing party drinks, and closing party taco bar!</p>
			<p>Looking to purchase a group of tickets? Our apologies, our setup requires each user to register and purchase tickets individually. Please contact us at hello@developdenver.org if you need help purchasing multiple tickets.</p>
		</div>
		<div
			class="levels"
			v-for="(level, index) in levels"
			:key="index"
		>
			<input
				v-if="currentProfile.id"
				type="radio"
				required
				name="ticket-level"
				:id="level.value"
				:value="level.value"
				v-model="ticketLevel"
			/>
			<label :for="level.value">{{level.label}}</label>
			<p>{{level.description}}</p>
		</div>

		<div v-if="currentProfile.id && isDiscountCode">
			<label for="discount-code">Discount Code</label>
			<input
				required
				type="text"
				id="discount-code"
				name="discount-code"
				v-model="discountCode"
			/>
		</div>

		<credit-card-payment
			v-if="currentProfile.id"
			:card="card"
			@setError="setError"
		/>

		<input v-if="currentProfile.id" type="submit" :disabled="isLoading" value="Buy" />
		<router-link v-else :to="{name: 'register'}">Register To Buy!</router-link>
		<div class="errors">{{error}}</div>
		<div class="message">{{message}}</div>
	</form>
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
			discountCode: "",
		};
	},
	props: {
		levels: Array,
		isDiscountCode: Boolean,
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
					discount_code: this.discountCode || null,
				};
				this.$store.dispatch("services/payments/charge", charge).then(response => {
					if (response.error){
						throw new Error(response.error);
					}
					return this.$store.dispatch("services/user/setAttendee", this.ticketLevel);
				}).then(() => {
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

.tickets {
    .ticket-purchase {
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
            margin-bottom: $xl;
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
		.ticket-details {
			display: flex;
			flex-flow: column nowrap;
			margin-bottom: $xl;
			align-items: center;
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


<template>
	<form class="ticket-purchase" @submit.prevent="submit">
		<div class="levels">
			<div class="level" v-for="(level, index) in levels" :key="index">
				<span>
					<input
						v-if="currentProfile.id"
						type="radio"
						required
						name="ticket-level"
						:id="level.sku"
						:value="level.sku"
						v-model="ticketSKU"
					>
					<label :for="level.sku"><h3>{{level.label}}</h3></label>
				</span>
				<p class="level-description">{{level.description}}</p>
			</div>
		</div>
		<div class="ticket-quantity" v-if="currentProfile.id">
			<label for="ticket-quantity">Quantity</label>
			<input type="number" name="ticket-quantity" v-model.number="ticketQuantity">
		</div>

		<div class="invitees" :class="{ 'not-enough-tickets': notEnoughTickets }" v-if="currentProfile.id">
			<label for="invitees">Email address(es) for each badge (don’t worry, you can add or edit later)</label>
			<VoerroTagsInput
				v-model="invitees"
				:typeahead="false"
				:placeholder="remainingTicketsMessage"
				:limit="ticketQuantity"
				/>
		</div>

		<div v-if="currentProfile.id && isDiscountCode">
			<label for="discount-code">Discount Code</label>
			<input required type="text" id="discount-code" name="discount-code" v-model="discountCode">
		</div>

		<credit-card-payment v-if="currentProfile.id" :card="card" @setError="setError"/>

		<router-link v-else :to="{name: 'register', query: { redirect: 'conference-badges' } }" class="call-to-action">Register To Buy!</router-link>
  </form>
</template>

<script>
/* global Stripe */
import { mapGetters } from 'vuex';
import CreditCardPayment from '../components/credit-card-payment';
import VoerroTagsInput from '@voerro/vue-tagsinput';
import sleep from '../utilities/sleep';
import '@voerro/vue-tagsinput/dist/style.css';

export default {
	components: {
		CreditCardPayment,
		VoerroTagsInput,
	},
	data() {
		return {
			ticketSKU: '',
			error: '',
			message: '',
			stripe: null,
			card: null,
			discountCode: '',
			ticketQuantity: 1,
			invitees: [],
		};
	},
	props: {
		levels: Array,
		isDiscountCode: Boolean,
	},
	async created() {
		this.stripe = Stripe(this.stripeKey);
		const elements = this.stripe.elements();
		const options = {
			style: {
				base: {
					fontSize: '20px',
					color: '#ffffff',
				}
			}
		};
		this.card = elements.create('card', options);
		await this.profileLoaded;
		if (this.currentProfile && !this.isAttendee) {
			this.invitees = [
				this.currentProfile.properties.email,
				...this.invitees,
			];
		}
	},
	computed: {
		...mapGetters({
			isAttendee: 'tickets/isAttendee',
			currentProfile: 'services/user/currentProfile',
			isLoading: 'services/loading/isLoading',
			profileLoaded: 'services/user/profileLoaded',
		}),
		paymentsService() {
			return this.$store.state.services.payments;
		},
		stripeKey() {
			return this.paymentsService.paymentKey;
		},
		remainingTickets() {
			return this.ticketQuantity - this.invitees.length;
		},
		remainingTicketsMessage() {
			if (this.remainingTickets < 0) {
				return 'not enough tickets!';
			}
			if (this.remainingTickets === 0) {
				return '0 remaining';
			}
			if (this.remainingTickets === 1) {
				return '1 more email';
			}
			return `${this.remainingTickets} more emails`;
		},
		notEnoughTickets() {
			return this.remainingTickets < 0;
		},
		formInvalid() {
			return this.notEnoughTickets || !this.ticketSKU;
		},
	},
	methods: {
		async submit() {
			this.$store.dispatch('services/loading/pushLoading');
			const result = await this.stripe.createToken(this.card);
			if (result.error) {
				this.error = result.error;
				this.message = '';
			} else {
				const {
					id,
					firstName,
					lastName,
					email,
				} = this.currentProfile.properties;
				const charge = {
					description: `${id} - ${lastName}, ${firstName}`,
					token: result.token.id,
					sku: this.ticketSKU,
					email,
					discount_code: this.discountCode || null,
					invitees: this.invitees,
					quantity: this.ticketQuantity,
				};
				this.$store
					.dispatch('services/payments/charge', charge)
					.then(response => {
						if (response.error) {
							throw new Error(response.error);
						}
						return this.$store.dispatch(
							'services/user/setAttendee',
							this.ticketLevel,
						);
					})
					.then(() => {
						this.error = '';
						this.message = "You're going to Develop Denver!";
						return sleep(2000);
					})
					.then(() => {
						const next =
							!this.invitees.includes(
								this.currentProfile.properties.email,
							) || this.quantity > 1
							? { name: 'my-tickets' }
							: { name: 'news' };
						this.$router.push(next);
					})
					.catch(error => {
						this.error = error.message;
					});
			}
			this.$store.dispatch('services/loading/popLoading');
		},
		setError(error) {
			this.error = error;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';

.ticket-purchase {
	@include grid;
	.levels {
		.level {
			display: grid;
			grid-template: auto auto / 1fr;
			grid-row-gap: $baseline / 2;
			input, label, h3 {
				display: inline;
				width: auto;
				grid-row: 1;
			}
			input {
				margin-right: $baseline;
			}
			.level-description {
				grid-row: 2;
				grid-column: 1;
				margin-bottom: $baseline * 2;
			}
		}
	}
	.levels, .ticket-quantity, .invitees, .credit-card-payment {
		@include grid-form;
		margin-bottom: $baseline;
		input {
			width: 100%;
		}
	}
	.invitees {
		.tags-input-wrapper-default {
			padding: 0;
			input {
				width: 100%;
				background-color: $black;
				color: $white;
				border: 2px solid $white;
				margin: 0;
			}
		}
	}
	.credit-card-payment {
		.StripeElement {
			border: 2px solid $white;
			padding: $baseline;
		}
	}
	.call-to-action, [type=submit] {
		@include grid-form;
		@include call-to-action;
		padding: 0;
	}
}

</style>

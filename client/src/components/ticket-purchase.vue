<template>
	<form class="ticket-purchase" @submit.prevent="submit">
		<div class="levels form-section">
			<p class="required-field">Required field</p>
			<h3 class="required">Ticket Type</h3>
			<div
				class="level form-row radio-input"
				v-bind:class="{ 'is-disabled': !currentProfile.id }"
				v-for="(level, index) in levels"
				:key="index"
			>
				<input
					v-if="currentProfile.id"
					type="radio"
					required
					class="open"
					name="level"
					:id="level.sku"
					:value="level.sku"
					v-model="ticketSKU"
				>
				<label :for="level.sku"
					class="overlay">
					    <div class="circle"></div>
					<h4>{{ level.label }}</h4></label
				>

			</input>
				<div class="level-info">
					<h4>{{ level.price }}</h4>
					<p class="level-description">{{ level.description }}</p>
				</div>
			</div>
		</div>
		<div class="form-section" v-if="currentProfile.id">
			<h3 class="required">Number of Tickets</h3>
			<div class="ticket-quantity form-row">
				<label for="ticket-quantity"><h4>Quantity</h4></label>
				<input
					type="number"
					id="ticket-quantity"
					v-model.number="ticketQuantity"
				/>
			</div>
		</div>

		<div
			class="invitees form-section"
			:class="{ 'not-enough-tickets': notEnoughTickets }"
			v-if="currentProfile.id"
		>
			<h3 class="required">Email address(es)</h3>
			<div class="form-row">
				<label for="invitees">
					Email addresses (enter an email for for each badge)
				</label>
				<VoerroTagsInput
					v-model="invitees"
					:typeahead="false"
					:placeholder="remainingTicketsMessage"
					:limit="ticketQuantity"
				/>
			</div>
		</div>

		<div
			class="discount-code form-section"
			v-if="currentProfile.id && isDiscountCode"
		>
			<div class="form-row">
				<label for="discount-code">Discount Code</label>
				<input
					required
					type="text"
					id="discount-code"
					v-model="discountCode"
				/>
			</div>
		</div>

		<credit-card-payment
			v-if="currentProfile.id"
			:card="card"
			@setError="setError"
		/>

		<input
			v-if="currentProfile.id"
			type="submit"
			:disabled="isLoading || formInvalid"
			value="Buy Tickets"
		/>
		<router-link
			v-else
			class="cta button"
			:to="{
				name: 'register',
				query: { redirect: 'tickets' },
			}"
			><button>Register To Buy</button></router-link
		>
		<router-link 	v-if="!currentProfile.id" class="login-link" :to="{ name: 'login' }"
			>Or login</router-link
		>
		<div class="errors">{{ error }}</div>
		<div class="message">{{ message }}</div>
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
			ticketSKU: 'skuEmployer',
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
					color: '#000000',
					fontFamily: 'poppins, sans-serif',
					fontWeight: '300',
					fontStyle: 'normal',
					lineHeight: '1.5em',
					textTransform: 'capitalize',
				},
			},
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
			if (
				this.remainingTickets === 0 ||
				(this.remainingTickets === 1 && this.ticketQuantity === 1)
			) {
				return '';
			}
			if (this.remainingTickets === 1) {
				return '1 email left';
			}
			return `${this.remainingTickets} emails left`;
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
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.ticket-purchase {
	@include grid-full-width;
	max-width: 700px;
	.form-section {
		&.credit-card-payment {
			border-bottom: none;
		}
	}

	.form-row {
		label {
			cursor: pointer;
			padding: 12px $baseline * 2;
			transition: color 200ms ease-in;
			@media (max-width: $small-breakpoint) {
				padding-left: 0;
			}
		}
		input {
			display: block;
		}
		&.level {
			.level-info {
				padding-left: $baseline * 2;
				h4 {
					padding-bottom: $baseline / 2;
				}
				@media (max-width: $small-breakpoint) {
					padding-left: 0;
					h4 {
						padding-left: 0;
					}
				}
			}
			.level-description {
				font-size: 15px;
				line-height: 1.5rem;
				grid-column: 1;
				margin-bottom: $baseline * 2;
			}
		}
		&.ticket-quantity {
			@include flexbox;
			@include justify-content(space-between);
			label {
				display: inline;
			}
			input {
				display: inline;
				width: 100px;
			}
		}
	}
	#discount-code {
		margin-left: $baseline * 2;
		width: calc(100% - 40px);
		@media (max-width: $small-breakpoint) {
			margin-left: 0;
			width: 100%;
		}
	}

	.invitees {
		.tags-input-wrapper-default {
			background: none;
			border: $thin-border-width solid $black;
			border-radius: 0;
			.tags-input-badge-pill {
				background: $yellow;
				border-radius: 0;
				color: $black;
				padding: 0.5em 0.4em;
			}
			.tags-input-remove {

				&::before,
				&::after {
					background: $black;
				}
				&:hover {
					&::before,
					&::after {
						background: $red;
					}
				}
			}
		}
		.tags-input input:active,
		.tags-input input:focus {
			background: $yellow;
		}
	}
	.credit-card-payment {
		input,
		#card-element {
			margin-left: $baseline * 2;
			width: calc(100% - 40px);
			@media (max-width: $small-breakpoint) {
				margin-left: 0;
				width: 100%;
			}
		}

		.StripeElement {
			border: $thin-border-width solid $black;
			padding: $baseline;
		}
	}
	input[type='submit'],
	.cta,
	.login-link {
		margin-left: $baseline * 2;
		width: calc(100% - 40px);
		@media (max-width: $small-breakpoint) {
			margin-left: 0;
			width: 100%;
		}
	}
}
</style>

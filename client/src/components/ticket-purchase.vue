<template>
  <form class="ticket-purchase" @submit.prevent="submit">
    <div class="ticket-details">
      <h3>Conference Details</h3>
	  <p>When: August 15 - 16, 2019</p>
	  <p>Where: RiNo Brighton Boulevard</p>

  	  <h3>Conference Badges</h3>
      <p>All badges include access to:</p>
      <ul>
		<li>Custom printed 2-day conference badge</li>
		<li>Access to keynote, talks, workshops, and live podcasts</li>
		<li>Coffee, Breakfast, and Lunch at Zeppelin Station vendors both days</li>
		<li>Opening and closing parties</li>
		<li>8th annual Ballmer Peak Hackathon</li>
      </ul>

  	  <h3>Venues</h3>
	  <venue-list />
    </div>
    <div class="levels" v-for="(level, index) in levels" :key="index">
      <input
        v-if="currentProfile.id"
        type="radio"
        required
        name="ticket-level"
        :id="level.sku"
        :value="level.sku"
        v-model="ticketSKU"
      >
      <label :for="level.sku">{{level.label}}</label>
      <p>{{level.description}}</p>
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

    <input v-if="currentProfile.id" type="submit" :disabled="isLoading || formInvalid" value="Pay">
    <router-link v-else :to="{name: 'register'}" class="call-to-action">Register To Buy!</router-link>
    <div class="errors">{{error}}</div>
    <div class="message">{{message}}</div>
  </form>
</template>

<script>
/* global Stripe */
import { mapGetters } from 'vuex';
import CreditCardPayment from '../components/credit-card-payment';
import VenueList from '@/components/venue-list';
import VoerroTagsInput from '@voerro/vue-tagsinput';
import sleep from '../utilities/sleep';
import '@voerro/vue-tagsinput/dist/style.css';

export default {
    components: {
        CreditCardPayment,
        VoerroTagsInput,
		VenueList,
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
        this.card = elements.create('card');
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
    margin-bottom: $xxl;
	max-width: $max-line-length;
    h3 {
		margin-top: $large;
        @include fieldset-header-font;
		align-self: start;
    }
	p, ul {
		align-self: start;
	}
    [type='submit'],
    .call-to-action {
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
    .ticket-details {
        display: flex;
        flex-flow: column nowrap;
        margin-bottom: $xl;
        align-items: center;
        p {
            width: 100%;
        }
        ul {
            list-style-type: circle;
            max-width: 79vw;
            li {
                margin-bottom: $small;
            }
        }
    }
}
.errors {
    color: $warning;
}
.message {
    @include bold-body-font;
}

.not-enough-tickets .tags-input-wrapper-default {
    border-color: red;
    color: red;
    input::placeholder {
        color: red;
    }
}

.tags-input-wrapper-default {
    padding: 0 0.25rem;
}
.tags-input input {
    padding: 1px;
    margin-bottom: 0;
    height: 2.5rem;
    font-size: 14px;
}
.tags-input {
    margin-bottom: 1rem;
    border: 0.5px solid #bfbfbf;
}
</style>

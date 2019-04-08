<template>
  <form class="ticket-purchase" @submit.prevent="submit">
    <h3>DVLP DNVR is October 18th & 19th</h3>
    <div class="ticket-details">
      <p>All tickets include access to:</p>
      <ul>
        <li>39 Talks</li>
        <li>13 Lightning talks</li>
        <li>4 Workshops</li>
        <li>3 Podcasts</li>
        <li>Ballmer Peak Hackathon sponsored by Finkel & Garf Craft Beer</li>
        <li>Coffee/Breakfast both days</li>
        <li>Lunch at Zeppelin Station both days</li>
        <li>Afternoon Open Bar both days</li>
        <li>Opening Happy Hour</li>
        <li>Closing Party including Taco Bar</li>
      </ul>
      <p>Looking to purchase a group of tickets? Our apologies, our setup requires each user to register and purchase tickets individually. Please contact us at hello@developdenver.org if you need help purchasing multiple tickets.</p>
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
    <div class="ticket-quantity">
      <label for="ticket-quantity">How many tickets would you like to purchase?</label>
      <input type="number" name="ticket-quantity" v-model.number="ticketQuantity">
    </div>

    <div class="invitees" :class="{ 'not-enough-tickets': notEnoughTickets }">
      <label for="invitees">Who are the tickets for? (you can also choose later)</label>
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

    <input v-if="currentProfile.id" type="submit" :disabled="isLoading || formInvalid" value="Buy">
    <router-link v-else :to="{name: 'register'}">Register To Buy!</router-link>
    <div class="errors">{{error}}</div>
    <div class="message">{{message}}</div>
  </form>
</template>

<script>
/* global Stripe */
import { mapGetters } from 'vuex';
import CreditCardPayment from '../components/credit-card-payment';
import VoerroTagsInput from '@voerro/vue-tagsinput';
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
            isAttendee: 'services/user/isAttendee',
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
                        this.$router.push({ name: 'news' });
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
    h3 {
        @include fieldset-header-font;
    }
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

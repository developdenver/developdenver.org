<template>
    <div class="credit-card-payment">
        <label for="name">Name as it appears on your card</label>
        <input id="name" name="name" placeholder="Your Name" type="text" required />

        <label for="card-element">Credit Card Number</label>
        <div @change="onCardChange" ref="cardElement" id="card-element"></div>
    </div>
</template>

<script>
export default {
	props: {
		card: Object,
	},
	mounted() {
		this.card.mount(this.$refs.cardElement);
	},
	methods: {
		onCardChange(event) {
			this.error = event.error
				? this.$emit("setError", event.error)
				: this.$emit("setError", "");
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

.credit-card-payment {
    label, input {
        display: block;
        width: 100%;
    }
    label {
        @include italic-body-font;
    }
    input, .StripeElement {
        background-color: $pure-white;
        height: 2.5rem;
        padding: 0.75rem 1rem;
        border-radius: 4px;
        box-shadow: 0px 0px 4px $light-grey;
        border: 1px solid $medium-light-grey;
        margin-bottom: $baseline;
        &:focus, &.StripeElement--focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
        }
    }
    .StripeElement--invalid {
        border-color: #fa755a;
    }
    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
}
</style>

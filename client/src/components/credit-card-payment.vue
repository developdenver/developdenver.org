<template>
	<div class="credit-card-payment form-section">
		<h3>Payment</h3>
		<div class="form-row">
			<label for="name">Full Name (as it appears on your card)</label>
			<input id="name" type="text" required />
		</div>
		<div class="form-row">
			<label for="card-element">Credit Card Number</label>
			<div
				@change="onCardChange"
				ref="cardElement"
				id="card-element"
			></div>
		</div>
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
				? this.$emit('setError', event.error)
				: this.$emit('setError', '');
		},
	},
};
</script>

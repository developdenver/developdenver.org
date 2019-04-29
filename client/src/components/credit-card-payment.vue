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
}
</style>

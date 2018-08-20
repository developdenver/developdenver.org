<template>
	<section class="reset-request">
		<h2 v-if="!message">Reset your password?</h2>
		<form
			v-if="!message"
			@submit.prevent="requestReset"
		>
			<label for="email" >Enter your email</label>
			<input v-model="email" id="email" type="email" required placeholder="hello@developdenver.org" />
			<input type="submit" value="Request Reset" />
		</form>
		<p v-if="message">{{message}}</p>
	</section>
</template>

<script>

export default {
	data() {
		return {
			email: "",
			message: "",
		};
	},
	methods: {
		async requestReset() {
			await this.$store.dispatch("services/user/requestReset", this.email);
			this.message = `Check ${this.email} for instructions on how to reset your password!`;
		}
	}
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";
@import "@/styles/_typography.scss";

.reset-request {
	h2 {
		@include section-header-font;
	}
	form {
		display: flex;
		flex-flow: column nowrap;
		flex-grow: 1;
		max-width: $max-line-length;
		margin-bottom: $large;
		input, label {
			display: block;
			width: 100%;
		}
		input {
			margin-bottom: $baseline;
		}
		label {
			margin-bottom: $xs;
		}
		[type=submit] {
			@include call-to-action-button;
		}
	}
}
</style>

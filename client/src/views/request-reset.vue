<template>
	<section id="reset-password" class="full landing-screen">
		<div class="plus-grid-container"></div>
		<countdown />
		<div class="form-wrapper">
			<form v-if="!message" @submit.prevent="requestReset">
				<div class="form-section">
					<h3 v-if="!message">Reset your password?</h3>
					<p class="required-field">Required field</p>
					<div class="form-row">
						<label for="email" class="required"> Email </label>
						<input
							v-model="email"
							id="email"
							type="email"
							required
							placeholder="name@email.com"
						/>
					</div>
					<input type="submit" value="Request Reset" />
				</div>
			</form>
			<p v-if="message" class="error">{{ message }}</p>
		</div>
	</section>
</template>

<script>
import Countdown from '@/components/count-down';

export default {
	components: {
		Countdown,
	},
	data() {
		return {
			email: '',
			message: '',
		};
	},
	methods: {
		async requestReset() {
			await this.$store.dispatch(
				'services/user/requestReset',
				this.email,
			);
			this.message = `Check ${
				this.email
			} for instructions on how to reset your password!`;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';
@import '@/styles/_typography.scss';

.reset-request {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	form,
	.error,
	.alternatives {
		@include grid-form;
	}
	.alternative {
		margin-bottom: $baseline;
	}
	input,
	button {
		width: 100%;
	}
	[type='submit'] {
		@include call-to-action;
		padding: 0;
	}
	a {
		color: $accent-color;
		text-decoration: underline;
	}
}
</style>

<template>
	<section id="reset-password" class="full landing-screen">
		<div class="plus-grid-container"></div>
		<countdown />
		<div class="form-wrapper">
			<form @submit.prevent="resetPassword">
				<div class="form-section">
					<h3>Reset Password</h3>
					<set-password @updatePassword="updatePassword" />

					<input
						:disabled="isLoading"
						type="submit"
						value="Reset Password"
					/>
				</div>
			</form>
			<p class="error" v-if="isError">
				There was an error resetting your password. Please request to
				<router-link :to="{ name: 'request-reset' }"
					>reset your password</router-link
				>
				again.
			</p>
		</div>
	</section>
</template>

<script>
import SetPassword from '../components/set-password';
import Countdown from '@/components/count-down';

export default {
	data() {
		return {
			password: '',
			isError: false,
		};
	},
	components: {
		SetPassword,
		Countdown,
	},
	computed: {
		isLoading() {
			return this.$store.getters['services/loading/isLoading'];
		},
		token() {
			const savedToken = this.$store.state.services.user.token;
			const passedToken = this.$route.query.token;
			return (
				savedToken ||
				(passedToken || this.$router.replace({ name: 'index' }))
			);
		},
	},
	methods: {
		updatePassword(password) {
			this.password = password;
		},
		async resetPassword() {
			await this.$store
				.dispatch('services/user/resetPassword', {
					password: this.password,
					token: this.token,
				})
				.then(() => {
					this.isError = false;
					this.$router.replace({ name: 'login' });
				})
				.catch(error => {
					console.error(error.message);
					this.isError = true;
				});
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';

#reset-password {
	margin-bottom: 0;
	min-height: 100vh;
	position: relative;
	z-index: 1;
	.form-wrapper {
		grid-row: 2;
		.form-section {
			h3 {
				background: $yellow;
				display: inline;
			}
		}
		.form-row label {
			background: $yellow;
			display: inline-block;
			padding: 12px 40px 12px 0;
		}
	}
	.alternative {
		margin-bottom: $baseline;
		a {
			background: $yellow;
			display: inline;
		}
	}
	input:not([type='submit']) {
		background: $yellow;
	}
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 50px $yellow inset !important;
	}
	input[type='submit'] {
		margin-top: 0;
	}
}
</style>

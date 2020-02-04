<template>
	<section id="login" class="full landing-screen">
		<div class="plus-grid-container"></div>
		<countdown />
		<div class="form-wrapper">
			<form @submit.prevent="login">
				<div class="form-section">
					<h3>Log In</h3>
					<div class="form-row">
						<label for="ticket-quantity">Email</label>
						<input
							type="text"
							id="email"
							name="email"
							placeholder="Email"
							v-model="email"
						/>
					</div>
					<div class="form-row">
						<label for="ticket-quantity">password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							v-model="password"
						/>
					</div>
				</div>
				<input type="submit" value="Login" />
			</form>
			<p v-if="error" class="error">{{ error }}</p>
			<div class="alternatives">
				<div class="alternative">
					<router-link :to="{ name: 'request-reset' }"
						>Forgot your password?</router-link
					>
				</div>
				<div class="alternative">
					<router-link :to="{ name: 'register' }"
						>Register</router-link
					>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
export default {
	components: {
		Countdown,
		HeaderBar,
	},
	data() {
		return {
			email: '',
			password: '',
			error: '',
		};
	},
	computed: {
		isAttendee() {
			return this.$store.getters['tickets/isAttendee'];
		},
	},
	methods: {
		async login() {
			await this.$store
				.dispatch('services/user/login', {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					const next =
						this.$route.query.redirect ||
						(this.isAttendee
							? { name: 'news' }
							: { name: 'tickets' });
					this.$router.push(next);
				})
				.catch(error => {
					console.error(error.message);
					this.error = 'Incorrect username or password.';
				});
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';

#login {
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

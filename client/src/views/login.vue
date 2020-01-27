<template>
	<section id="login" class="full landing-screen">
		<div class="plus-grid-container"></div>
		<countdown />
		<div class="form-wrapper">
			<div class="form-label">
				<h2>Log In</h2>
			</div>

			<form @submit.prevent="login">
				<input
					type="text"
					id="email"
					name="email"
					placeholder="Email"
					v-model="email"
				/>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					v-model="password"
				/>
				<input class="black" type="submit" value="Login" />
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
	height: 100vh;
	min-height: 100vh;
	position: relative;
	z-index: -2;
	.form-wrapper {
		@include grid-form;
		@include flexbox;
		@include justify-content(center);
		// @include align-items(center);
		@include flex-flow(column);
		grid-row: 2;
		.form-label {
			margin-bottom: $baseline;
			h2 {
				background: $yellow;
				display: inline;
			}
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
}
</style>

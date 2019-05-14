<template>
	<section class="reset-password">
		<countdown />
		<h2>Reset Your Password</h2>
		<form @submit.prevent="resetPassword">
			<set-password @updatePassword="updatePassword" />
			<input :disabled="isLoading" type="submit" value="Reset Password" />
		</form>
		<p class="error" v-if="isError">There was an error resetting your password. Please request to <router-link :to="{name: 'request-reset'}">reset your password</router-link> again.</p>
	</section>
</template>

<script>
import SetPassword from "../components/set-password";
import Countdown from "@/components/count-down";

export default {
	data() {
		return {
			password: "",
			isError: false,
		};
	},
	components: {
		SetPassword,
		Countdown,
	},
	computed: {
		isLoading() {
			return this.$store.getters["services/loading/isLoading"];
		},
		token() {
			const savedToken = this.$store.state.services.user.token;
			const passedToken = this.$route.query.token;
			return savedToken || (passedToken || this.$router.replace({name: "index"}));
		},
	},
	methods: {
		updatePassword(password) {
			this.password = password;
		},
		async resetPassword() {
			await this.$store.dispatch("services/user/resetPassword", {
				password: this.password,
				token: this.token
			}).then(() => {
				this.isError = false;
				this.$router.replace({name: "login"});
			}).catch(error => {
				console.error(error.message);
				this.isError = true;
			});
		}
	}
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";
@import "@/styles/_typography.scss";
@import "@/styles/_colors.scss";

.reset-password {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	form, .error, .alternatives {
		@include grid-form;
	}
	.alternative {
		margin-bottom: $baseline;
	}
	input, button {
		width: 100%;
	}
	[type=submit] {
		@include call-to-action;
		padding: 0;
	}
	a {
		color: $accent-color;
		text-decoration: underline;
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>

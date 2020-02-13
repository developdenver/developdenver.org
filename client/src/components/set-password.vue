<template>
	<fragment>
		<div class="form-row">
			<label for="password">Password </label>
			<input
				required
				class="password"
				type="password"
				id="password"
				title="At least 7 characters"
				pattern=".{7,}"
				ref="password"
				v-model.trim="password"
				@input="updatePassword"
			/>
		</div>
		<div class="form-row">
			<label for="confirm-password"> Password Confirmation</label>
			<input
				ref="confirmPassword"
				required
				class="confirm-password"
				type="password"
				id="confirmPassword"
				title="At least 7 characters"
				v-model.trim="confirmPassword"
				@input="updatePassword"
			/>
		</div>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
export default {
	data() {
		return {
			password: '',
			confirmPassword: '',
		};
	},
	computed: {
		isValidPassword() {
			return (
				this.password &&
				this.confirmPassword &&
				this.password === this.confirmPassword
			);
		},
	},
	methods: {
		async updatePassword() {
			this.checkPasswords();
			if (this.isValidPassword) {
				this.$emit('updatePassword', this.password);
			}
		},
		checkPasswords() {
			if (!this.isValidPassword) {
				this.$refs.password.setCustomValidity("Passwords don't match");
				this.$refs.confirmPassword.setCustomValidity(
					"Passwords don't match",
				);
			} else {
				this.$refs.password.setCustomValidity('');
				this.$refs.confirmPassword.setCustomValidity('');
			}
		},
	},
};
</script>

<style lang="scss"></style>

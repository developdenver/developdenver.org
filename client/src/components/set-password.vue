<template>
    <div class="set-password">
        <input
            required
			class="password"
            type="password"
            id="password"
            title="At least 7 characters"
            pattern=".{7,}"
			placeholder="Password"
            ref="password"
            v-model.trim="password"
            @input="updatePassword"
        />
        <input ref="confirmPassword"
            required
			class="confirm-password"
            type="password"
            id="confirmPassword"
			placeholder="Confirm Password"
            title="At least 7 characters"
            v-model.trim="confirmPassword"
            @input="updatePassword"
        />
    </div>
</template>

<script>
export default {
	data() {
		return {
			password: "",
			confirmPassword: "",
		};
	},
	computed: {
		isValidPassword() {
			return this.password &&
                this.confirmPassword &&
                this.password === this.confirmPassword;
		},
	},
	methods: {
		async updatePassword() {
			this.checkPasswords();
			if (this.isValidPassword) {
				this.$emit("updatePassword", this.password);
			}
		},
		checkPasswords() {
			if (!this.isValidPassword) {
				this.$refs.password.setCustomValidity("Passwords don't match");
				this.$refs.confirmPassword.setCustomValidity("Passwords don't match");
			} else {
				this.$refs.password.setCustomValidity("");
				this.$refs.confirmPassword.setCustomValidity("");
			}
		},
	},
};
</script>

<style lang="scss">
	.set-password {
		display: contents;
	}
</style>
